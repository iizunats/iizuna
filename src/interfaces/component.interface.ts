import {Template} from "../classes/template";

export interface ComponentInterface {
	[index: string]: any;

	element: HTMLElement;
	template?: Template;
	children?: any;
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