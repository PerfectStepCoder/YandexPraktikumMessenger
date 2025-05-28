import { Block }  from "../../../../common/Component";
import template from "./template";

interface AddUserInChartProps extends Record<string, unknown> {
    count? : number // буду использовать в будущем
}

export default class AddUserInChart extends Block<AddUserInChartProps> {
    constructor(props: AddUserInChartProps) {
      super("div", props);
    }
  
    render(): DocumentFragment {
      // В данном случае render возвращает строкой разметку из шаблонизатора
      return this.compile(template, this.props);
    }
}
