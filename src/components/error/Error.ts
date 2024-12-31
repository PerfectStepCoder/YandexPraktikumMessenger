import { Block }  from "../../services/Component";
import template from "./template";
import "./Error.css"

interface ErrorProps extends Record<string, unknown> {
    errorCode?: number // в будущем буду использовать это свойство
}

export default class ErrorMsg extends Block<ErrorProps> {
    constructor(props: ErrorProps) {
      super("error", props);
    }
  
    render(): DocumentFragment {
      // В данном случае render возвращает строкой разметку из шаблонизатора
      return this.compile(template, this.props);
    }
}
