import {AbstractComponent} from "../classes/abstract.component";

/**
 * @description
 * A simple helper class that unifies the handling of events
 */
export abstract class EventHelper {
	/**
	 * @description
	 * This method dispatches a custom event (which is also polyfilled for the IE) on the document
	 * @param {string} name The name of the custom event
	 * @param value A optional value that can be set for the event. The value can than be retrieved via "event.value"
	 */
	public static triggerCustomEvent(name: string, value?: any): void {
		const event = new CustomEvent(name) as any;
		if (typeof value !== 'undefined') {
			event.value = value;
		}

		document.dispatchEvent(event);
	}

	/**
	 * @description
	 * This method is normally just used internally but can also be used for all kind of event listener attachment on component methods.
	 * It takes a space seperated string (type) for the events that should be attached to the element.
	 * The passed propertyKey (key of the passed target) is then used as callback for the listener.
	 * The passed object's scope is then applied to the listener on call.
	 * @param {string} type
	 * @param element Any element implementing the "addEventListener" method.
	 * @param target An AbstractComponent Class
	 * @param {AbstractComponent} object An AbstractComponent Instance
	 * @param {string} propertyKey The property name of the callback method used for the object
	 */
	public static attachDecoratorListeners(type: string, element: any, target: any, object: AbstractComponent, propertyKey: string) {
		if (typeof type === 'string') {
			const events = type.split(' ');
			for (let i = 0; i < events.length; i++) {
				applyEvent(events[i]);
			}
		} else {
			applyEvent();
		}


		/**
		 * @description
		 * Creates a new function that contains the property call with applied scope of the event function
		 * @param {string} type
		 */
		function applyEvent(type: string | null = null) {
			let eventName = type === null ? propertyKey : type;
			EventHelper.addScopedEventListener(element, eventName, object, target[propertyKey]);
		}
	}

	/**
	 * @description
	 * Creates a new function that contains the property call with applied scope of the event function
	 * @param element Any element implementing the "addEventListener" method.
	 * @param eventName
	 * @param scopeObject
	 * @param callback
	 */
	private static addScopedEventListener(element: any, eventName: string, scopeObject: any, callback: (scope: any, event: Event) => void) {
		element.addEventListener(eventName, function (event: Event) {
			callback.apply(scopeObject, [this, event]);
		});
	}
}