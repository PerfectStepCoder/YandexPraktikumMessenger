import Handlebars from 'handlebars';

import './styles/login.css';
import './styles/profile.css';
import './styles/register.css';
import './styles/chats.css';
import './styles/error500.css';


async function loadTemplate(url: string) {
  const response = await fetch(url);
  return await response.text();
}

document.addEventListener('DOMContentLoaded', async () => {

    // const profileTemplatePath = import.meta.env.DEV ? './pages/profile.hbs' : '/assets/pages/profile.hbs';
    // const profileTemplateSource = await loadTemplate(profileTemplatePath);
    // const profileTemplate = Handlebars.compile(profileTemplateSource);

    const loginTemplatePath = import.meta.env.DEV ? './pages/login.hbs' : '/assets/pages/login.hbs';
    const loginTemplateSource = await loadTemplate(loginTemplatePath);
    const loginTemplate = Handlebars.compile(loginTemplateSource);

    const registerTemplatePath = import.meta.env.DEV ? './pages/register.hbs' : '/assets/pages/register.hbs';
    const registerTemplateSource = await loadTemplate(registerTemplatePath);
    const registerTemplate = Handlebars.compile(registerTemplateSource);

    const chatsTemplatePath = import.meta.env.DEV ? './pages/chats.hbs' : '/assets/pages/chats.hbs';
    const chatsTemplateSource = await loadTemplate(chatsTemplatePath);
    const chatsTemplate = Handlebars.compile(chatsTemplateSource);

    const error500TemplatePath = import.meta.env.DEV ? './pages/error500.hbs' : '/assets/pages/error500.hbs';
    const error500TemplateSource = await loadTemplate(error500TemplatePath);
    const error500Template = Handlebars.compile(error500TemplateSource);

    const app = document.getElementById('app');

    // Данные для логина
    const loginContext = {
      title: 'Login',
      action: '/login',
      submitButton: 'Enter',
      createAccountButton: 'Create Account'
    };

    const registerContext = {
      title: 'Register',
      submitButton: 'Register',
      enterButton: 'Enter'
    };

    // Данные для профиля
    // const profileContext = {
    //   title: 'Profile Settings',
    //   action: '/profile/save',
    //   firstName: 'John',
    //   secondName: 'Doe',
    //   displayName: 'johndoe123',
    //   login: 'john123',
    //   email: 'john.doe@example.com',
    //   phone: '+1234567890',
    //   saveButton: 'Save Changes',
    //   resetButton: 'Reset'
    // };

    const chatsContext = {
      title: 'Chat Page'
    };

    // Функция для рендеринга страницы логина
    function renderLogin() {

      console.log(loginTemplate(loginContext));
      
      if (app != null) {
        app.innerHTML = loginTemplate(loginContext);
      }

      requestAnimationFrame(() => {
        const createAccountButton = document.querySelector('.create-account');
        const loginButton = document.querySelector('.login-btn');
        if (createAccountButton && loginButton) {
            createAccountButton.addEventListener('click', renderRegister);
            loginButton.addEventListener('click', renderChats);
        } else {
            console.log("Buttons not found in the DOM.");
        }
      });
    }

    // Функция для рендеринга страницы профиля
    function renderRegister() {
      if (app) {
        app.innerHTML = registerTemplate(registerContext);
      }

      requestAnimationFrame(() => {
        const enterButton = document.querySelector('.enter-btn');

        if (enterButton) {
            enterButton.addEventListener('click', renderLogin);
        } else {
            console.log("Buttons not found in the DOM.");
        }
      });
    }

    function renderError500() {
      if (app) {
        app.innerHTML = error500Template(null);
      }
    }

    function renderChats() {
      if (app) {
        app.innerHTML = chatsTemplate(chatsContext);
      }
      const send_btn = document.querySelector('.send-btn')
      if (send_btn) {
        send_btn.addEventListener('click', renderError500);
      }
    }

    // Изначально рендерим страницу логина
    renderLogin();
});
