import { Block }  from "../../services/Component";
import template from "./template";
import "./Charts.css"

interface ChartsProps extends Record<string, unknown> {
    count? : number // буду использовать в будущем
}

export default class Charts extends Block<ChartsProps> {
    constructor(props: ChartsProps) {
      super("div", props);
    }
  
    render(): DocumentFragment {
      // В данном случае render возвращает строкой разметку из шаблонизатора
      return this.compile(template, this.props);
    }
}
