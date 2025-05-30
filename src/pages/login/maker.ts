import Router from "../../router";
import Field from "../../components/field";
import HTTPClient from "../../services/sender";
import Button from "../../components/button";
import Login from "./Login";

export default function CreateLogin(
  navigate: Router,
  httpClient: HTTPClient,
): Login {
  const fieldLogin = new Field({
    className: "className",
    type: "text",
    name: "login",
    placeholderText: "Login",
    required: "required",
  });

  const fieldPassword = new Field({
    className: "className",
    type: "password",
    name: "password",
    placeholderText: "Password",
    required: "required",
  });

  const buttonSubmit = new Button({
    className: "className",
    type: "submit",
    buttonText: "Enter",
    events: {
      click: (event: MouseEvent) => {
        console.log(event);

        // Получаем значения логина и пароля
        const loginValue = (
          document.querySelector('input[name="login"]') as HTMLInputElement
        ).value;
        const passwordValue = (
          document.querySelector('input[name="password"]') as HTMLInputElement
        ).value;

        const userLogin = {
          login: loginValue,
          password: passwordValue,
        };

        httpClient
          .post<string>(
            "/auth/signin",
            userLogin,
            new Headers({ "Content-Type": "application/json" }),
          )
          .then((response) => {
            console.log("Ответ сервера:", response);
            navigate.go("/messenger");
          })
          .catch((error) => {
            if (error.response === '{"reason":"User already in system"}') {
              navigate.go("/messenger");
            }
            console.error("Ошибка:", error);
          });
      },
    },
  });

  const buttonCreateAccount = new Button({
    className: "className",
    type: "button",
    buttonText: "Create Account",
    events: {
      click: (event: MouseEvent) => {
        console.log(event);
        navigate.go("/sign-up");
      },
    },
  });

  const loginPage = new Login({
    title: "Login",
    action: "/login",
    loginField: fieldLogin,
    passwordField: fieldPassword,
    submitButton: buttonSubmit,
    createAccountButton: buttonCreateAccount,
  });

  return loginPage;
}
