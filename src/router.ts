import { render } from "./utils/renderDOM";


class Route {
    private _pathname: string;
    private _block: any; 
    //private _blockClass: any; 
    private _props: { rootQuery: string };

    constructor(pathname: string, block: any, props: { rootQuery: string }) {
        this._pathname = pathname;
        //this._blockClass = block;
        this._block = block;
        this._props = props;
    }

    match(pathname: string): boolean {
        return pathname === this._pathname;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
          this._pathname = pathname;
          this.render();
        }
    }

    render(): void {
        if (this._block) {
            //this._block = new this._blockClass();
            console.log(`Rendering route: ${this._pathname}`);
            render(this._props.rootQuery, this._block);
            return;
        }
        this._block.show();
    }

    leave(): void  {
        console.log(`Leaving route: ${this._pathname}`);
        if (this._block) {
          this._block.hide();
        }
    }


}

class Router {
    private static __instance: Router;
    private routes: Route[] = [];
    private history: History = window.history;
    private _currentRoute: Route | null = null;
    private _rootQuery: string = '.app';

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: any): this {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes.push(route);
        return this;
    }

    start(): void {
        
        window.onpopstate = (event: PopStateEvent) => {
            this._onRoute(window.location.pathname);
            console.log(event);
        };

        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string): void {
        console.log(`Change Location: ${pathname}`);

        const route = this.getRoute(pathname);

        if (!route) {
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string): void {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string): Route | undefined {
        return this.routes.find(route => route.match(pathname));
    }
}

export default Router;
