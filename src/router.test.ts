// route.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Route } from "./router"; // убедись, что Route экспортируется

class MockBlock {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement("div");
    this.element.textContent = "Mock Content";
  }

  getContent() {
    return this.element;
  }

  dispatchComponentDidMount() {
    // можно добавить mock-функцию, если надо
  }

  show() {
    this.element.style.display = "block";
  }

  hide = vi.fn();
}

describe("Route", () => {
  beforeEach(() => {
    document.body.innerHTML = `<div class="app"></div>`; // создаём контейнер
  });

  it("render() добавляет контент в DOM", () => {
    const mockBlock = new MockBlock();
    const route = new Route("/test", () => mockBlock, { rootQuery: ".app" });

    route.render();

    const root = document.querySelector(".app")!;
    expect(root.textContent).toBe("Mock Content");
  });
});
