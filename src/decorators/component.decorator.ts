import {ComponentInterface} from "../interfaces/component.interface";

/**
 * @description
 * Is used to pass configuration values to the component class.
 * @param {object} options
 * @constructor
 */
export function Component(options: { selector: string, childrenSelectors?: any, template?: string }) {
	return function <T extends { new(...args: any[]): {} }>(target: T) {
		return class extends target {
			constructor(...args: any[]) {
				super();
				(this as any as ComponentInterface).__options = options;
			}
		};
	};
}