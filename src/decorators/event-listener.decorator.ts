import {ComponentInterface} from "../interfaces/component.interface";
import {debounce} from "../helpers/debounce";
import {ComponentFactory} from "../helpers/component.factory";

/**
 * @description
 * Makes it possible to easily register event listeners for the component element (or event child elements)
 * @param {string} type The event type. the name of the method is used as fallback if not set
 * @param {string} childSelector Optionally the possibility to attach listeners to child elements
 * @constructor
 */
export function EventListener(type: string = null, childSelector: string = null) {
	return function (target: any, propertyKey: string) {
		ComponentFactory.onComponentClassInitialized(function (object: ComponentInterface) {
			if (childSelector && object.children[childSelector]) {
				let listenerTargetElement = object.children[childSelector];
				for (let i = 0; i < listenerTargetElement.length; i++) {
					applyEvent(listenerTargetElement[i], object, propertyKey);
				}
			} else {
				applyEvent(object.element, object, propertyKey);
			}


			function applyEvent(element: HTMLElement, object: any, name: string) {
				let listener = function (event: Event) {
					target[propertyKey].apply(object, [this, event]);
				};

				/* REMOVE AFTER MAJOR UPDATE */
				if (object.__debounced && object.__debounced[name]) {
					listener = debounce(listener, object.__debounced[name]);
				}

				element.addEventListener(type === null ? propertyKey : type, listener);
			}
		}, target);
	};
}

/**
 * @description
 * Can be used together with the EventListener Decorator.
 * It enhances it by adding a debounce to the event.
 * @param {number} delay the number of milliseconds that should be debounced
 * @constructor
 * @deprecated
 * Will be removed in the next major update. Use the Debounce Decorator instead!
 */
export function DebounceEvent(delay: number) {
	return function (target: any, propertyKey: string) {
		if (typeof target.__debounced === "undefined") {
			target.__debounced = {};
		}

		target.__debounced[propertyKey] = delay;
	};
}