import {DomReady} from "../helpers/dom-ready";
import {EventHelper} from "../helpers/event-helper";

/**
 * @description
 * Registers the Key Escape Event on the document, because its often used by components.
 * It already polyfills for IE (Esc instead of Escape)
 * @event key.escape
 */
DomReady.ready(() => {
	document.addEventListener('keyup', (event: KeyboardEvent) => {
		switch (event.key) {
			case 'Esc':
			case 'Escape':
				EventHelper.triggerCustomEvent('key.escape');
		}
	});
});