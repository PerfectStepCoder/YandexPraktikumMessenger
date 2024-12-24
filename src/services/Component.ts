import EventBus from "./EventBus";
import compile from "../utils/templator";
import {v4 as makeUUID } from 'uuid';

// Типизация для событий
type BlockEvents = {
  EVENT_INIT: "init";
  EVENT_FLOW_CDM: "flow:component-did-mount";
  EVENT_FLOW_CDU: "flow:component-did-update";
  EVENT_FLOW_RENDER: "flow:render";
};

export type Props = Record<string, any>;

// Тип для результата функции выделения блоков
interface ChildrenAndProps {
  children: Record<string, Block>;
  props: Props;
}


export class Block {

  // События в компоненте
  static EVENTS: BlockEvents = {
    EVENT_INIT: "init",
    EVENT_FLOW_CDM: "flow:component-did-mount",
    EVENT_FLOW_CDU: "flow:component-did-update",
    EVENT_FLOW_RENDER: "flow:render",
  };

  // Поля компонента
  private _element: HTMLElement | null = null;
  private _meta: { tagName: string; props: Props } | null = null;
  protected props: Props;
  private eventBus: () => EventBus;
  private _setUpdate: boolean = false;
  private _id: string;
  private children: Record<string, Block>;

  constructor(tagName: string = "div", propsAndChildren: Props = {}) {
    
    const eventBus = new EventBus();
    
    const { children, props } = this._getChildren(propsAndChildren);

    this.children = children;

    this._meta = { tagName, props };
    
    this.eventBus = () => eventBus;
    this._id = makeUUID();

    this.props = this._makePropsProxy({ ...props, __id: this._id });

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.EVENT_INIT);

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
    
    // Вызовем событие монтирование компонента в DOM
    if (this.children) {
      Object.values(this.children).forEach(child => {
        child.dispatchComponentDidMount();
      });
    }

  }

  componentDidMount(oldProps?: Props): void {
    // Переопределяется пользователем
  }

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.EVENT_FLOW_CDM);

  }

  private _componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    return this.componentDidUpdate(oldProps, newProps);
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    return true; // Переопределяется пользователем
  }

  setProps(nextProps: Props): void {
    if (!nextProps) return;
    //console.log(nextProps)
    Object.assign(this.props, nextProps);
  }

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render(): void {
    const block = this.render();
    this._removeEvents();
    if (this._element) {
      this._element.innerHTML = ''; // удаляем предыдущее содержимое
      //this._element.innerHTML = block;
      this._element.appendChild(block);
    }
    this._addEvents();
  }

  _addEvents() {
    if (this.props.events) {
      Object.keys(this.props.events).forEach(eventName => {
        if (this._element) {
          this._element.addEventListener(eventName, this.props.events[eventName]);
        }
      });
    }
  }

  _removeEvents() {
    if (this.props.events) {
      Object.keys(this.props.events).forEach(eventName => {
        if (this._element) {
          this._element.removeEventListener(eventName, this.props.events[eventName]);
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

  private _makePropsProxy(props: Props): Props {
    //console.log(props)
    // return new Proxy(props, {
    //   get(target, prop: string) {
    //     if (!(prop in target)) {
    //       throw new Error(`Свойства ${prop} нет в props`);
    //     }
    //     return target[prop];
    //   },
    //   set(target, prop: string, value) {
    //     target[prop] = value;
    //     return true;
    //   },
    //   deleteProperty() {
    //     throw new Error("Нельзя удалить свойство props");
    //   },
    // });

    const self = this;
    return props;
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);
    element.setAttribute('data-id', this._id);
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

  _getChildren(propsAndChildren: Props): ChildrenAndProps {
    const children: Record<string, Block> = {};
    const props: Props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  compile(template: string, props: Props) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    fragment.innerHTML = compile(template, propsAndStubs);

    Object.values(this.children).forEach(child => {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        const rm = child.getContent()
        if (child && stub && rm) {
          stub.replaceWith(rm);
        }
    });

    return fragment.content;

    //return compile(template, propsAndStubs);        
  }
 
}
