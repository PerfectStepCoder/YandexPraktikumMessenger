type QueryParams = Record<string, string>;
type RequestBody = Record<string, unknown> | string | null;

interface RequestOptions {
  query?: QueryParams;
  body?: RequestBody;
  headers?: Headers;
}

interface RequestError {
  status: number;
  statusText: string;
  response: string;
}

class HTTPClient {
  private baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  // Основной метод для выполнения запросов
  private request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { query, body, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Формируем полный URL с query string для GET-запросов
      const queryString = query ? this.buildQueryString(query) : '';
      const fullUrl = this.baseUrl + url + (queryString ? `?${queryString}` : '');

      xhr.withCredentials = true;
      xhr.open(method, fullUrl, true);

      // Устанавливаем заголовки
      if (headers) {
        Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value));
      }

      // Обработчики события
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(JSON.parse(xhr.responseText) as T);
          } catch {
            resolve(xhr.responseText as unknown as T);
          }
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
            response: xhr.responseText,
          } as RequestError);
        }
      };

      xhr.onerror = () => reject({ status: xhr.status, statusText: xhr.statusText, response: '' });

      // Отправка данных
      if (body && method !== 'GET') {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(typeof body === 'string' ? body : JSON.stringify(body));
      } else {
        xhr.send();
      }
    });
  }

  // Метод для формирования query string
  private buildQueryString(query: QueryParams): string {
    return Object.entries(query)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  }

  // Метод GET
  public get<T>(url: string, query?: QueryParams, headers?: Headers): Promise<T> {
    return this.request<T>('GET', url, { query, headers });
  }

  // Метод POST
  public post<T>(url: string, body?: RequestBody, headers?: Headers): Promise<T> {
    return this.request<T>('POST', url, { body, headers });
  }

  // Метод PUT
  public put<T>(url: string, body?: RequestBody, headers?: Headers): Promise<T> {
    return this.request<T>('PUT', url, { body, headers });
  }

  // Метод DELETE
  public delete<T>(url: string, body?: RequestBody, headers?: Headers): Promise<T> {
    return this.request<T>('DELETE', url, { body, headers });
  }
}

export default HTTPClient;
