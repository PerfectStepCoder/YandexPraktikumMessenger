type Props = Record<string, any>;

/**
 * Компилирует шаблон, заменяя переменные вида {{key}} на значения из props.
 * @param template - Шаблон в виде строки.
 * @param props - Данные для замены в шаблоне.
 * @returns Скомпилированная строка HTML.
 */
export default function compile(template: string, props: Props): string {
  return template.replace(/{{\s*([\w.]+)\s*}}/g, (_, key: string) => {
    const keys = key.split(".");
    let value = props;

    for (const k of keys) {
      if (value[k] !== undefined) {
        value = value[k];
      } else {
        return ""; // Возвращаем пустую строку, если значение отсутствует
      }
    }

    return String(value);
  });
}