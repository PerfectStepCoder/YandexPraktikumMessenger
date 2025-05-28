import LayoutMain from "../layout/main";
import Button from "../components/button";
import Field from "../components/field";
import FieldLabel from "../components/fieldLabel";
import { Block } from "../common/Component";
import Profile from "./profile"
import Register from "./register"
import ErrorMsg from "../components/error";
import Charts from "./charts";
import ChatList from "./charts/components/chatList";
import ChartControl from './charts/components/chartControl'
import ChartMessages from "./charts/modules/messages";
import { HttpStatusCode } from "../services/httpCodes"
import Router from '../router'
import HTTPClient from '../services/sender'
import { fetchChats, addEventSelectChat } from "./charts/components/chatList/ChartList";
import { getNewConnectSocket, MyWebSocketClient } from '../services/webSocket';
import { getActiveListItemId, addMessage, getChartToken } from '../services/chartHelpers'
import { CreateLogin } from "./login";
import CreateRegister from "./register/maker";
import AddUserInChat from "./charts/components/addUserInChat";

const apiUrl = import.meta.env.VITE_API_URL;

const httpClient = new HTTPClient(apiUrl);

let myWebSocketClient: MyWebSocketClient | null = null;
let currentChatId: number = -1

export function MakeLogin(navigate: Router, currentUserID: number) : Block {

    if (currentUserID !== 0) {
        navigate.go('/messenger');
    }

    const loginPage = CreateLogin(navigate, httpClient)

    const layout = new LayoutMain({
        mainContent: loginPage,
        className: "layout"
    });

    return layout;
}

export function MakeProfile(navigate: Router, currentUserID: number) : Block {

    console.log("userID", currentUserID);

    if (currentUserID === 0) {
        navigate.go('/');
    }

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

    const profilePage = CreateRegister(navigate, httpClient)

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

    if (userID === 0) {
        navigate.go('/');
    }

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
        buttonText: 'Add new chart',
        events: {
            click: (event: MouseEvent) => {
                event.preventDefault(); // Останавливаем стандартное поведение отправки формы
                const titleChart = (document.querySelector('input[name="title_chart"]') as HTMLInputElement).value;
                console.log("Save chart:", titleChart);
                const body = {
                    title: titleChart
                }
                httpClient.post<string>("/chats", body)
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
                            addEventSelectChat(httpClient, userID)
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
                httpClient.post<string>("/auth/logout")
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

    const userIDtoChart = new FieldLabel({
        className: 'form-group-chart',
        type: 'text',
        labelFor: 'user_id_for_chart',
        labelText: 'User ID:',
        labelID: 'user_id_for_chart',
        name: 'user_id_for_chart',
        placeholderText: 'Enter user ID',
        required: 'required'
    });

    const buttonAddUserChat = new Button({
        className: 'form-group-chart',
        type: 'submit',
        buttonText: 'Add User',
        events: {
            click: (event: MouseEvent) => {
                event.preventDefault(); // Останавливаем стандартное поведение отправки формы
                const chatId = getActiveListItemId();
                if (chatId === null) 
                {
                    console.log("Необходимо выбрать чат");
                    return
                }
                const userID = (document.querySelector('input[name="user_id_for_chart"]') as HTMLInputElement).value;
                const data = {
                    "users": [
                        userID
                    ],
                    "chatId": chatId
                }
                httpClient.put<string>("/chats/users", data)
                .then(response => {
                    console.log('Ответ сервера:', response);
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                });
            }
        }
    });

    const addUserInChat = new AddUserInChat({
        inputUserID: userIDtoChart,
        saveUser: buttonAddUserChat 
    });

    const chartList = new ChatList({
        title: "ChatList",
        className: 'chat-list',
        charts: "",
        chartControl: chartControl,
        buttonLogout: buttonLogout,
        addUserInChat: addUserInChat,
    }, httpClient, userID)

    let myWebSocketCurrent : WebSocket | null = null;  //MyWebSocketClient | null = null;

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
                        console.log(`chatId: ${chatId}, currentChatId: ${currentChatId}`);

                        if (chatId != null) {
                            if (currentChatId == chatId) {
                                if (myWebSocketCurrent === null) {
                                    const token = await getChartToken(httpClient, chatId);
                                    myWebSocketCurrent = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userID}/${chatId}/${token}`);
                                    myWebSocketCurrent.addEventListener('open', () => {
                                        console.log('Соединение установлено (прежний чат)');
                                        myWebSocketCurrent?.send(JSON.stringify({
                                            content: newMessage,
                                            type: 'message',
                                        }));
                                        // Пингуем раз в 20–30 секунд для поддержания соединения
                                        setInterval(() => {
                                            myWebSocketCurrent?.send(JSON.stringify({ type: "ping" }));
                                        }, 25000);
                                    }); 
                                    myWebSocketCurrent.addEventListener('message', event => {
                                        const data = JSON.parse(event.data);
                                        console.log('Получены данные (в прежнем чате)', event.data);
                                        if (Array.isArray(data)) {
                                            data.forEach((message)=>{
                                                addMessage(message.content, Number(message.user_id) === userID);
                                            });
                                        }
                                    });
                                    myWebSocketCurrent.addEventListener('error', event => {
                                        console.log('Ошибка', event);
                                    });
                                } else {
                                    myWebSocketCurrent?.send(JSON.stringify({
                                        content: newMessage,
                                        type: 'message',
                                    }));
                                }
                            } else { // если сменили чат
                                currentChatId = chatId;
                                myWebSocketCurrent?.close();
                                const token = await getChartToken(httpClient, chatId);
                                myWebSocketCurrent = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userID}/${chatId}/${token}`);
                                myWebSocketCurrent.addEventListener('open', () => {
                                    console.log('Соединение установлено (смена чата)');
                                    myWebSocketCurrent?.send(JSON.stringify({
                                        content: newMessage,
                                        type: 'message',
                                    }));
                                    // Пингуем раз в 20–30 секунд для поддержания соединения
                                    setInterval(() => {
                                        myWebSocketCurrent?.send(JSON.stringify({ type: "ping" }));
                                    }, 25000);
                                }); 
                                myWebSocketCurrent.addEventListener('message', event => {
                                    const message = JSON.parse(event.data);
                                    console.log('Получены данные (сменили чат)', event.data);
                                    if (message.type === 'message' ) {
                                       addMessage(message.content, Number(message.user_id) === userID);
                                    }
                                });
                                myWebSocketCurrent.addEventListener('error', event => {
                                    console.log('Ошибка', event);
                                });
                            } 
                        } else {
                            console.log('No sending. Select chart!');
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

