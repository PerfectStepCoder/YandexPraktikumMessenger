# YandexPraktikum Messanger
Учебный проект мессендера в ЯндексПрактикум

## Start project
Запуск сайта на 3000 порту
>npm run start

## Deploy site
https://ymessanger.netlify.app/

## TypeScript
> ts-node script.ts

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
