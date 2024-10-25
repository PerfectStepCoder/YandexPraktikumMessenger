import Handlebars from 'handlebars';
import loginTemplateSrc from './pages/login.hbs';
import profileTemplateSrc from './pages/profile.hbs';

import './styles/login.css';
import './styles/profile.css';
import './styles/register.css';
import './styles/chats.css';
import './styles/error500.css';


async function loadTemplate(url) {
  const response = await fetch(url);
  return await response.text();
}

document.addEventListener('DOMContentLoaded', async () => {

 
    const profileTemplateSource = await loadTemplate('/pages/profile.hbs');
    const profileTemplate = Handlebars.compile(profileTemplateSource);

    const loginTemplateSource = await loadTemplate('/pages/login.hbs');
    const loginTemplate = Handlebars.compile(loginTemplateSource);

    const registerTemplateSource = await loadTemplate('/pages/register.hbs');
    const registerTemplate = Handlebars.compile(registerTemplateSource);

    const chatsTemplateSource = await loadTemplate('/pages/chats.hbs');
    const chatsTemplate = Handlebars.compile(chatsTemplateSource);

    const error500TemplateSource = await loadTemplate('/pages/error500.hbs');
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
    const profileContext = {
      title: 'Profile Settings',
      action: '/profile/save',
      firstName: 'John',
      secondName: 'Doe',
      displayName: 'johndoe123',
      login: 'john123',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      saveButton: 'Save Changes',
      resetButton: 'Reset'
    };

    const chatsContext = {
      title: 'Chat Page'
    };

    // Функция для рендеринга страницы логина
    function renderLogin() {
        app.innerHTML = loginTemplate(loginContext);
        setTimeout(() => {
          document.querySelector('.create-account').addEventListener('click', renderRegister);
          document.querySelector('.login-btn').addEventListener('click', renderChats);
        }, 1);
    }

    // Функция для рендеринга страницы профиля
    function renderProfile() {
        app.innerHTML = profileTemplate(profileContext);
    }

    function renderRegister() {
      app.innerHTML = registerTemplate(registerContext);
      document.querySelector('.enter-btn').addEventListener('click', renderLogin);
    }

    function renderError500() {
      app.innerHTML = error500Template();
    }

    function renderChats() {
      app.innerHTML = chatsTemplate(chatsContext);
      document.querySelector('.send-btn').addEventListener('click', renderError500);
    }

    // Изначально рендерим страницу логина
    renderLogin();
});
