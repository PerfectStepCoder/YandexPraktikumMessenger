import { Block, Props} from "../../services/Component";
import template from "./template";
import "./Login.css"

export default class Login extends Block {
    constructor(props: Props) {
      super("login", props);
    }
  
    render(): DocumentFragment {
      return this.compile(template, this.props);
    }
}
