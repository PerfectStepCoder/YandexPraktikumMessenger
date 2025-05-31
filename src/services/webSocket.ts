import { getChartToken } from "./chartHelpers";
import HTTPClient from "./sender";

export interface WebSocketMessage {
  content: string;
  type: string;
}

export class WebSocketClientBase {
  protected socket: WebSocket | null = null;
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  // Подключение к WebSocket
  public connect(): void {
    this.socket = new WebSocket(this.url);

    // Обработка открытия соединения
    this.socket.onopen = () => {
      console.log("WebSocket connection established.");
      this.onOpen();
    };

    // Обработка получения сообщения
    this.socket.onmessage = (event: MessageEvent) => {
      console.log("Message received:", event.data);
      this.onMessage(event.data);
    };

    // Обработка ошибок
    this.socket.onerror = (event: Event) => {
      console.error("WebSocket error:", event);
      this.onError(event);
    };

    // Обработка закрытия соединения
    this.socket.onclose = (event: CloseEvent) => {
      console.log("WebSocket connection closed:", event.reason);
      this.onClose(event);
    };
  }

  // Отправка сообщения
  public send(message: WebSocketMessage): void {
    console.log(JSON.stringify(message));
    console.log(this.socket?.readyState);
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not connected.");
    }
  }

  // Закрытие соединения
  public close(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  // Метод, вызываемый при открытии соединения
  protected onOpen(): void {
    // Переопределите этот метод в дочернем классе, если нужно
  }

  // Метод, вызываемый при получении сообщения
  protected onMessage(data: WebSocketMessage): void {
    // Переопределите этот метод в дочернем классе, если нужно
    console.log(data);
  }

  // Метод, вызываемый при ошибке
  protected onError(event: Event): void {
    // Переопределите этот метод в дочернем классе, если нужно
    console.log(event);
  }

  // Метод, вызываемый при закрытии соединения
  protected onClose(event: CloseEvent): void {
    // Переопределите этот метод в дочернем классе, если нужно
    console.log(event);
  }
}

export class MyWebSocketClient extends WebSocketClientBase {
  constructor(url: string) {
    super(url);
  }

  public onOpen(): void {
    console.log("Connection opened! onOpen onOpen");
    //this.send('Hello, server!');
    this.socket?.readyState == WebSocket.OPEN;
    this.send({ type: "ping", content: "" }));
  }

  public onMessage(data: WebSocketMessage): void {
    console.log("Received message:", data);
  }

  public onError(event: Event): void {
    console.error("WebSocket error occurred:", event);
  }

  public onClose(event: CloseEvent): void {
    console.log("Connection closed:", event.reason);
  }
}

export async function getNewConnectSocket(
  httpClient: HTTPClient,
  userID: number,
  chatId: number,
): Promise<MyWebSocketClient> {
  const token = await getChartToken(httpClient, chatId);
  console.log("token:", token);
  const urlWS = `wss://ya-praktikum.tech/ws/chats/${userID}/${chatId}/${token}`;
  console.log("urlWS", urlWS);
  const myWebSocketClient = new MyWebSocketClient(urlWS);
  return myWebSocketClient;
}
