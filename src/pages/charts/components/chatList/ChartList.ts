import { Block, Props}  from "../../../../services/Component";
import template from "./template";


export default class ChartList extends Block {
    constructor(props: Props) {
      super("div", props);
    }
  
    render(): DocumentFragment {
      // В данном случае render возвращает строкой разметку из шаблонизатора
      return this.compile(template, this.props);
    }
}
