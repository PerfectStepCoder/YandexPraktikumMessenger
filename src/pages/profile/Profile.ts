import { FormBlock, FormProps } from "../../services/FormBlock";
import template from "./template";
import "./Profile.css"


export default class Profile extends FormBlock {
    
    constructor(props: FormProps) {
        super(props, template);
    }

    render(): DocumentFragment {
        return super.render();
    }
}
