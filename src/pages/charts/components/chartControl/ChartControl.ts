import { Block }  from "../../../../services/Component";
import template from "./template";

interface ChartControlProps extends Record<string, unknown> {
    count? : number // буду использовать в будущем
}

export default class ChartControl extends Block<ChartControlProps> {
    constructor(props: ChartControlProps) {
      super("div", props);
    }
  
    render(): DocumentFragment {
      // В данном случае render возвращает строкой разметку из шаблонизатора
      return this.compile(template, this.props);
    }
}
