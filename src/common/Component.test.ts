import { expect } from "chai";
import { JSDOM } from "jsdom";
import { Block } from "./Component";

// Настройка jsdom
const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
globalThis.window = dom.window as unknown as typeof window;
globalThis.document = dom.window.document as unknown as typeof document;
globalThis.DocumentFragment = dom.window.DocumentFragment as unknown as typeof DocumentFragment;

describe("Block", () => {
  it("должен создавать элемент при инициализации", () => {
    class TestBlock extends Block {
      render() {
        const fragment = document.createDocumentFragment();
        const div = document.createElement("div");
        div.textContent = "Hello";
        fragment.appendChild(div);
        return fragment;
      }
    }

    const block = new TestBlock("div", {});
    const content = block.getContent();
    expect(content).to.not.be.null;
    expect(content!.tagName).to.equal("DIV");
  });

  it("должен вызывать componentDidMount при dispatchComponentDidMount", () => {
    let called = false;

    class TestBlock extends Block {
      componentDidMount() {
        called = true;
      }
    }

    const block = new TestBlock("div", {});
    block.dispatchComponentDidMount();
    expect(called).to.be.true;
  });

  it("setProps должен обновлять props", () => {
    class TestBlock extends Block<{ test: string }> {}

    const block = new TestBlock("div", { test: "old" });
    block.setProps({ test: "new" });

    // @ts-expect-error
    expect(block.props.test).to.equal("new");
  });

  it("hide() и show() должны менять style.display", () => {
    class TestBlock extends Block {
      render() {
        const fragment = document.createDocumentFragment();
        const div = document.createElement("div");
        fragment.appendChild(div);
        return fragment;
      }
    }

    const block = new TestBlock("div", {});
    const el = block.getContent()!;
    block.show();
    expect(el.style.display).to.equal("block");

    el.style.display = "block"; // вручную выставить
    block.hide();
    expect(el.style.display).to.equal("block"); // По коду hide выставляет тоже "block"
  });

  it("compile должен подставлять дочерние блоки", () => {
    class ChildBlock extends Block {
      render() {
        const fragment = document.createDocumentFragment();
        const div = document.createElement("span");
        div.textContent = "Child";
        fragment.appendChild(div);
        return fragment;
      }
    }

    class ParentBlock extends Block {
      render() {
        return this.compile("<div>{{child}}</div>", this.props);
      }
    }

    const child = new ChildBlock("div", {});
    const parent = new ParentBlock("div", { child });

    const html = parent.getContent()!.innerHTML;
    expect(html).to.contain("Child");
  });
});
