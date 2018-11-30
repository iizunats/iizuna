import {Template} from "../classes/template";

/**
 * @description
 * Basically any Component that is created via the Component-Decorator implements this Interface implicit via Type casting
 */
export interface ComponentInterface {
	[index: string]: any;

	/**
	 * @description
	 * The Element that was found in the DOM on DomReady for the given selector
	 */
	element: HTMLElement;

	/**
	 * @description
	 * This property will be filled automatically if the class was decorated by the Component Decorator.
	 * It contains the passed selector string.
	 */
	selector?: string;
	/**
	 * @description
	 * The HTML of the Template that is found if the Component Decorator was correctly configured.
	 * @see Component
	 */
	template?: Template;
	/**
	 * @description
	 * The Elements that are found by the childSelectors configured by the Component Decorator
	 */
	children?: any;
	/**
	 * @description
	 * The complete Configuration passed to the Component Decorator.
	 * Two underscores, because its not meant to be used outside of the framework
	 */
	__options?: any;
}

/**
 * @deprecated
 * Don't use this class anymore. It will be removed in the next major update.
 * Use the "ComponentInterface" instead.
 */
export interface Component extends ComponentInterface {
}

/**
 * @deprecated
 * Don't use this class anymore. It will be removed in the next major update
 * Use the "ComponentInterface" instead.
 */
export interface ComponentInternal extends ComponentInterface {
}