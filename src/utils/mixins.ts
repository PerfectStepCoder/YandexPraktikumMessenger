// Примесь: добавляет методы для получения данных из формы
type Constructor<T = {}> = new (...args: any[]) => T;

function GetterFormData<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    log(message: string): void {
      console.log(`[Log]: ${message}`);
    }
  };
}