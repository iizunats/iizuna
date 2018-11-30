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
			if (childSelector && object.children[childSelector]) {
				let listenerTargetElement = object.children[childSelector];
				for (let i = 0; i < listenerTargetElement.length; i++) {
					applyEvent(listenerTargetElement[i]);
				}
			} else {
				applyEvent(object.element);
			}


			function applyEvent(element: Element) {
				let listener = function (event: Event) {
					target[propertyKey].apply(object, [this, event]);
				};

				element.addEventListener(type === null ? propertyKey : type, listener);
			}
		}, target);
	};
}