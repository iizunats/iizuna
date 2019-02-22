import {ComponentFactory} from "../helpers/component.factory";
import {AbstractComponent} from "../classes/abstract.component";

/**
 * @description
 * Makes it possible to easily register event listeners for the component element (or event child elements)
 * @param {string} type The event type. the name of the method is used as fallback if not set
 * @param {string} childSelector Optionally the possibility to attach listeners to child elements
 * @constructor
 */
export function EventListener(type: string = null, childSelector: string = null) {
	return function (target: any, propertyKey: string) {
		ComponentFactory.onComponentClassInitialized(function (object: AbstractComponent) {
			//either attach the events to the child elements if specified or the element of the component class
			if (childSelector && object.children[childSelector]) {
				let listenerTargetElement = object.children[childSelector];
				for (let i = 0; i < listenerTargetElement.length; i++) {
					applyForAllEventTypes(listenerTargetElement[i]);
				}
			} else {
				applyForAllEventTypes(object.element);
			}

			/**
			 * @description
			 * Makes it possible to pass multiple events as first arguments (separated by space) instead of one
			 * @param {Element} element
			 */
			function applyForAllEventTypes(element: Element) {
				if (typeof type === 'string') {
					const events = type.split(' ');
					for (let i = 0; i < events.length; i++) {
						applyEvent(element, events[i]);
					}
				} else {
					applyEvent(element);
				}
			}

			/**
			 * @description
			 * Creates a new function that contains the property call with applied scope of the event function
			 * @param {Element} element
			 * @param {string} type
			 */
			function applyEvent(element: Element, type: string | null = null) {
				let listener = function (this: any, event: Event) {
					target[propertyKey].apply(object, [this, event]);
				};

				element.addEventListener(type === null ? propertyKey : type, listener);
			}
		}, target);
	};
}