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
}