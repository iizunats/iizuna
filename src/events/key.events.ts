import {DomReady} from "../helpers/dom-ready";
import {EventHelper} from "../helpers/event-helper";

DomReady.ready(() => {
	document.addEventListener('keyup', (event: KeyboardEvent) => {
		switch (event.key) {
			case 'Esc':
			case 'Escape':
				EventHelper.triggerCustomEvent('key.escape');
		}
	});
});