import Block from "../services/Component"; // Импорт базового класса Block, если он используется

export function render(query: string, block: Block): HTMLElement | null {
  
  const root = document.querySelector(query) as HTMLElement | null;

  if (!root) {
    throw new Error(`Элемент с селектором "${query}" не найден.`);
  }

  const content = block.getContent();  // getContent возвращает HTMLElement
  if (!content) {
    throw new Error("Метод getContent вернул недопустимое значение.");
  }

  root.appendChild(content);
  block.dispatchComponentDidMount();

  return root;
}
