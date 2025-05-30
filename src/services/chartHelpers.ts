import HTTPClient from "./sender";
import { MyWebSocketClient } from "./webSocket";

export function getActiveListItemId(): number | null {
  // Находим активный элемент
  const activeElement = document.querySelector("ul li.active");

  // Если активный элемент найден, извлекаем его data-id
  if (activeElement) {
    const id = activeElement.getAttribute("data-id");
    return id ? parseInt(id, 10) : null; // Преобразуем строку в число
  }

  // Если активный элемент не найден, возвращаем null
  return null;
}

interface ResponseToken {
  token: string;
}

export async function fetchChartToken(httpClient: HTTPClient, chartID: number) {
  try {
    const response = await httpClient.post<ResponseToken>(
      `/chats/token/${chartID}`,
    );
    console.log("Ответ сервера token:", response);
    return response.token; // Возвращаем token
  } catch (error) {
    console.error("Ошибка token:", error);
    throw error; // Пробрасываем ошибку
  }
}

export async function getChartToken(httpClient: HTTPClient, chartID: number) {
  //: string | null
  try {
    const token = await fetchChartToken(httpClient, chartID);
    return token; // Возвращаем token
  } catch (error) {
    console.error("Ошибка при загрузке token:", error);
    return null; // Возвращаем null в случае ошибки
  }
}

export function addMessage(text: string, isAuthor: boolean = false): void {
  // Находим контейнер для сообщений
  const chatMessages = document.querySelector(".chat-messages");

  if (!chatMessages) {
    console.error("Chat messages container not found!");
    return;
  }

  // Создаем новый элемент сообщения
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");

  // Если сообщение от автора, добавляем класс `author`
  if (isAuthor) {
    messageElement.classList.add("author");
  }

  // Устанавливаем текст сообщения
  messageElement.textContent = text;

  // Добавляем сообщение в контейнер
  chatMessages.appendChild(messageElement);

  // Прокручиваем контейнер вниз, чтобы показать новое сообщение
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

export function clearMessage(): void {
  // Находим контейнер для сообщений
  const chatMessages = document.querySelector(".chat-messages");

  if (chatMessages) {
    chatMessages.innerHTML = "";
  }
}

function getCookie(key: string): string | null {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [k, v] = cookie.split("=");
    if (k === key) {
      return decodeURIComponent(v);
    }
  }
  return null;
}

export async function getUnreadCount(
  httpClient: HTTPClient,
  chartID: number,
): Promise<number> {
  const auth_token = getCookie("auth_token");
  const cookie = `auth_token=${auth_token}`;

  const res = await fetch(`${httpClient.getBaseUrl()}/chats/new/${chartID}`, {
    headers: {
      cookie: cookie,
    },
    credentials: "include",
  });

  if (!res.ok)
    throw new Error("Ошибка получения количества непрочитанных сообщений");

  const data = await res.json();
  return data.unread_count;
}

interface ChatMessage {
  chat_id: string;
  time: string;
  type: "message" | "file";
  user_id: string;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
}

export async function fetchAllMessages(
  unreadTotal: number,
  socket: MyWebSocketClient,
): Promise<ChatMessage[]> {
  const allMessages: ChatMessage[] = [];

  return new Promise((resolve, reject) => {
    let isOpen = false;

    socket.onOpen = () => {
      isOpen = true;
      socket.send(JSON.stringify({ type: "ping" }));
      requestMessages(0);
    };

    socket.onMessage = (event: any) => {
      const data = JSON.parse(event.data);

      if (Array.isArray(data)) {
        allMessages.push(...data);

        if (allMessages.length >= unreadTotal) {
          socket.close();
          resolve(allMessages);
        } else {
          const nextOffset = allMessages.length;
          requestMessages(nextOffset);
        }
      } else if (data.type === "pong") {
        // Ping-Pong поддержка
      } else if (data.type === "user connected") {
        // Можно обработать подключение пользователя
      }
    };

    socket.onError = (e: Event) => {
      reject(new Error(`Ошибка WebSocket: ${e}`));
    };

    function requestMessages(offset: number) {
      if (!isOpen) return;
      const msg = {
        type: "get old",
        content: offset.toString(),
      };
      socket.send(JSON.stringify(msg));
    }
  });
}

export async function fetchAllOldMessages(
  httpClient: HTTPClient,
  userID: number,
  charID: number,
): Promise<ChatMessage[]> {
  const allMessages: ChatMessage[] = [];
  let offset = -20;
  const token = await getChartToken(httpClient, charID);
  console.log(`wss://ya-praktikum.tech/ws/chats/${userID}/${charID}/${token}`);
  const socket = new WebSocket(
    `wss://ya-praktikum.tech/ws/chats/${userID}/${charID}/${token}`,
  );

  return new Promise((resolve, reject) => {
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "ping" }));
      requestMessages(offset);
    };

    socket.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      console.log("data", data);

      if (Array.isArray(data)) {
        allMessages.push(...data);

        if (data.length === 0) {
          socket.close();
          resolve(allMessages);
        } else {
          offset += 20;
          requestMessages(offset);
        }
      } else if (data.type === "pong") {
        // Ping-Pong поддержка
      } else if (data.type === "user connected") {
        // Можно обработать подключение пользователя
      }
    };

    socket.onerror = (e: Event) => {
      reject(new Error(`Ошибка WebSocket: ${e}`));
    };

    function requestMessages(offset: number) {
      offset += 20;
      const msg = {
        type: "get old",
        content: offset.toString(),
      };
      socket.send(JSON.stringify(msg));
    }
  });
}
