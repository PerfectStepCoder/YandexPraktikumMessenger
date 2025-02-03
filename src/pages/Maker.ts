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
import ChartControl from './charts/components/chartControl'
import ChartMessages from "./charts/components/messages";
//import { render } from "../utils/renderDOM";
import { HttpStatusCode } from "../utils/httpCodes"
import Router from '../router'
import HTTPClient from '../utils/sender'
//import { ResponseUser, RequestLogin } from '../utils/modelsAPI'
import { fetchChats, addEventChartListeners } from "./charts/components/chatList/ChartList";
import { MyWebSocketClient } from '../utils/webSocket';
import { getActiveListItemId, addMessage, getChartToken } from '../utils/chartHelpers'

const httpClient = new HTTPClient();
let myWebSocketClient: MyWebSocketClient | null = null;
let currentChatId: number = -1

export function MakeLogin(navigate: Router) : Block {

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
 
                // Получаем значения логина и пароля
                const loginValue = (document.querySelector('input[name="login"]') as HTMLInputElement).value;
                const passwordValue = (document.querySelector('input[name="password"]') as HTMLInputElement).value;

                const userLogin = {
                    login: loginValue,
                    password: passwordValue
                };

                httpClient.post<string>("https://ya-praktikum.tech/api/v2/auth/signin", userLogin, new Headers({ 'Content-Type': 'application/json' }))
                .then(response => {
                    console.log('Ответ сервера:', response);
                    navigate.go('/messenger')
                })
                .catch(error => {
                    if (error.response === '{"reason":"User already in system"}') {
                        navigate.go("/messenger");
                    }
                    console.error('Ошибка:', error);
                }); 
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
                navigate.go('/sign-up')
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

export function MakeProfile(navigate: Router) : Block {

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
                navigate.go('/messenger')
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

export function MakeRegister(navigate: Router) : Block {

    const firstName = new FieldLabel({
        className: 'form-group',
        type: 'text',
        labelFor: 'first_name',
        labelText: 'First Name:',
        labelID: 'first_name',
        name: 'first_name',
        placeholderText: 'Enter your first name',
        required: 'required'
    });

    const secondName = new FieldLabel({
        className: 'form-group',
        type: 'text',
        labelFor: 'second_name',
        labelText: 'Second Name:',
        labelID: 'second_name',
        name: 'second_name',
        placeholderText: 'Enter your second name',
        required: 'required'
    });

    const displayName = new FieldLabel({
        className: 'form-group',
        type: 'text',
        labelFor: 'display_name',
        labelText: 'Display Name:',
        labelID: 'display_name',
        name: 'display_name',
        placeholderText: 'Enter your display name',
        required: 'required'
    });

    const login = new FieldLabel({
        className: 'form-group',
        type: 'text',
        labelFor: 'login',
        labelText: 'Login:',
        labelID: 'login',
        name: 'login',
        placeholderText: 'Enter your login',
        required: 'required'
    });

    const password = new FieldLabel({
        className: 'form-group',
        type: 'password',
        labelFor: 'password',
        labelText: 'Password:',
        labelID: 'password',
        name: 'password',
        placeholderText: 'Enter your password',
        required: 'required'
    });

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

    const phoneTwo = new FieldLabel({
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
        events: {
            click: (event: MouseEvent) => {
                console.log(event);
 
                // Получаем значения логина и пароля
                const firstName = (document.querySelector('input[name="first_name"]') as HTMLInputElement).value;
                const secondName = (document.querySelector('input[name="second_name"]') as HTMLInputElement).value;
                //const displayName = (document.querySelector('input[name="display_name"]') as HTMLInputElement).value;
                const login = (document.querySelector('input[name="login"]') as HTMLInputElement).value;
                const password = (document.querySelector('input[name="password"]') as HTMLInputElement).value;
                const email = (document.querySelector('input[name="email"]') as HTMLInputElement).value;
                const phone = (document.querySelector('input[name="phone"]') as HTMLInputElement).value;

                const body = {
                    first_name: firstName,
                    second_name: secondName,
                    login: login,
                    email: email,
                    password: password,
                    phone: phone
                };

                httpClient.post<string>("https://ya-praktikum.tech/api/v2/auth/signup", body)
                    .then(response => {
                        console.log('Ответ сервера:', response);
                        navigate.go('/messenger')
                    })
                    .catch(error => {
                        console.error('Ошибка:', error);
                    });

            }
        }
    });

    const profilePage = new Register({
        title: 'Register',
        action: '/register',
        firstName: firstName,
        secondName: secondName,
        displayName: displayName,
        login: login,
        password: password,
        email: email,
        phone: phone,
        phoneTwo: phoneTwo,
        saveButton: buttonSubmit,
    });

    return profilePage;
}

export function MakeErrors(errorCode : HttpStatusCode) : Block {

    let props = {}

    switch (errorCode) {
        case HttpStatusCode.BAD_REQUEST:
            props = {
                errorCode: errorCode,
                errorMessage: "Bad Request",
                errorDetails: "Oops! The request could not be understood by the server. Please check your input and try again."
            }
            break;
        case HttpStatusCode.INTERNAL_SERVER_ERROR:
            props = {
                errorCode: errorCode,
                errorMessage: "Internal Server Error",
                errorDetails: "Oops! Something went wrong on our end. Please try again later."
            }
            break;
        default:
          console.log(`Sorry, we are out of ${errorCode}.`);
      }

      const output = new ErrorMsg(props);

      return output;
}

export function MakeCharts(navigate: Router, userID: number) : Block {

    console.log("userID", userID);

    const titleChart = new FieldLabel({
        className: 'form-group-chart',
        type: 'text',
        labelFor: 'title_chart',
        labelText: 'Title Chart:',
        labelID: 'title_chart',
        name: 'title_chart',
        placeholderText: 'Enter title of chart',
        required: 'required'
    });

    const buttonSaveChart = new Button({
        className: 'form-group-chart',
        type: 'submit',
        buttonText: 'Enter',
        events: {
            click: (event: MouseEvent) => {
                event.preventDefault(); // Останавливаем стандартное поведение отправки формы
                const titleChart = (document.querySelector('input[name="title_chart"]') as HTMLInputElement).value;
                console.log("Save chart:", titleChart);

                const body = {
                    title: titleChart
                }
                httpClient.post<string>("https://ya-praktikum.tech/api/v2/chats", body)
                .then(response => {
                    console.log('Ответ сервера:', response);
                    return;
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                    return;
                }).finally(()=>{
                    (document.querySelector('input[name="title_chart"]') as HTMLInputElement).value = "";
                    fetchChats(httpClient)
                    .then(chartsHTML => {
                        // Вставляем HTML в DOM
                        (document.querySelector('.chat-list ul') as HTMLInputElement).innerHTML = chartsHTML
                    }).finally(()=>{
                        addEventChartListeners()
                    })
                });
            }
        }
    });

    const buttonLogout = new Button({
        className: 'form-group-chart',
        type: 'submit',
        buttonText: 'Logout',
        events: {
            click: (event: MouseEvent) => {
                event.preventDefault(); // Останавливаем стандартное поведение отправки формы
                httpClient.post<string>("https://ya-praktikum.tech/api/v2/auth/logout")
                .then(response => {
                    console.log('Ответ сервера:', response);
                    navigate.go('/');
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                });
            }
        }
    });

    const chartControl = new ChartControl({
        inputTitleChart: titleChart,
        saveChat: buttonSaveChart
    });
    
    const chartList = new ChatList({
        title: "ChatList",
        className: 'chat-list',
        charts: "",
        chartControl: chartControl,
        buttonLogout: buttonLogout 
    }, httpClient)

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
                    (async () => {
                        const chatId = getActiveListItemId();
 
                        const newMessage = (document.querySelector('input[name="message"]') as HTMLInputElement).value;
      
                        if (chatId != null) {
                            if (currentChatId != chatId) {
                                const token = await getChartToken(httpClient, chatId);
                                const urlWS = `wss://ya-praktikum.tech/ws/chats/${userID}/${chatId}/${token}`;
                                console.log("urlWS", urlWS);
                                myWebSocketClient = new MyWebSocketClient(urlWS);
                                myWebSocketClient.connect();
                            } 
                            addMessage(newMessage, true);
                            myWebSocketClient?.send(newMessage)    
                        } else {
                            console.log('Select chart!');
                        }
                    })();
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

