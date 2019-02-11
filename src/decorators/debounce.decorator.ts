import {ComponentFactory} from "../helpers/component.factory";
import {debounce} from "../helpers/debounce";
import {AbstractComponent} from "../classes/abstract.component";

/**
 * @description
 * Can be used together with the EventListener Decorator.
 * It enhances it by adding a debounce to the event.
 * Has to be used BEFORE the EventListener Decorator to properly work.
 * @param {number} delay the number of milliseconds that should be debounced
 * @constructor
 */
export function Debounce(delay: number) {
	return function (target: any, propertyKey: string) {
		ComponentFactory.onComponentClassInitialized(function (individualElement: AbstractComponent) {
			target[propertyKey] = debounce(target[propertyKey], delay);
		}, target);
	};
}