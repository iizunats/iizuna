export abstract class EventHelper {
	public static triggerCustomEvent(name: string, value?: any) {
		const event = new CustomEvent(name) as any;
		if (typeof value !== 'undefined') {
			event.value = value;
		}

		document.dispatchEvent(event);
	}
}