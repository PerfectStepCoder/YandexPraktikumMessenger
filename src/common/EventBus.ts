// Определяем тип для словаря событий, где ключ — имя события, а значение — тип аргументов
type EventMap = Record<string, any>; // Базовый тип, который можно расширить

// Тип для обработчика событий, зависящий от типа аргументов события
type Listener<T> = (...args: T[]) => void;

class EventBus<TEventMap extends EventMap = Record<string, any>> {
  private listeners: Record<keyof TEventMap, Listener<TEventMap[keyof TEventMap]>[]>;

  constructor() {
    this.listeners = {} as Record<keyof TEventMap, Listener<TEventMap[keyof TEventMap]>[]>;
  }

  /**
   * Добавляет слушатель на событие
   * @param event - имя события
   * @param callback - функция, которая будет вызвана при событии
   */
  on<TEvent extends keyof TEventMap>(event: TEvent, callback: Listener<TEventMap[TEvent]>): void {
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
  off<TEvent extends keyof TEventMap>(event: TEvent, callback: Listener<TEventMap[TEvent]>): void {
    if (!this.listeners[event]) {
      throw new Error(`No events: ${String(event)}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  /**
   * Вызывает событие с передачей данных
   * @param event - имя события
   * @param args - аргументы, передаваемые слушателям
   */
  emit<TEvent extends keyof TEventMap>(event: TEvent, ...args: TEventMap[TEvent][]): void {
    if (!this.listeners[event]) {
      throw new Error(`No events: ${String(event)}`);
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}

export default EventBus;
