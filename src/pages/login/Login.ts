import { Block, Props} from "../../services/Component";
//import compile from "../../utils/templator";
import template from "./template";

export default class Login extends Block {
    constructor(props: Props) {
      super("login", props);
    }
  
    render(): DocumentFragment {
      return this.compile(template, this.props);
    }
}
