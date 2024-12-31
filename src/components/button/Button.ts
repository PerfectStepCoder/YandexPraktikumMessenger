import { Block }  from "../../services/Component";
//import compile from "../../utils/templator";
import template from "./template";

interface ButtonProps extends Record<string, unknown> {
  events? : Record<string, EventListener>
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
