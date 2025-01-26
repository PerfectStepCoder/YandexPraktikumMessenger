import { Block }  from "../../../../services/Component";
import template from "./template";

interface ChartListProps extends Record<string, unknown> {
    count? : number // буду использовать в будущем
}

export default class ChartList extends Block<ChartListProps> {
    constructor(props: ChartListProps) {
      super("div", props);
    }
  
    render(): DocumentFragment {
      // В данном случае render возвращает строкой разметку из шаблонизатора
      return this.compile(template, this.props);
    }
}
