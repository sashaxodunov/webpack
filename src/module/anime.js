const anime = () => {
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.querySelector(".popup");
  const popupContent = popup?.querySelector(".popup-content");
  const openBtns = document.querySelectorAll(".popup-btn");
  const closeBtn = document.querySelector(".popup-close");

  if (!popup || !popupContent || !closeBtn) return;

  const DURATION = 1000; // ms
  const FROM_Y = -30; // px
  const FROM_S = 0.96;

  popup.style.display = "none";
  popup.style.opacity = "0";
  popupContent.style.opacity = "0";
  popupContent.style.transform = `translateY(${FROM_Y}px) scale(${FROM_S})`;

  const isMobile = () => window.innerWidth < 768;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
  function easeInCubic(t) {
    return t * t * t;
  }

  function animate({ duration, draw, done }) {
    const start = performance.now();

    function frame(time) {
      let p = (time - start) / duration;
      if (p > 1) p = 1;

      draw(p);

      if (p < 1) requestAnimationFrame(frame);
      else if (done) done();
    }

    requestAnimationFrame(frame);
  }

  function setOpenStateInstant() {
    popup.style.display = "block";
    popup.style.opacity = "1";
    popupContent.style.opacity = "1";
    popupContent.style.transform = "translateY(0px) scale(1)";
  }

  function setClosedStateInstant() {
    popup.style.display = "none";
    popup.style.opacity = "0";
    popupContent.style.opacity = "0";
    popupContent.style.transform = `translateY(${FROM_Y}px) scale(${FROM_S})`;
  }

  function openModal() {
    if (isMobile()) {
      setOpenStateInstant();
      return;
    }

    popup.style.display = "block";
    popup.style.opacity = "0";
    popupContent.style.opacity = "0";
    popupContent.style.transform = `translateY(${FROM_Y}px) scale(${FROM_S})`;

    animate({
      duration: DURATION,
      draw: (p) => {
        const e = easeOutCubic(p);

        popup.style.opacity = String(e);
        popupContent.style.opacity = String(e);

        const y = FROM_Y * (1 - e);
        const s = FROM_S + (1 - FROM_S) * e;
        popupContent.style.transform = `translateY(${y}px) scale(${s})`;
      },
    });
  }

  function closeModal() {
    if (isMobile()) {
      setClosedStateInstant();
      return;
    }

    animate({
      duration: DURATION,
      draw: (p) => {
        // убывание (закрытие)
        const e = 1 - easeInCubic(p);

        popup.style.opacity = String(e);
        popupContent.style.opacity = String(e);

        const y = FROM_Y * (1 - e);
        const s = FROM_S + (1 - FROM_S) * e;
        popupContent.style.transform = `translateY(${y}px) scale(${s})`;
      },
      done: () => {
        popup.style.display = "none";
      },
    });
  }

  // Открытие по кнопкам "Оставить заявку!"
  openBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  });

  // Закрытие по крестику
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
  });

  // Закрытие по клику на подложку
  popup.addEventListener("click", (e) => {
    if (e.target === popup) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popup.style.display === "block") {
      closeModal();
    }
  });
});

}

export default anime;