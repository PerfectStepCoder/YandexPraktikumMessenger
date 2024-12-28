import { Props } from "../../services/Component";
import { FormBlock } from "../../services/FormBlock";
import template from "./template";
import "./Profile.css"

export default class Profile extends FormBlock {
    
    constructor(props: Props) {
        super(props, template);
    }

    render(): DocumentFragment {
        return super.render();
    }
}
