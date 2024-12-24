import { Block, Props}  from "../../services/Component";
//import compile from "../../utils/templator";
import template from "./template";


export default class Field extends Block {
    constructor(props: Props) {
      super("field", props);
    }
  
    render(): DocumentFragment {
      // В данном случае render возвращает строкой разметку из шаблонизатора
      return this.compile(template, this.props);
    }
  }
