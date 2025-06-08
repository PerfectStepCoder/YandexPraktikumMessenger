import LayoutMain from "../layout/main";
import Button from "../components/button";
import Field from "../components/field";
import FieldLabel from "../components/fieldLabel";
import { Block } from "../common/Component";
import Profile from "./profile";
import ErrorMsg from "../components/error";
import Charts from "./charts";
import ChatList from "./charts/components/chatList";
import ChartControl from "./charts/components/chartControl";
import ChartMessages from "./charts/modules/messages";
import { HttpStatusCode } from "../services/httpCodes";
import Router from "../router";
import HTTPClient from "../services/sender";
import {
  fetchChats,
  addEventSelectChat,
} from "./charts/components/chatList/ChartList";
import {
  getActiveListItemId,
  addMessage,
  getChartToken,
} from "../services/chartHelpers";
import { CreateLogin } from "./login";
import CreateRegister from "./register/maker";
import AddUserInChat from "./charts/components/addUserInChat";
import { uploadAvatar, UserProfile } from "../services/userHelpers";

const apiUrl = import.meta.env.VITE_API_URL;

const httpClient = new HTTPClient(apiUrl);

let currentChatId: number = -1;

export function MakeLogin(navigate: Router, currentUserID: number): Block {

  if (currentUserID !== -1) {
    navigate.go("/messenger");
  }

  const loginPage = CreateLogin(navigate, httpClient);

  const layout = new LayoutMain({
    mainContent: loginPage,
    className: "layout",
  });

  return layout;
}

export function MakeProfile(
  navigate: Router,
  currentUserID: number,
  userProfile: UserProfile,
): Block {

  console.log("userID", currentUserID);

  if (currentUserID === -1) {
    navigate.go("/");
  }

  console.log("userProfile", userProfile);

  const firstName = new FieldLabel({
    className: "form-group",
    type: "text",
    labelFor: "first_name",
    labelText: "First Name:",
    labelID: "first_name",
    name: "first_name",
    placeholderText: userProfile.first_name,
    value: userProfile.first_name,
    required: "required",
  });

  const secondName = new FieldLabel({
    className: "form-group",
    type: "text",
    labelFor: "second_name",
    labelText: "Second Name:",
    labelID: "second_name",
    name: "second_name",
    placeholderText: userProfile.second_name,
    value: userProfile.second_name,
    required: "required",
  });

  const displayName = new FieldLabel({
    className: "form-group",
    type: "text",
    labelFor: "display_name",
    labelText: "Display Name:",
    labelID: "display_name",
    name: "display_name",
    placeholderText: userProfile.display_name,
    value: userProfile.display_name,
    required: "required",
  });

  const login = new FieldLabel({
    className: "form-group",
    type: "text",
    labelFor: "login",
    labelText: "Login:",
    labelID: "login",
    name: "login",
    placeholderText: userProfile.login,
    value: userProfile.login,
    required: "required",
  });

  const email = new FieldLabel({
    className: "form-group",
    type: "email",
    labelFor: "email",
    labelText: "Email:",
    labelID: "email",
    name: "email",
    placeholderText: userProfile.email,
    value: userProfile.email,
    required: "required",
  });

  const phone = new FieldLabel({
    className: "form-group",
    type: "text",
    labelFor: "phone",
    labelText: "Phone:",
    labelID: "phone",
    name: "phone",
    placeholderText: userProfile.phone,
    value: userProfile.phone,
    required: "required",
  });

  const avatar = new FieldLabel({
    className: "form-group",
    type: "file",
    labelFor: "avatar",
    labelText: "Avatar:",
    labelID: "avatar",
    name: "avatar",
    placeholderText: userProfile.avatar,
    value: userProfile.avatar,
    required: "", // not required
  });

  const buttonSubmit = new Button({
    className: "buttons",
    type: "submit",
    buttonText: "Enter",
    events: {
      click: (event: MouseEvent) => {
        console.log(event);
        event.preventDefault(); // Останавливаем стандартное поведение отправки формы
        // Получаем значения логина и пароля
        const firstName = (
          document.querySelector('input[name="first_name"]') as HTMLInputElement
        ).value;
        const secondName = (
          document.querySelector(
            'input[name="second_name"]',
          ) as HTMLInputElement
        ).value;
        //const displayName = (document.querySelector('input[name="display_name"]') as HTMLInputElement).value;
        const login = (
          document.querySelector('input[name="login"]') as HTMLInputElement
        ).value;
        const email = (
          document.querySelector('input[name="email"]') as HTMLInputElement
        ).value;
        const phone = (
          document.querySelector('input[name="phone"]') as HTMLInputElement
        ).value;
        const display_name = (
          document.querySelector(
            'input[name="display_name"]',
          ) as HTMLInputElement
        ).value;

        const avatar = document.querySelector(
          'input[name="avatar"]',
        ) as HTMLInputElement;

        const avatarURL = `${apiUrl}/resources/${userProfile.avatar}`;

        if (userProfile.avatar) {
          const avatarWrapper = document.querySelector('div[id="avatar-img"]');
          const avatarImg = document.createElement("img");
          avatarImg.src = avatarURL; // путь к картинке
          avatarImg.alt = "User avatar";
          avatarImg.className = "user-avatar";
          avatarImg.style.maxWidth = "100px"; // или через CSS
          avatarWrapper?.appendChild(avatarImg);
        }

        console.log("avatar", avatar);

        const body = {
          first_name: firstName ? firstName : userProfile.first_name,
          second_name: secondName ? secondName : userProfile.second_name,
          display_name: display_name ? display_name : userProfile.display_name,
          login: login ? login : userProfile.login,
          email: email ? email : userProfile.email,
          phone: phone ? phone : userProfile.phone,
        };

        uploadAvatar(avatar).then((data) => {
          console.log("data", data);
        });

        httpClient
          .put<string>("/user/profile", body)
          .then((response) => {
            console.log("Ответ сервера:", response);
            alert("Profile saved");
            navigate.go("/messenger");
          })
          .catch((error) => {
            console.error("Ошибка:", error);
          });
      },
    },
  });

  const homeButton = new Button({
    className: "buttons",
    type: "submit",
    buttonText: "Home",
    events: {
      click: (event: MouseEvent) => {
        console.log(event);
        navigate.go("/messenger");
      },
    },
  });

  const profilePage = new Profile({
    title: "Profile",
    action: "/settings",
    firstName: firstName,
    secondName: secondName,
    displayName: displayName,
    login: login,
    email: email,
    phone: phone,
    avatar: avatar,
    homeButton: homeButton,
    saveButton: buttonSubmit,
  });

  return profilePage;
}

export function MakeRegister(navigate: Router): Block {
  const profilePage = CreateRegister(navigate, httpClient);

  return profilePage;
}

export function MakeErrors(errorCode: HttpStatusCode): Block {
  let props = {};

  switch (errorCode) {
    case HttpStatusCode.BAD_REQUEST:
      props = {
        errorCode: errorCode,
        errorMessage: "Bad Request",
        errorDetails:
          "Oops! The request could not be understood by the server. Please check your input and try again.",
      };
      break;
    case HttpStatusCode.INTERNAL_SERVER_ERROR:
      props = {
        errorCode: errorCode,
        errorMessage: "Internal Server Error",
        errorDetails:
          "Oops! Something went wrong on our end. Please try again later.",
      };
      break;
    default:
      console.log(`Sorry, we are out of ${errorCode}.`);
  }

  const output = new ErrorMsg(props);

  return output;
}

export function MakeCharts(navigate: Router, userID: number): Block {
  console.log("userID", userID);

  if (userID === -1) {
    navigate.go("/");
  }

  const titleChart = new FieldLabel({
    className: "form-group-chart",
    type: "text",
    labelFor: "title_chart",
    labelText: "Title Chart:",
    labelID: "title_chart",
    name: "title_chart",
    placeholderText: "Enter title of chart",
    required: "required",
  });

  const buttonSaveChart = new Button({
    className: "form-group-chart",
    type: "submit",
    buttonText: "Add new chart",
    events: {
      click: (event: MouseEvent) => {
        event.preventDefault(); // Останавливаем стандартное поведение отправки формы
        const titleChart = (
          document.querySelector(
            'input[name="title_chart"]',
          ) as HTMLInputElement
        ).value;
        console.log("Save chart:", titleChart);
        const body = {
          title: titleChart,
        };
        httpClient
          .post<string>("/chats", body)
          .then((response) => {
            console.log("Ответ сервера:", response);
            return;
          })
          .catch((error) => {
            console.error("Ошибка:", error);
            return;
          })
          .finally(() => {
            (
              document.querySelector(
                'input[name="title_chart"]',
              ) as HTMLInputElement
            ).value = "";
            fetchChats(httpClient)
              .then((chartsHTML) => {
                // Вставляем HTML в DOM
                (
                  document.querySelector(".chat-list ul") as HTMLInputElement
                ).innerHTML = chartsHTML;
              })
              .finally(() => {
                addEventSelectChat(httpClient, userID);
              });
          });
      },
    },
  });

  const buttonLogout = new Button({
    className: "form-group-chart",
    type: "submit",
    buttonText: "Logout",
    events: {
      click: (event: MouseEvent) => {
        event.preventDefault(); // Останавливаем стандартное поведение отправки формы
        httpClient
          .post<string>("/auth/logout")
          .then((response) => {
            console.log("Ответ сервера:", response);
            navigate.go("/");
          })
          .catch((error) => {
            console.error("Ошибка:", error);
          });
      },
    },
  });

  const chartControl = new ChartControl({
    inputTitleChart: titleChart,
    saveChat: buttonSaveChart,
  });

  const userIDtoChart = new FieldLabel({
    className: "form-group-chart",
    type: "text",
    labelFor: "user_id_for_chart",
    labelText: "User ID:",
    labelID: "user_id_for_chart",
    name: "user_id_for_chart",
    placeholderText: "Enter user ID",
    required: "required",
  });

  const buttonAddUserChat = new Button({
    className: "form-group-chart",
    type: "submit",
    buttonText: "Add User",
    events: {
      click: (event: MouseEvent) => {
        event.preventDefault(); // Останавливаем стандартное поведение отправки формы
        const chatId = getActiveListItemId();
        if (chatId === null) {
          console.log("Необходимо выбрать чат");
          return;
        }
        const userID = (
          document.querySelector(
            'input[name="user_id_for_chart"]',
          ) as HTMLInputElement
        ).value;
        const data = {
          users: [userID],
          chatId: chatId,
        };
        httpClient
          .put<string>("/chats/users", data)
          .then((response) => {
            console.log("Ответ сервера:", response);
          })
          .catch((error) => {
            console.error("Ошибка:", error);
          })
          .finally(() => {
            (
              document.querySelector(
                'input[name="user_id_for_chart"]',
              ) as HTMLInputElement
            ).value = "";
          });
      },
    },
  });

  const buttonDeleteUserChat = new Button({
    className: "form-group-chart",
    type: "submit",
    buttonText: "Delete User",
    events: {
      click: (event: MouseEvent) => {
        event.preventDefault(); // Останавливаем стандартное поведение отправки формы
        const chatId = getActiveListItemId();
        if (chatId === null) {
          console.log("Необходимо выбрать чат");
          return;
        }
        const userID = (
          document.querySelector(
            'input[name="user_id_for_chart"]',
          ) as HTMLInputElement
        ).value;
        const data = {
          users: [userID],
          chatId: chatId,
        };
        httpClient
          .delete<string>("/chats/users", data)
          .then((response) => {
            console.log("Ответ сервера:", response);
          })
          .catch((error) => {
            console.error("Ошибка:", error);
          })
          .finally(() => {
            (
              document.querySelector(
                'input[name="user_id_for_chart"]',
              ) as HTMLInputElement
            ).value = "";
          });
      },
    },
  });

  const addUserInChat = new AddUserInChat({
    inputUserID: userIDtoChart,
    saveUser: buttonAddUserChat,
    deleteUser: buttonDeleteUserChat,
  });

  const buttonProfile = new Button({
    className: "form-group-chart",
    type: "submit",
    buttonText: "Profile",
    events: {
      click: (event: MouseEvent) => {
        event.preventDefault(); // Останавливаем стандартное поведение отправки формы
        navigate.go("/settings");
      },
    },
  });

  const chartList = new ChatList(
    {
      title: "ChatList",
      className: "chat-list",
      charts: "",
      chartControl: chartControl,
      buttonLogout: buttonLogout,
      addUserInChat: addUserInChat,
      buttonProfile: buttonProfile,
    },
    httpClient,
    userID,
  );

  let myWebSocketCurrent: WebSocket | null = null; //MyWebSocketClient | null = null;

  const chartMessages = new ChartMessages({
    title: "Chat Messages",
    className: "chat-messages",
    enterMessage: new Field({
      className: "className",
      type: "text",
      name: "message",
      placeholderText: "Type your message...",
      required: "",
    }),
    sendMessage: new Button({
      className: "className",
      type: "submit",
      name: "send",
      buttonText: "Send",
      events: {
        click: (event: MouseEvent) => {
          console.log(event);
          (async () => {
            const chatId = getActiveListItemId();

            const newMessage = (
              document.querySelector(
                'input[name="message"]',
              ) as HTMLInputElement
            ).value;
            if (newMessage === "") {
              console.log("Сообщение не должно быть пустой строкой");
              alert("Сообщение не должно быть пустой строкой");
              return;
            }
            console.log(`chatId: ${chatId}, currentChatId: ${currentChatId}`);

            if (chatId != null) {
              if (currentChatId == chatId) {
                if (myWebSocketCurrent === null) {
                  const token = await getChartToken(httpClient, chatId);
                  myWebSocketCurrent = new WebSocket(
                    `wss://ya-praktikum.tech/ws/chats/${userID}/${chatId}/${token}`,
                  );
                  myWebSocketCurrent.addEventListener("open", () => {
                    console.log("Соединение установлено (прежний чат)");
                    myWebSocketCurrent?.send(
                      JSON.stringify({
                        content: newMessage,
                        type: "message",
                      }),
                    );
                    // Пингуем раз в 20–30 секунд для поддержания соединения
                    setInterval(() => {
                      myWebSocketCurrent?.send(
                        JSON.stringify({ type: "ping" }),
                      );
                    }, 25000);
                  });
                  myWebSocketCurrent.addEventListener("message", (event) => {
                    let data = {};
                    try {
                      data = JSON.parse(event.data);
                    } catch (err: unknown) {
                      console.log(`Error parsing: ${err}`);
                      return;
                    }
                    console.log("Получены данные (в прежнем чате)", event.data);
                    if (Array.isArray(data)) {
                      data.forEach((message) => {
                        addMessage(
                          message.content,
                          Number(message.user_id) === userID,
                        );
                      });
                    }
                  });
                  myWebSocketCurrent.addEventListener("error", (event) => {
                    console.log("Ошибка", event);
                  });
                } else {
                  myWebSocketCurrent?.send(
                    JSON.stringify({
                      content: newMessage,
                      type: "message",
                    }),
                  );
                }
              } else {
                // если сменили чат
                currentChatId = chatId;
                myWebSocketCurrent?.close();
                const token = await getChartToken(httpClient, chatId);
                myWebSocketCurrent = new WebSocket(
                  `wss://ya-praktikum.tech/ws/chats/${userID}/${chatId}/${token}`,
                );
                myWebSocketCurrent.addEventListener("open", () => {
                  console.log("Соединение установлено (смена чата)");
                  myWebSocketCurrent?.send(
                    JSON.stringify({
                      content: newMessage,
                      type: "message",
                    }),
                  );
                  // Пингуем раз в 20–30 секунд для поддержания соединения
                  setInterval(() => {
                    myWebSocketCurrent?.send(JSON.stringify({ type: "ping" }));
                  }, 25000);
                });
                myWebSocketCurrent.addEventListener("message", (event) => {
                  let message = { type: "", user_id: "", content: "" };
                  try {
                    message = JSON.parse(event.data);
                  } catch (err: unknown) {
                    console.log(`Error parsing: ${err}`);
                    return;
                  }
                  console.log("Получены данные (сменили чат)", event.data);
                  if (message.type === "message") {
                    addMessage(
                      message.content,
                      Number(message.user_id) === userID,
                    );
                  }
                });
                myWebSocketCurrent.addEventListener("error", (event) => {
                  console.log("Ошибка", event);
                });
              }
            } else {
              console.log("No sending. Select chart!");
            }
            (
              document.querySelector(
                'input[name="message"]',
              ) as HTMLInputElement
            ).value = "";
          })();
        },
      },
    }),
  });

  const output = new Charts({
    chartList: chartList,
    className: "chat-messages",
    chartMessages: chartMessages,
  });

  return output;
}
