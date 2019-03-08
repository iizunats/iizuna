import {ComponentFactory} from "../helpers/component.factory";
import {AbstractComponent} from "../classes/abstract.component";
import {EventHelper} from "../helpers/event-helper";

/**
 * @description
 * Makes it possible to easily register event listeners to the window
 * @param {string} type The event type. the name of the method is used as fallback if not set
 * @constructor
 */
export function WindowEventListener(type: string = null) {
	return function (target: any, propertyKey: string) {
		ComponentFactory.onComponentClassInitialized(function (object: AbstractComponent) {
			EventHelper.attachDecoratorListeners(type, window, target, object, propertyKey);
		}, target);
	};
}