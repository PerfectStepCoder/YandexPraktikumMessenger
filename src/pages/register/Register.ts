import { Props } from "../../services/Component";
import { FormBlock } from "../../services/FormBlock";
import { validationRules, ValidationRules } from "../../utils/validation"
import template from "./template";
import "./Register.css"


export default class Register extends FormBlock {

    static mainForm: HTMLElement

    constructor(props: Props) {
      super(props, template);
    }
  
    render(): DocumentFragment {
      const output = super.render()
      Register.mainForm = output.getElementById('mainForm') as HTMLElement
      this.addBlurListeners();
      Register.mainForm.addEventListener("submit", this.handleSubmitForm.bind(this));
      return output
    }

    // Добавляем обработчики событий blur на все поля
    private addBlurListeners(): void {
      const inputs = Register.mainForm.querySelectorAll("input");

      inputs.forEach((input) => {
        const name = input.name;
        if (validationRules[name]) {
          input.addEventListener("blur", () => this.validateField(input));
        }
      });
    }

    // Проверяем отдельное поле
    private validateField(field: HTMLInputElement | HTMLTextAreaElement): boolean {
      const name = field.name;
      const value = field.value.trim();
      const rule = validationRules[name];

      if (rule && !rule.regex.test(value)) {
        this.showError(field, rule.errorMessage);
        return false;
      }

      this.clearError(field);
      return true;
    }

    // Показываем ошибку
    private showError(field: HTMLInputElement | HTMLTextAreaElement, message: string): void {
      let errorElement = field.nextElementSibling;
      if (!errorElement || !errorElement.classList.contains("error-message")) {
        errorElement = document.createElement("div");
        errorElement.className = "error-message";
        field.insertAdjacentElement("afterend", errorElement);
      }
      errorElement.textContent = message;
      field.classList.add("error");
    }

    // Убираем ошибку
    private clearError(field: HTMLInputElement | HTMLTextAreaElement): void {
      const errorElement = field.nextElementSibling;
      if (errorElement && errorElement.classList.contains("error-message")) {
        errorElement.remove();
      }
      field.classList.remove("error");
    }

    // Проверяем всю форму
    private validateForm(): boolean {
      const inputs = Register.mainForm.querySelectorAll("input");
      let isValid = true;

      inputs.forEach((input) => {
        if (!this.validateField(input)) {
          isValid = false;
        }
      });

      return isValid;
    }

    // Обработка отправки формы
    private handleSubmitForm(event: SubmitEvent): void {
      event.preventDefault();

      if (this.validateForm()) {
        console.log("Форма успешно отправлена");
        // const formData = new FormData(Register.mainForm);
        // const data: Record<string, string> = {};

        // formData.forEach((value, key) => {
        //   data[key] = value.toString();
        // });

        //console.log("Form Data:", data);
      } else {
        console.log("Форма содержит ошибки.");
      }
    }
}
