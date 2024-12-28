import { Block, Props} from "./Component";

export class FormBlock extends Block {
    
    private formElement: HTMLElement | null = null;
    static template: string = ""

    constructor(props: Props, template: string) {
        FormBlock.template = template
        super("formBlock", props);
    }
  
    render(): DocumentFragment {
      const output = this.compile(FormBlock.template, this.props);
      this.formElement = output.getElementById('mainForm')
      if (this.formElement) {
          this.formElement.addEventListener("submit", this.handleSubmit.bind(this));
      }
      return output
    }

    // Сбор данных из формы
    private getFormData(form: HTMLElement): Record<string, string> {
        const formData: Record<string, string> = {};
        form.querySelectorAll('input').forEach((field) => {
            formData[field.name] = field.value;
        });
        return formData;
    }

    // Обработчик submit события
    private handleSubmit(event: SubmitEvent): void {
        event.preventDefault(); // Останавливаем стандартное поведение отправки формы
        if (event.currentTarget){
            const form = event.currentTarget as HTMLElement
            console.log(this.getFormData(form))
        }
    }
}
