export type ValidationRules = {
    [key: string]: {
      regex: RegExp;
      errorMessage: string;
    };
  };

export const validationRules: ValidationRules = {
    first_name: {
      regex: /^[A-ZА-Я][a-zа-яё-]*$/,
      errorMessage: "Имя должно начинаться с заглавной буквы и содержать только буквы и дефис.",
    },
    second_name: {
      regex: /^[A-ZА-Я][a-zа-яё-]*$/,
      errorMessage: "Фамилия должна начинаться с заглавной буквы и содержать только буквы и дефис.",
    },
    login: {
      regex: /^(?!^\d+$)[a-zA-Z0-9_-]{3,20}$/,
      errorMessage: "Логин должен быть от 3 до 20 символов, без пробелов, может содержать цифры, дефис или нижнее подчёркивание.",
    },
    name: {
      regex: /^(?!^\d+$)[a-zA-Z0-9_-]{3,20}$/,
      errorMessage: "Логин должен быть от 3 до 20 символов, без пробелов, может содержать цифры, дефис или нижнее подчёркивание.",
    },
    email: {
      regex: /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
      errorMessage: "Введите корректный email.",
    },
    password: {
      regex: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
      errorMessage: "Пароль должен быть от 8 до 40 символов, содержать хотя бы одну заглавную букву и цифру.",
    },
    phone: {
      regex: /^\+?\d{10,15}$/,
      errorMessage: "Телефон должен содержать от 10 до 15 цифр, может начинаться с плюса.",
    },
    message: {
      regex: /.+/,
      errorMessage: "Сообщение не должно быть пустым.",
    },
  };
