import { Block } from "../../common/Component";
import template from "./template";

export interface LayoutMainProps extends Record<string, unknown> {
  mainContent: Block;
}

export default class LayoutMain extends Block<LayoutMainProps> {
  constructor(props: LayoutMainProps) {
    super("layout", props);
  }

  render(): DocumentFragment {
    // В данном случае render возвращает строкой разметку из шаблонизатора
    this.show();
    return this.compile(template, this.props);
  }
}
