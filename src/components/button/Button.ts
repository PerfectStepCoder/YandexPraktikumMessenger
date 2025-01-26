import { Block }  from "../../services/Component";
import template from "./template";

type Listener<T = any> = (...args: T[]) => void;

interface ButtonProps extends Record<string, unknown> {
  events? : Record<string, Listener>
}

export default class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
      super("button", props);
    }
  
    render(): DocumentFragment {
      // В данном случае render возвращает строкой разметку из шаблонизатора
      return this.compile(template, this.props);
    }
}
