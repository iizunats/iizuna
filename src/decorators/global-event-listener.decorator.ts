import {ComponentFactory} from "../helpers/component.factory";
import {AbstractComponent} from "../classes/abstract.component";

/**
 * @description
 * Makes it possible to easily register global event listeners (listener is attached to document)
 * @param {string} type The event type. the name of the method is used as fallback if not set
 * @constructor
 */
export function GlobalEventListener(type: string = null) {
	return function (target: any, propertyKey: string) {
		ComponentFactory.onComponentClassInitialized(function (object: AbstractComponent) {
			if (typeof type === 'string') {
				const events = type.split(' ');
				for (let i = 0; i < events.length; i++) {
					applyEvent(document, events[i]);
				}
			} else {
				applyEvent(document);
			}

			/**
			 * @description
			 * Creates a new function that contains the property call with applied scope of the event function
			 * @param {Element} document
			 * @param {string} type
			 */
			function applyEvent(document: Document, type: string | null = null) {
				let listener = function (event: Event) {
					target[propertyKey].apply(object, [this, event]);
				};

				document.addEventListener(type === null ? propertyKey : type, listener);
			}
		}, target);
	};
}