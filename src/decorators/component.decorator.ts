import {ComponentInternal} from "../interfaces/component.interface";

export function Component(options: { selector: string, childrenSelectors?: any, template?: string }) {
	return function <T extends { new(...args: any[]): {} }>(target: T) {
		return class extends target {
			constructor(...args: any[]) {
				super();
				(this as any as ComponentInternal).__options = options;
			}
		};
	};
}