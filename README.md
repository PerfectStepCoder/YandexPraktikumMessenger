# YandexPraktikum Messanger
Учебный проект мессендера в ЯндексПрактикум
(дизайн сайт очень ужастный, я сосредоточился на работе TS скриптов, в будущем сделаю дизайн лучше на bootstrap)

## Start project
Запуск сайта на 3000 порту
>npm run start

## TypeScript
> ts-node script.ts

# Ссылка на сайт
https://ymessanger.netlify.app/

# Перевод на TypeScript
>npm install typescript @types/node --save-dev
Create tsconfig.json
Add: env.d.ts

Подключение линтера ESLint:
> npm install eslint eslint-plugin-vite @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
> npx eslint --init
> npm run lint

Подключение Stylelint и запуск
> npm install --save-dev stylelint stylelint-config-standard stylelint-scss
> npm run lint:styles

Проверка безопасность сайта:
> npm audit fix

## Учетные записи для тестов
const body = {
  first_name: "Jhon Doe",
  second_name: "Petra",
  login: "Doom",
  email: "test_test@mail.com",
  password: "Wer45Ffguryry4df",
  phone: "89164567879"
};

const body = {
  first_name: "Hovard",
  second_name: "Dudovich",
  login: "Snigal",
  email: "test_tes_snigal@mail.com",
  password: "fdf5Gdfgir35SdfvS",
  phone: "89164567880"
};


