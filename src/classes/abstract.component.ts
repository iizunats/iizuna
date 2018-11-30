import {Template} from "./template";
import {HtmlElementUtility} from "../helpers/html-element-utility";

/**
 * @description
 * Basically any Component that is created via the Component-Decorator implements this Interface implicit via Type casting
 */
export abstract class AbstractComponent {
	[index: string]: any;

	/**
	 * @description
	 * Contains the value of the component selector of the element.
	 */
	private _identifier: string;

	get identifier(): string {
		return HtmlElementUtility.getSelectorValue(this.selector, this.element);
	}

	/**
	 * @description
	 * The Element that was found in the DOM on DomReady for the given selector
	 */
	element: Element;
	/**
	 * @description
	 * This property will be filled automatically if the class was decorated by the Component Decorator.
	 * It contains the passed selector string.
	 */
	selector: string;
	/**
	 * @description
	 * The HTML of the Template that is found if the Component Decorator was correctly configured.
	 * @see Component
	 */
	template: Template;
	/**
	 * @description
	 * The Elements that are found by the childSelectors configured by the Component Decorator
	 */
	children: any;
	/**
	 * @description
	 * The complete Configuration passed to the Component Decorator.
	 * Two underscores, because its not meant to be used outside of the framework
	 */
	__options: any;
	/**
	 * @description
	 * A property that contains all listeners for component class initialization.
	 * Two underscores, because its not meant to be used outside of the framework
	 */
	// __componentClassInitializedListeners: ((componentObject: AbstractComponent) => void)[] = [];
}