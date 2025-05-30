import Router from "../../router";
import HTTPClient from "../../services/sender";
import Button from "../../components/button";
import Register from "./Register";
import FieldLabel from "../../components/fieldLabel";

export default function CreateRegister(
  navigate: Router,
  httpClient: HTTPClient,
): Register {
  const firstName = new FieldLabel({
    className: "form-group",
    type: "text",
    labelFor: "first_name",
    labelText: "First Name:",
    labelID: "first_name",
    name: "first_name",
    placeholderText: "Enter your first name",
    required: "required",
  });

  const secondName = new FieldLabel({
    className: "form-group",
    type: "text",
    labelFor: "second_name",
    labelText: "Second Name:",
    labelID: "second_name",
    name: "second_name",
    placeholderText: "Enter your second name",
    required: "required",
  });

  const displayName = new FieldLabel({
    className: "form-group",
    type: "text",
    labelFor: "display_name",
    labelText: "Display Name:",
    labelID: "display_name",
    name: "display_name",
    placeholderText: "Enter your display name",
    required: "required",
  });

  const login = new FieldLabel({
    className: "form-group",
    type: "text",
    labelFor: "login",
    labelText: "Login:",
    labelID: "login",
    name: "login",
    placeholderText: "Enter your login",
    required: "required",
  });

  const password = new FieldLabel({
    className: "form-group",
    type: "password",
    labelFor: "password",
    labelText: "Password:",
    labelID: "password",
    name: "password",
    placeholderText: "Enter your password",
    required: "required",
  });

  const email = new FieldLabel({
    className: "form-group",
    type: "email",
    labelFor: "email",
    labelText: "Email:",
    labelID: "email",
    name: "email",
    placeholderText: "Enter your email",
    required: "required",
  });

  const phone = new FieldLabel({
    className: "form-group",
    type: "text",
    labelFor: "phone",
    labelText: "Phone:",
    labelID: "phone",
    name: "phone",
    placeholderText: "Enter your phone",
    required: "required",
  });

  const phoneTwo = new FieldLabel({
    className: "form-group",
    type: "text",
    labelFor: "phone",
    labelText: "Phone:",
    labelID: "phone",
    name: "phone",
    placeholderText: "Enter your phone",
    required: "required",
  });

  const buttonSubmit = new Button({
    className: "buttons",
    type: "submit",
    buttonText: "Enter",
    events: {
      click: (event: MouseEvent) => {
        console.log(event);

        // Получаем значения логина и пароля
        const firstName = (
          document.querySelector('input[name="first_name"]') as HTMLInputElement
        ).value;
        const secondName = (
          document.querySelector(
            'input[name="second_name"]',
          ) as HTMLInputElement
        ).value;
        //const displayName = (document.querySelector('input[name="display_name"]') as HTMLInputElement).value;
        const login = (
          document.querySelector('input[name="login"]') as HTMLInputElement
        ).value;
        const password = (
          document.querySelector('input[name="password"]') as HTMLInputElement
        ).value;
        const email = (
          document.querySelector('input[name="email"]') as HTMLInputElement
        ).value;
        const phone = (
          document.querySelector('input[name="phone"]') as HTMLInputElement
        ).value;

        const body = {
          first_name: firstName,
          second_name: secondName,
          login: login,
          email: email,
          password: password,
          phone: phone,
        };

        httpClient
          .post<string>("/auth/signup", body)
          .then((response) => {
            console.log("Ответ сервера:", response);
            navigate.go("/messenger");
          })
          .catch((error) => {
            console.error("Ошибка:", error);
          });
      },
    },
  });

  const profilePage = new Register({
    title: "Register",
    action: "/register",
    firstName: firstName,
    secondName: secondName,
    displayName: displayName,
    login: login,
    password: password,
    email: email,
    phone: phone,
    phoneTwo: phoneTwo,
    saveButton: buttonSubmit,
  });

  return profilePage;
}
