import { Block, Props}  from "../../services/Component";
import template from "./template";
import "./Error.css"

export default class ErrorMsg extends Block {
    constructor(props: Props) {
      super("error", props);
    }
  
    render(): DocumentFragment {
      // В данном случае render возвращает строкой разметку из шаблонизатора
      return this.compile(template, this.props);
    }
}