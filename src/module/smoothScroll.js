// smoothScroll.js
const smoothScroll = () => {
  // все ссылки-якоря, кроме пустых "#"
  const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  const canNative = "scrollBehavior" in document.documentElement.style;

  const isValid = (hash) =>
    hash && hash.length > 1 && document.querySelector(hash);

  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const animateScrollTo = (targetY, duration = 650) => {
    const startY = window.pageYOffset;
    const diff = targetY - startY;
    const start = performance.now();

    const step = (now) => {
      let p = (now - start) / duration;
      if (p > 1) p = 1;
      window.scrollTo(0, startY + diff * easeInOutCubic(p));
      if (p < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const hash = link.getAttribute("href");
      if (!isValid(hash)) return;

      e.preventDefault();
      const target = document.querySelector(hash);

      if (canNative) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        const y = target.getBoundingClientRect().top + window.pageYOffset;
        animateScrollTo(y);
      }
    });
  });
};

export default smoothScroll;
