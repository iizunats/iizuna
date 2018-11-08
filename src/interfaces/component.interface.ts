import {ListenerConfiguration} from "../decorators/event-listener.decorator";

export interface Component {
    element: HTMLElement;
}

export interface ComponentInternal extends Component {
    [index: string]: any;

    children?: any;
    __eventListeners: ListenerConfiguration[];
    __elementAttributes: any;
}