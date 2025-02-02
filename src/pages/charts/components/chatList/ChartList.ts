import { Block }  from "../../../../services/Component";
import template from "./template";
import HTTPClient from '../../../../utils/sender'
import { clearMessage } from "../../../../utils/chartHelpers";
//import { MyWebSocketClient } from "../../../../utils/webSocket";

interface ChartListProps extends Record<string, unknown> {
    count? : number // буду использовать в будущем
}

interface ChartFromBack {
  id: number,
  title: string,
}

export async function fetchChats(httpClient: HTTPClient) {
  try {
      const response = await httpClient.get<ChartFromBack[]>("https://ya-praktikum.tech/api/v2/chats?offset=0&limit=100");
      console.log('Ответ сервера charts:', response);

      const chartsHTML = response.map( (chat: ChartFromBack) => `<li data-id="${chat.id}">${chat.title}</li>`).join('');
      console.log("chartsHTML", chartsHTML);

      return chartsHTML; // Возвращаем сгенерированный HTML
  } catch (error) {
      console.error('Ошибка charts:', error);
      throw error; // Пробрасываем ошибку
  }
}

export async function fetchMessagesChart(httpClient: HTTPClient, chartId: number) {
  try {
      const response = await httpClient.get<ChartFromBack[]>("https://ya-praktikum.tech/api/v2/chats?offset=0&limit=100");
      console.log('Ответ сервера charts:', response, chartId);

      const chartsHTML = response.map( (chat: ChartFromBack) => `<li data-id="${chat.id}">${chat.title}</li>`).join('');
      console.log("chartsHTML", chartsHTML);

      return chartsHTML; // Возвращаем сгенерированный HTML
  } catch (error) {
      console.error('Ошибка charts:', error);
      throw error; // Пробрасываем ошибку
  }
}

export function addEventChartListeners() {
  const listItems = document.querySelectorAll('.chat-list li');
  console.log('addEventListeners', listItems);
  
  listItems.forEach(li => {
      li.addEventListener('click', () => {
        console.log('Click chart!');
          // Убираем класс `active` у всех элементов
          listItems.forEach(item => item.classList.remove('active'));
          // Добавляем класс `active` к текущему элементу
          li.classList.add('active');
          console.log(`Selected chat ID: ${li.getAttribute('data-id')}`);
          clearMessage();
      });
  });
}

export default class ChartList extends Block<ChartListProps> {
    private httpClient: HTTPClient;

    constructor(props: ChartListProps, httpClient: HTTPClient) {
      super("div", props);
      this.httpClient = httpClient;
      //this.myWebSocketClient = myWebSocketClient;
      this.bindEvent(Block.EVENTS.EVENT_FLOW_CDM, this.initCharts.bind(this));
      this.bindEvent(Block.EVENTS.EVENT_FLOW_UPDATE, this.addEventListeners.bind(this));
    }
  
    render(): DocumentFragment {
      // В данном случае render возвращает строкой разметку из шаблонизатора
      return this.compile(template, this.props);
    }

    // Метод для добавления обработчиков событий
    addEventListeners() {
      addEventChartListeners();
    }

    initCharts() {
      fetchChats(this.httpClient)
      .then(chartsHTML => {
          // Вставляем HTML в DOM
          (document.querySelector('.chat-list ul') as HTMLInputElement).innerHTML = chartsHTML
      })
      .catch(error => {
          console.error('Ошибка при загрузке чатов:', error);
      }).finally( () => {
        this.emitEvent(Block.EVENTS.EVENT_FLOW_UPDATE);
      });
    }
}
