# YandexPraktikum Messanger

Учебный проект мессендера в ЯндексПрактикум
(дизайн сайт очень ужастный, я сосредоточился на работе TS скриптов, в будущем сделаю дизайн лучше на bootstrap)

## Будующие доработки
- отображение списка пользлвателей в чате
- отображение картинок в чате
- изменение пароля пользователя
- добавить в профиль валидацию при изменении
- отобраить аватарку пользователя

## Start project

Запуск сайта на 3000 порту

> npm run start

## TypeScript

> ts-node script.ts

# Ссылка на сайт

https://ymessanger.netlify.app/

# Перевод на TypeScript

> npm install typescript @types/node --save-dev
> Create tsconfig.json
> Add: env.d.ts

# Подключение линтера ESLint:

> npm install eslint eslint-plugin-vite @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
> npx eslint --init
> npm run lint
> Автоматически пофиксит
> npx eslint . --fix
> npm run lint -- --fix

Подключение Stylelint и запуск

> npm install --save-dev stylelint stylelint-config-standard stylelint-scss
> npm run lint:styles

Автоматически делает код красивым:
> npx prettier --write .

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

# Unit-тесты
Проверка сколько файлов тестов в проекте:
> ls src/**/*.test.ts

Запуск тестов (я использую vitest потому что он интегрирован в vite который использую в самом проекте)
> npm run test

## Аудит уязвимостей
> npm audit fix
 
## Обновление зависимостей
> npx npm-check-updates -u
> npm install
