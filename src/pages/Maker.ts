import Button from "../components/button";
import Field from "../components/field";
import { Block } from "../services/Component";
import Login from "./login";
import stylesLogin from './Login.module.css';


export function MakeLogin() : Block {
    const fieldLogin = new Field({
        className: 'className',
        type: 'text',
        name: 'login',
        placeholderText: 'Login',
        required: 'required'
    });

    const fieldPassword = new Field({
        className: 'className',
        type: 'password',
        name: 'password',
        placeholderText: 'Password',
        required: 'required'
    });

    const buttonSubmit = new Button({
        className: 'className',
        type: 'submit',
        buttonText: 'Enter',
        events: {
            click: (event: MouseEvent) => {
                console.log(event);
            },
        },
    });

    const buttonCreateAccount = new Button({
        className: 'className',
        type: 'button',
        buttonText: 'Create Account',
        events: {
            click: (event: MouseEvent) => {
                console.log(event);
            },
        },
    });

    const loginPage = new Login({
        title: 'Login',
        action: '/login',
        loginField: fieldLogin,
        passwordField: fieldPassword,
        submitButton: buttonSubmit,
        createAccountButton: buttonCreateAccount
    });

    return loginPage;
}