import EventBus from "./EventBus";
import compile from "../utils/templator";
import { v4 as uuidv4 } from 'uuid';

// Типизация для событий
type BlockEvents = {
  EVENT_INIT: "init";
  EVENT_FLOW_CDM: "flow:component-did-mount";
  EVENT_FLOW_CDU: "flow:component-did-update";
  EVENT_FLOW_RENDER: "flow:render";
  EVENT_FLOW_UPDATE: "flow:component-update"
};

type Listener<T = any> = (...args: T[]) => void;

// Тип для результата функции выделения блоков
interface ChildrenAndProps<TProps> {
  children: Record<string, Block>;
  props: TProps;
}

export class Block<TProps extends Record<string, unknown> = {}> {
  static EVENTS: BlockEvents = {
    EVENT_INIT: "init",
    EVENT_FLOW_CDM: "flow:component-did-mount",
    EVENT_FLOW_CDU: "flow:component-did-update",
    EVENT_FLOW_RENDER: "flow:render",
    EVENT_FLOW_UPDATE: "flow:component-update"
  };

  private _element: HTMLElement | null = null;
  private _meta: { tagName: string; props: TProps } | null = null;
  protected props: TProps;
  private eventBus: () => EventBus;
  private _id: string;
  private children: Record<string, Block>;

  constructor(tagName: string = "div", propsAndChildren: TProps) {
    const eventBus = new EventBus();

    const { children, props } = this._getChildren(propsAndChildren);

    this.children = children;

    this._meta = { tagName, props };

    this.eventBus = () => eventBus;
    this._id = uuidv4();

    this.props = this._makePropsProxy({ ...props, __id: this._id } as TProps);

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.EVENT_INIT);
  }

  public bindEvent(event: string, callback: Listener) {
    this.eventBus().on(event, callback)
  }

  public emitEvent(event: string) {
    this.eventBus().emit(event);
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.EVENT_INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.EVENT_FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.EVENT_FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.EVENT_FLOW_RENDER, this._render.bind(this));
  }

  private _createResources(): void {
    if (!this._meta) {
      throw new Error("Meta data is not defined.");
    }

    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.EVENT_FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();

    if (this.children) {
      Object.values(this.children).forEach((child) => {
        child.dispatchComponentDidMount();
      });
    }
  }

  componentDidMount(oldProps?: TProps): void {
    // Переопределяется пользователем
    console.log(oldProps)
  }

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.EVENT_FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: TProps, newProps: TProps): boolean {
    return this.componentDidUpdate(oldProps, newProps);
  }

  componentDidUpdate(oldProps: TProps, newProps: TProps): boolean {
    console.log(oldProps)
    console.log(newProps)
    return true; // Переопределяется пользователем
  }

  setProps(nextProps: Partial<TProps>): void {
    if (!nextProps) return;
    Object.assign(this.props, nextProps);
  }

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render(): void {
    const block = this.render();
    this._removeEvents();
    if (this._element) {
      this._element.innerHTML = "";
      this._element.appendChild(block);
    }
    this._addEvents();
  }

  _addEvents(): void {
    const events = this.props.events as Record<string, EventListener>;
    if (events) {
      Object.keys(events).forEach((eventName) => {
        if (this._element) {
          this._element.addEventListener(
            eventName,
            events[eventName]
          );
        }
      });
    }
  }

  _removeEvents(): void {
    const events = this.props.events as Record<string, EventListener>;
    if (events) {
      Object.keys(events).forEach((eventName) => {
        if (this._element) {
          this._element.removeEventListener(
            eventName,
            events[eventName]
          );
        }
      });
    }
  }

  render(): DocumentFragment {
    return new DocumentFragment(); // Переопределяется пользователем
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  private _makePropsProxy(props: TProps): TProps {
    return new Proxy(props, {
      set(target, prop, value) {
        target[prop as keyof TProps] = value;
        return true;
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);
    element.setAttribute("data-id", this._id);
    return element;
  }

  show(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = "block";
    }
  }

  hide(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = "none";
    }
  }

  private _getChildren(
    propsAndChildren: TProps
  ): ChildrenAndProps<TProps> {
    const children: Record<string, Block> = {};
    const props = {} as TProps;

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        (props as any)[key] = value;
      }
    });

    return { children, props };
  }

  compile(template: string, props: TProps): DocumentFragment {

    const propsAndStubs = { ...props } as Record<string, unknown>;

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment = this._createDocumentElement(
      "template"
    ) as HTMLTemplateElement;

    fragment.innerHTML = compile(template, propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(
        `[data-id="${child._id}"]`
      );
      const rm = child.getContent();
      if (child && stub && rm) {
        stub.replaceWith(rm);
      }
    });

    return fragment.content;
  }
}
