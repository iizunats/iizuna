import {ComponentFactory} from "../helpers/component.factory";
import {AbstractComponent} from "../classes/abstract.component";

/**
 * @description
 * Makes it possible to easily register event listeners to the window
 * @param {string} type The event type. the name of the method is used as fallback if not set
 * @constructor
 * @todo/fixme: remove redundant code!
 */
export function WindowEventListener(type: string = null) {
	return function (target: any, propertyKey: string) {
		ComponentFactory.onComponentClassInitialized(function (object: AbstractComponent) {
			if (typeof type === 'string') {
				const events = type.split(' ');
				for (let i = 0; i < events.length; i++) {
					applyEvent(window, events[i]);
				}
			} else {
				applyEvent(window);
			}

			/**
			 * @description
			 * Creates a new function that contains the property call with applied scope of the event function
			 * @param {Window} window
			 * @param {string} type
			 */
			function applyEvent(window: Window, type: string | null = null) {
				let listener = function (event: Event) {
					target[propertyKey].apply(object, [this, event]);
				};

				window.addEventListener(type === null ? propertyKey : type, listener);
			}
		}, target);
	};
}