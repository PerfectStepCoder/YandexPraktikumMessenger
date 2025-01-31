import { Block }  from "../../../../services/Component";
import template from "./template";

interface ChartProps extends Record<string, unknown> {
    count? : number // буду использовать в будущем
}

export default class Chart extends Block<ChartProps> {
    constructor(props: ChartProps) {
      super("div", props);
    }
  
    render(): DocumentFragment {
      // В данном случае render возвращает строкой разметку из шаблонизатора
      return this.compile(template, this.props);
    }
}
