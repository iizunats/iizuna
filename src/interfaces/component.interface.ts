import {ListenerConfiguration} from "../decorators/event-listener.decorator";
import {Template} from "../classes/template";

export interface Component {
	element: HTMLElement;
	template?: Template;
}

export interface ComponentInternal extends Component {
	[index: string]: any;

	children?: any;
	__eventListeners: ListenerConfiguration[];
	__elementAttributes: any;
	__options: any;
}