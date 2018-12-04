import {AbstractComponent} from "../classes/abstract.component";

/**
 * @description
 * Is used to pass configuration values to the component class.
 * @param {object} options
 * @internal
 */
export function Component(options: { selector: string, childrenSelectors?: any, template?: string }) {
	return function <T extends { new(...args: any[]): {} }>(target: T) {
		return class extends target {
			constructor(...args: any[]) {
				super();
				(this as any as AbstractComponent).__options = options;
			}
		};
	};
}