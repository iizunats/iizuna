import {ComponentInterface} from "../interfaces/component.interface";
import {HtmlElementUtility} from "./html-element-utility";

/**
 * @description
 * Any Component that is being created should normaly register itself automatically in this registry.
 * The component can then be retrieved on runtime via selector and identifier.
 */
export const ComponentRegistry = new class {
	/**
	 * @description
	 * The references of all components are gonna registered here
	 * @type {{}}
	 */
	public componentRegister: any = {};

	/**
	 * @description
	 * Register the component in the local componentRegister object
	 * @param {string} selector the selector, configured via Component Decorator
	 * @param {ComponentInterface} individualComponent
	 */
	public registerComponent(selector: string, individualComponent: ComponentInterface) {
		if (typeof this.componentRegister[selector] === 'undefined') {
			this.componentRegister[selector] = [];
		}
		this.componentRegister[selector].push(individualComponent);
	}

	/**
	 * @description
	 * Returns all Component Objects, created for the given selector
	 * @param {string} selector
	 * @return {*}
	 */
	public getComponentsBySelector(selector: string) {
		return this.componentRegister[selector];
	}

	/**
	 * @description
	 * Returns all Component Objects found for the given selector with the given value
	 * @param {string} selector
	 * @param {string} identifier
	 * @return {*}
	 */
	public getComponentsBySelectorAndIdentifier(selector: string, identifier: string) {
		const components = this.getComponentsBySelector(selector);
		return components.filter((element: ComponentInterface) => {
			return HtmlElementUtility.getSelectorValue(selector, element.element) === identifier;
		});
	}
};