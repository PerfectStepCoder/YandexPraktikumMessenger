import { Block }  from "../../../../services/Component";
import template from "./template";

interface ChartMessagesProps extends Record<string, unknown> {
    count? : number // буду использовать в будущем
}

export default class ChartMessages extends Block<ChartMessagesProps> {
    constructor(props: ChartMessagesProps) {
      super("div", props);
    }
  
    render(): DocumentFragment {
      // В данном случае render возвращает строкой разметку из шаблонизатора
      return this.compile(template, this.props);
    }
}
