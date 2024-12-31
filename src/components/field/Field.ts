import { Block }  from "../../services/Component";
import template from "./template";

interface FieldProps extends Record<string, unknown> {
  defaultValue? : string // буду использовать в будущем
}

export default class Field extends Block<FieldProps> {
    constructor(props: FieldProps) {
      super("field", props);
    }
  
    render(): DocumentFragment {
      // В данном случае render возвращает строкой разметку из шаблонизатора
      return this.compile(template, this.props);
    }
  }
