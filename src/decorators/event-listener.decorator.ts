import {ComponentInternal} from "../interfaces/component.interface";
import {debounce} from "../helpers/debounce";
import {ComponentFactory} from "../helpers/component.factory";

export function EventListener(type: string = null, childSelector: string = null) {
	return function (target: any, propertyKey: string) {
		ComponentFactory.onComponentClassInitialized(function (object: ComponentInternal) {
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
				if (object.__debounced && object.__debounced[name]) {
					listener = debounce(listener, object.__debounced[name]);
				}

				element.addEventListener(type === null ? propertyKey : type, listener);
			}
		}, target);
	};
}

export function DebounceEvent(delay: number) {
	return function (target: any, propertyKey: string) {
		if (typeof target.__debounced === "undefined") {
			target.__debounced = {};
		}

		target.__debounced[propertyKey] = delay;
	};
}