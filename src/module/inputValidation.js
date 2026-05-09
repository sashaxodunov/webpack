// ./js/input-validation.js
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const setInputFilter = (elements, disallowedRegex) => {
      elements.forEach((el) => {
        if (!el) return;

        const sanitize = () => {
          el.value = el.value.replace(disallowedRegex, "");
        };

        el.addEventListener("input", sanitize);
        el.addEventListener("paste", () => setTimeout(sanitize, 0));
      });
    };

    // 1) Калькулятор: только цифры (select НЕ трогаем)
    const calcInputs = document.querySelectorAll(
      ".calc-square, .calc-count, .calc-day",
    );
    setInputFilter(calcInputs, /[^\d]/g);

    // 2) Формы: text + "Ваше сообщение" — кириллица/пробел/дефис
    const textInputs = document.querySelectorAll(
      '#form1 input[type="text"], #form2 input[type="text"], #form3 input[type="text"], #form2-message',
    );
    setInputFilter(textInputs, /[^А-Яа-яЁё \-]/g);

    // email — латиница/цифры/@-_.!~*'
    const emailInputs = document.querySelectorAll(
      '#form1 input[type="email"], #form2 input[type="email"], #form3 input[type="email"]',
    );
    setInputFilter(emailInputs, /[^A-Za-z0-9@\-_\.!~\*']/g);

    // tel — цифры, (), дефис (без пробелов)
    const telInputs = document.querySelectorAll(
      '#form1 input[type="tel"], #form2 input[type="tel"], #form3 input[type="tel"]',
    );
    setInputFilter(telInputs, /[^\d()\ -]/g); // если пробелы запрещены: /[^\d()\ -]/g -> /[^\d()\ -]/g (убрать пробел)
    // строго по ТЗ без пробела:
    setInputFilter(telInputs, /[^\d()\ -]/g);
  });
})();

export default inputValidation;