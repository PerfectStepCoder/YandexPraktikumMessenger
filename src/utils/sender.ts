class HTTPClient {
    private baseUrl: string;
  
    constructor(baseUrl: string = '') {
      this.baseUrl = baseUrl;
    }
  
    // Основной метод для выполнения запросов
    private request(
      method: string,
      url: string,
      options: { query?: Record<string, any>; body?: any; headers?: Record<string, string> } = {}
    ): Promise<any> {
      const { query, body, headers } = options;
  
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
  
        // Формируем полный URL с query string для GET-запросов
        const queryString = query ? this.buildQueryString(query) : '';
        const fullUrl = this.baseUrl + url + (queryString ? `?${queryString}` : '');
  
        xhr.open(method, fullUrl, true);
  
        // Устанавливаем заголовки
        if (headers) {
          Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value));
        }
  
        // Обработчики события
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              resolve(JSON.parse(xhr.responseText));
            } catch (e) {
              resolve(xhr.responseText);
            }
          } else {
            reject({
              status: xhr.status,
              statusText: xhr.statusText,
              response: xhr.responseText,
            });
          }
        };
  
        xhr.onerror = () => reject({ status: xhr.status, statusText: xhr.statusText });
  
        // Отправка данных
        if (body && method !== 'GET') {
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify(body));
        } else {
          xhr.send();
        }
      });
    }
  
    // Метод для формирования query string
    private buildQueryString(query: Record<string, any>): string {
      return Object.entries(query)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    }
  
    // Метод GET
    public get(url: string, query?: Record<string, any>, headers?: Record<string, string>): Promise<any> {
      return this.request('GET', url, { query, headers });
    }
  
    // Метод POST
    public post(url: string, body?: any, headers?: Record<string, string>): Promise<any> {
      return this.request('POST', url, { body, headers });
    }
  
    // Метод PUT
    public put(url: string, body?: any, headers?: Record<string, string>): Promise<any> {
      return this.request('PUT', url, { body, headers });
    }
  
    // Метод DELETE
    public delete(url: string, body?: any, headers?: Record<string, string>): Promise<any> {
      return this.request('DELETE', url, { body, headers });
    }
  }
