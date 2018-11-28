import {Template} from "../classes/template";

export interface Component {
	element: HTMLElement;
	template?: Template;
}

export interface ComponentInternal extends Component {
	[index: string]: any;

	children?: any;
	__options: any;
}