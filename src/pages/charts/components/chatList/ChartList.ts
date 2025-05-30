import { Block } from "../../../../common/Component";
import template from "./template";
import HTTPClient from "../../../../services/sender";
import {
  addMessage,
  clearMessage,
  fetchAllMessages,
  fetchAllOldMessages,
  getChartToken,
  getUnreadCount,
} from "../../../../services/chartHelpers";
import { getNewConnectSocket } from "../../../../services/webSocket";
//import { MyWebSocketClient } from "../../../../utils/webSocket";

interface ChartListProps extends Record<string, unknown> {
  count?: number; // буду использовать в будущем
}

interface ChartFromBack {
  id: number;
  title: string;
}

export async function fetchChats(httpClient: HTTPClient) {
  try {
    const response = await httpClient.get<ChartFromBack[]>(
      "/chats?offset=0&limit=100",
    );
    console.log("Ответ сервера charts:", response);

    const chartsHTML = response
      .map(
        (chat: ChartFromBack) => `<li data-id="${chat.id}">${chat.title}</li>`,
      )
      .join("");
    console.log("chartsHTML", chartsHTML);

    return chartsHTML; // Возвращаем сгенерированный HTML
  } catch (error) {
    console.error("Ошибка charts:", error);
    throw error; // Пробрасываем ошибку
  }
}

export async function fetchMessagesChart(
  httpClient: HTTPClient,
  chartId: number,
) {
  try {
    const response = await httpClient.get<ChartFromBack[]>(
      "/chats?offset=0&limit=100",
    );
    console.log("Ответ сервера charts:", response, chartId);

    const chartsHTML = response
      .map(
        (chat: ChartFromBack) => `<li data-id="${chat.id}">${chat.title}</li>`,
      )
      .join("");
    console.log("chartsHTML", chartsHTML);

    return chartsHTML; // Возвращаем сгенерированный HTML
  } catch (error) {
    console.error("Ошибка charts:", error);
    throw error; // Пробрасываем ошибку
  }
}

export function addEventSelectChat(httpClient: HTTPClient, userID: number) {
  const listItems = document.querySelectorAll(".chat-list li");
  console.log("addEventSelectChat", listItems, "userID", userID);

  listItems.forEach((li) => {
    li.addEventListener("click", () => {
      console.log("Click chart!");

      // Убираем класс `active` у всех элементов
      listItems.forEach((item) => item.classList.remove("active"));
      // Добавляем класс `active` к текущему элементу
      li.classList.add("active");
      const selectedCharID = li.getAttribute("data-id");
      console.log(`Selected chat ID: ${selectedCharID}`);
      clearMessage();
      let countNewMessages = 0;
      const selectedCharIDnum: number = Number(selectedCharID);
      getUnreadCount(httpClient, selectedCharIDnum)
        .then(
          (countNewMessagesData) => (countNewMessages = countNewMessagesData), //console.log(countNewMessagesData)
        )
        .catch((error) => {
          console.error(
            "Ошибка при получение количества новых сообщений в чате:",
            error,
          );
        })
        .finally(() => {
          //this.emitEvent(Block.EVENTS.EVENT_FLOW_UPDATE);
          console.log(`New messages: ${countNewMessages}`);
          if (countNewMessages > 0) {
            // getNewConnectSocket(httpClient, userID, selectedCharIDnum).then((sockerReady) => {
            //   sockerReady.connect()
            //   fetchAllMessages(countNewMessages, sockerReady)
            //     .then((messages) => {
            //       console.log("Все сообщения:", messages);
            //     })
            //     .catch((err) => {
            //       console.error("Ошибка получения всех сообщений в чате:", err);
            //     });
            //   sockerReady.close();
            // }).catch((err) => {
            //   console.log(`No connect to socket: ${err}`)
            // })
          } else {
            //
          }
          fetchAllOldMessages(httpClient, userID, selectedCharIDnum)
            .then((messages) => {
              console.log("Все сообщения:", messages);
              messages.forEach((message) => {
                addMessage(message.content, Number(message.user_id) === userID);
              });
            })
            .catch((err) => {
              console.error("Ошибка получения всех сообщений в чате:", err);
            })
            .finally(() => {
              //
            });
        });
    });
  });
}

export default class ChartList extends Block<ChartListProps> {
  private httpClient: HTTPClient;
  public userID: number;

  constructor(props: ChartListProps, httpClient: HTTPClient, userID: number) {
    super("div", props);
    this.httpClient = httpClient;
    this.userID = userID;
    //this.myWebSocketClient = myWebSocketClient;
    this.bindEvent(Block.EVENTS.EVENT_FLOW_CDM, this.initCharts.bind(this));
    this.bindEvent(
      Block.EVENTS.EVENT_FLOW_UPDATE,
      this.addEventListeners.bind(this),
    );
  }

  render(): DocumentFragment {
    // В данном случае render возвращает строкой разметку из шаблонизатора
    return this.compile(template, this.props);
  }

  // Метод для добавления обработчиков событий
  addEventListeners() {
    addEventSelectChat(this.httpClient, this.userID);
  }

  initCharts() {
    fetchChats(this.httpClient)
      .then((chartsHTML) => {
        // Вставляем HTML в DOM
        (
          document.querySelector(".chat-list ul") as HTMLInputElement
        ).innerHTML = chartsHTML;
      })
      .catch((error) => {
        console.error("Ошибка при загрузке чатов:", error);
      })
      .finally(() => {
        this.emitEvent(Block.EVENTS.EVENT_FLOW_UPDATE);
      });
  }
}
