import { Block } from "../../services/Component";
import template from "./template";
import "./Login.css"
//import { validationRules } from "../../utils/validation"

interface LoginProps extends Record<string, unknown> {
  auth?: string // буду использовать в будущем
}

export default class Login extends Block<LoginProps> {

    static mainForm: HTMLElement

    constructor(props: LoginProps) {
      super("login", props);
    }
  
    render(): DocumentFragment {
      const output = this.compile(template, this.props);
      Login.mainForm = output.getElementById('mainForm') as HTMLElement
      Login.mainForm.addEventListener("submit", this.handleSubmitForm.bind(this));
      return output
    }

    // Обработка отправки формы
    private handleSubmitForm(event: SubmitEvent): void {
      event.preventDefault();
      // if (this.validateForm()) {
      //   console.log("Форма успешно отправлена");
      // } else {
      //   console.log("Форма содержит ошибки.");
      // }
    }

    // Проверяем всю форму
    // private validateForm(): boolean {
    //   const inputs = Login.mainForm.querySelectorAll("input");
    //   let isValid = true;

    //   inputs.forEach((input) => {
    //     if (!this.validateField(input)) {
    //       isValid = false;
    //     }
    //   });

    //   return isValid;
    // }

    // Проверяем отдельное поле
    // private validateField(field: HTMLInputElement | HTMLTextAreaElement): boolean {
    //   const name = field.name;
    //   const value = field.value.trim();
    //   const rule = validationRules[name];

    //   if (rule && !rule.regex.test(value)) {
    //     return false;
    //   }
    //   return true;
    // }
}
