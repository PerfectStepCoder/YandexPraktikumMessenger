type Listener<T = any> = (...args: T[]) => void;

class EventBus {
  private listeners: Record<string, Listener[]>;

  constructor() {
    this.listeners = {};
  }

  /**
   * Добавляет слушатель на событие
   * @param event - имя события
   * @param callback - функция, которая будет вызвана при событии
   */
  on<T = any>(event: string, callback: Listener<T>): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  /**
   * Удаляет слушатель с события
   * @param event - имя события
   * @param callback - функция, которую нужно удалить
   */
  off<T = any>(event: string, callback: Listener<T>): void {
    if (!this.listeners[event]) {
      throw new Error(`No events: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  /**
   * Вызывает событие с передачей данных
   * @param event - имя события
   * @param args - аргументы, передаваемые слушателям
   */
  emit<T = any>(event: string, ...args: T[]): void {
    if (!this.listeners[event]) {
      throw new Error(`No events: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}

export default EventBus;