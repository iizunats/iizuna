import {ComponentInterface} from "../interfaces/component.interface";
import {ComponentFactory} from "../helpers/component.factory";

/**
 * @description
 * Makes it possible to easily register global event listeners (listener is attached to document)
 * @param {string} type The event type. the name of the method is used as fallback if not set
 * @constructor
 */
export function GlobalEventListener(type: string = null) {
	return function (target: any, propertyKey: string) {
		ComponentFactory.onComponentClassInitialized(function (object: ComponentInterface) {
			let listener = function (event: Event) {
				target[propertyKey].apply(object, [this, event]);
			};

			document.addEventListener(type === null ? propertyKey : type, listener);
		}, target);
	};
}