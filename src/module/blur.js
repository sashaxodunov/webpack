const textInputs = document.querySelectorAll('input[type="text"]');
const emailInputs = document.querySelectorAll('input[type="email"]');
const telInputs = document.querySelectorAll('input[type="tel"]');

// Общая очистка
const cleanValue = (value) => {
  return (
    value
      // Удаляем лишние символы кроме букв, пробелов и дефисов
      .replace(/[^a-zа-яё\s-]/gi, "")

      // Несколько пробелов -> один
      .replace(/\s+/g, " ")

      // Несколько дефисов -> один
      .replace(/-+/g, "-")

      // Пробелы вокруг дефисов
      .replace(/\s*-\s*/g, "-")

      // Удаляем пробелы и дефисы в начале и конце
      .replace(/^[-\s]+|[-\s]+$/g, "")
  );
};

// Для text-полей
const normalizeText = (value) => {
  return cleanValue(value)
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};

// Для телефона
const normalizePhone = (value) => {
  return value.replace(/[^\d+]/g, "");
};

// Для email
const normalizeEmail = (value) => {
  return value.trim().toLowerCase().replace(/\s+/g, "");
};

// text
textInputs.forEach((input) => {
  input.addEventListener("blur", () => {
    input.value = normalizeText(input.value);
  });
});

// tel
telInputs.forEach((input) => {
  input.addEventListener("blur", () => {
    input.value = normalizePhone(input.value);
  });
});

// email
emailInputs.forEach((input) => {
  input.addEventListener("blur", () => {
    input.value = normalizeEmail(input.value);
  });
});
