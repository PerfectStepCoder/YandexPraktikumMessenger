import HTTPClient from './sender'

export function getActiveListItemId(): number | null {
    // Находим активный элемент
    const activeElement = document.querySelector('ul li.active');

    // Если активный элемент найден, извлекаем его data-id
    if (activeElement) {
        const id = activeElement.getAttribute('data-id');
        return id ? parseInt(id, 10) : null; // Преобразуем строку в число
    }

    // Если активный элемент не найден, возвращаем null
    return null;
}

interface ResponseToken{
    token: string
}

export async function fetchChartToken(httpClient: HTTPClient, chartID: number) {
    try {
        const response = await httpClient.post<ResponseToken>(`https://ya-praktikum.tech/api/v2/chats/token/${chartID}`);
        console.log('Ответ сервера token:', response);
        return response.token; // Возвращаем token
    } catch (error) {
        console.error('Ошибка token:', error);
        throw error; // Пробрасываем ошибку
    }
  }

export async function getChartToken(httpClient: HTTPClient, chartID: number) { //: string | null
    try {
        const token = await fetchChartToken(httpClient, chartID);
        return token; // Возвращаем token
    } catch (error) {
        console.error('Ошибка при загрузке token:', error);
        return null; // Возвращаем null в случае ошибки
    }
}

export function addMessage(text: string, isAuthor: boolean = false): void {
    // Находим контейнер для сообщений
    const chatMessages = document.querySelector('.chat-messages');

    if (!chatMessages) {
        console.error('Chat messages container not found!');
        return;
    }

    // Создаем новый элемент сообщения
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    // Если сообщение от автора, добавляем класс `author`
    if (isAuthor) {
        messageElement.classList.add('author');
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
    const chatMessages = document.querySelector('.chat-messages');
    
    if (chatMessages) {
        chatMessages.innerHTML = '';
    }
}
