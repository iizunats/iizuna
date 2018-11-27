import {ComponentInternal} from "../interfaces/component.interface";
import {HtmlElementUtility} from "./html-element-utility";

export const ComponentRegistry = new class {
	public componentRegister: any = {};

	public registerComponent(selector: string, individualComponent: ComponentInternal) {
		if (typeof this.componentRegister[selector] === 'undefined') {
			this.componentRegister[selector] = [];
		}
		this.componentRegister[selector].push(individualComponent);
	}

	public getComponentsBySelector(selector: string) {
		return this.componentRegister[selector];
	}

	public getComponentsBySelectorAndIdentifier(selector: string, identifier: string) {
		const components = this.getComponentsBySelector(selector);
		return components.filter((element: ComponentInternal) => {
			return HtmlElementUtility.getSelectorValue(selector, element.element) === identifier;
		});
	}
};