import { Block }  from "../../services/Component";
import template from "./template";

interface FieldLabelProps extends Record<string, unknown> {
  defaultValue? : string // буду использовать в будущем
}

export default class FieldLabel extends Block<FieldLabelProps> {
    constructor(props: FieldLabelProps) {
      super("field", props);
    }
  
    render(): DocumentFragment {
      // В данном случае render возвращает строкой разметку из шаблонизатора
      return this.compile(template, this.props);
    }
  }
