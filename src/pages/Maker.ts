import Button from "../components/button";
import Field from "../components/field";
import FieldLabel from "../components/fieldLabel";
import { Block } from "../services/Component";
import Login from "./login";
import Profile from "./profile"
import Register from "./register"
import ErrorMsg from "../components/error";
import Charts from "./charts";
import ChatList from "./charts/components/chatList";
import ChartMessages from "./charts/components/messages";
import { render } from "../utils/renderDOM";

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
                render(".app", MakeCharts())
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
                render(".app", MakeRegister())
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

export function MakeProfile() : Block {

    const firstName = new FieldLabel({
        className: 'form-group',
        type: 'text',
        labelFor: 'first_name',
        labelText: 'First Name:',
        labelID: 'first_name',
        name: 'first_name',
        placeholderText: 'Enter your first name',
        required: 'required'
    })

    const secondName = new FieldLabel({
        className: 'form-group',
        type: 'text',
        labelFor: 'second_name',
        labelText: 'Second Name:',
        labelID: 'second_name',
        name: 'second_name',
        placeholderText: 'Enter your second name',
        required: 'required'
    })

    const displayName = new FieldLabel({
        className: 'form-group',
        type: 'text',
        labelFor: 'display_name',
        labelText: 'Display Name:',
        labelID: 'display_name',
        name: 'display_name',
        placeholderText: 'Enter your display name',
        required: 'required'
    })

    const login = new FieldLabel({
        className: 'form-group',
        type: 'text',
        labelFor: 'login',
        labelText: 'Login:',
        labelID: 'login',
        name: 'login',
        placeholderText: 'Enter your login',
        required: 'required'
    })

    const email = new FieldLabel({
        className: 'form-group',
        type: 'email',
        labelFor: 'email',
        labelText: 'Email:',
        labelID: 'email',
        name: 'email',
        placeholderText: 'Enter your email',
        required: 'required'
    })

    const phone = new FieldLabel({
        className: 'form-group',
        type: 'text',
        labelFor: 'phone',
        labelText: 'Phone:',
        labelID: 'phone',
        name: 'phone',
        placeholderText: 'Enter your phone',
        required: 'required'
    })

    const oldPassword = new FieldLabel({
        className: 'form-group',
        type: 'password',
        labelFor: 'oldPassword',
        labelText: 'Old password:',
        labelID: 'oldPassword',
        name: 'oldPassword',
        placeholderText: 'Enter your old password',
        required: 'required'
    })

    const newPassword = new FieldLabel({
        className: 'form-group',
        type: 'password',
        labelFor: 'New password',
        labelText: 'New password:',
        labelID: 'newPassword',
        name: 'newPassword',
        placeholderText: 'Enter your new password',
        required: 'required'
    })

    const avatar = new FieldLabel({
        className: 'form-group',
        type: 'file',
        labelFor: 'avatar',
        labelText: 'Avatar:',
        labelID: 'avatar',
        name: 'avatar',
        placeholderText: '',
        required: ''  // not required
    })

    const buttonSubmit = new Button({
        className: 'buttons',
        type: 'submit',
        buttonText: 'Enter',
        events: {
            click: (event: MouseEvent) => {
                console.log(event);
            },
        },
    });

    const buttonReset = new Button({
        className: 'buttons',
        type: 'reset',
        buttonText: 'Reset',
        events: {
            click: (event: MouseEvent) => {
                console.log(event);
            },
        },
    });

    const profilePage = new Profile({
        title: 'Profile',
        action: '/profile',
        firstName: firstName,
        secondName: secondName,
        displayName: displayName,
        login: login,
        email: email,
        phone: phone,
        avatar: avatar,
        oldPassword: oldPassword,
        newPassword: newPassword,
        saveButton: buttonSubmit,
        resetButton: buttonReset
    });

    return profilePage;
}

export function MakeRegister() : Block {

    const firstName = new FieldLabel({
        className: 'form-group',
        type: 'text',
        labelFor: 'first_name',
        labelText: 'First Name:',
        labelID: 'first_name',
        name: 'first_name',
        placeholderText: 'Enter your first name',
        required: 'required'
    })

    const secondName = new FieldLabel({
        className: 'form-group',
        type: 'text',
        labelFor: 'second_name',
        labelText: 'Second Name:',
        labelID: 'second_name',
        name: 'second_name',
        placeholderText: 'Enter your second name',
        required: 'required'
    })

    const displayName = new FieldLabel({
        className: 'form-group',
        type: 'text',
        labelFor: 'display_name',
        labelText: 'Display Name:',
        labelID: 'display_name',
        name: 'display_name',
        placeholderText: 'Enter your display name',
        required: 'required'
    })

    const login = new FieldLabel({
        className: 'form-group',
        type: 'text',
        labelFor: 'login',
        labelText: 'Login:',
        labelID: 'login',
        name: 'login',
        placeholderText: 'Enter your login',
        required: 'required'
    })

    const email = new FieldLabel({
        className: 'form-group',
        type: 'email',
        labelFor: 'email',
        labelText: 'Email:',
        labelID: 'email',
        name: 'email',
        placeholderText: 'Enter your email',
        required: 'required'
    })

    const phone = new FieldLabel({
        className: 'form-group',
        type: 'text',
        labelFor: 'phone',
        labelText: 'Phone:',
        labelID: 'phone',
        name: 'phone',
        placeholderText: 'Enter your phone',
        required: 'required'
    })

    const buttonSubmit = new Button({
        className: 'buttons',
        type: 'submit',
        buttonText: 'Enter',
    });

    const profilePage = new Register({
        title: 'Register',
        action: '/register',
        firstName: firstName,
        secondName: secondName,
        displayName: displayName,
        login: login,
        email: email,
        phone: phone,
        saveButton: buttonSubmit,
    });

    return profilePage;
}

export function MakeErrors(errorCode : number) : Block {

    var props = {}

    switch (errorCode) {
        case 400:
            props = {
                errorCode: 400,
                errorMessage: "Bad Request",
                errorDetails: "Oops! The request could not be understood by the server. Please check your input and try again."
            }
            break;
        case 500:
            props = {
                errorCode: 500,
                errorMessage: "Internal Server Error",
                errorDetails: "Oops! Something went wrong on our end. Please try again later."
            }
            break;
        default:
          console.log(`Sorry, we are out of ${errorCode}.`);
      }

      var output = new ErrorMsg(props);

      return output;
}

export function MakeCharts() : Block {

    const chartList = new ChatList({
        title: "ChatList",
        className: 'chat-list'
    })

    const chartMessages = new ChartMessages({
        title: "Chat Messages",
        className: 'chat-messages',
        enterMessage: new Field({
            className: 'className',
            type: 'text',
            name: 'message',
            placeholderText: 'Type your message...',
            required: ''
        }), 
        sendMessage: new Button({
            className: 'className',
            type: 'submit',
            name: 'send',
            buttonText: 'Send',
            events: {
                click: (event: MouseEvent) => {
                    console.log(event);
                    render(".app", MakeErrors(500))
                },
            }
        }) 
    })

    const output = new Charts({
        chartList: chartList,
        className: 'chat-messages',
        chartMessages: chartMessages
    });

    return output;
}
