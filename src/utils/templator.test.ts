import { expect } from "chai";
import compile from "./templator"; // Убедитесь, что путь указан корректно

describe("Sample test", () => {
  it("should pass", () => {
    expect(1 + 1).to.equal(2);
  });
});

describe("compile()", () => {
  it("должен заменять простые переменные", () => {
    const template = "Привет, {{ name }}!";
    const props = { name: "Мир" };
    const result = compile(template, props);
    expect(result).to.equal("Привет, Мир!");
  });

  it("должен заменять несколько переменных", () => {
    const template = "{{greeting}}, {{name}}!";
    const props = { greeting: "Здравствуйте", name: "Анна" };
    const result = compile(template, props);
    expect(result).to.equal("Здравствуйте, Анна!");
  });

  it("должен возвращать пустую строку для неизвестных переменных", () => {
    const template = "Привет, {{unknown}}!";
    const props = {};
    const result = compile(template, props);
    expect(result).to.equal("Привет, !");
  });

  it("должен поддерживать вложенные ключи", () => {
    const template = "Город: {{user.address.city}}";
    const props = { user: { address: { city: "Москва" } } };
    const result = compile(template, props);
    expect(result).to.equal("Город: Москва");
  });

  it("должен заменять переменные со странными пробелами", () => {
    const template = "Имя: {{   user.name   }}";
    const props = { user: { name: "Игорь" } };
    const result = compile(template, props);
    expect(result).to.equal("Имя: Игорь");
  });

  it("должен конвертировать значения в строки", () => {
    const template = "Возраст: {{age}}";
    const props = { age: 30 };
    const result = compile(template, props);
    expect(result).to.equal("Возраст: 30");
  });

  it("должен игнорировать переменные, значение которых undefined", () => {
    const template = "Имя: {{name}}, Город: {{city}}";
    const props = { name: "Аня" }; // city отсутствует
    const result = compile(template, props);
    expect(result).to.equal("Имя: Аня, Город: ");
  });

  it("должен корректно обрабатывать шаблон без переменных", () => {
    const template = "Просто текст без переменных.";
    const result = compile(template, {});
    expect(result).to.equal("Просто текст без переменных.");
  });

  it("должен возвращать пустую строку для несуществующих вложенных ключей", () => {
    const template = "{{user.profile.age}}";
    const props = { user: {} };
    const result = compile(template, props);
    expect(result).to.equal("");
  });
});
