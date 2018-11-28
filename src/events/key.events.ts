import {DomReady} from "../helpers/dom-ready";

DomReady.ready(() => {
	document.addEventListener('keyup', (event: KeyboardEvent) => {
		switch (event.key) {
			case 'Escape':
				document.dispatchEvent(new Event('key.escape'));
		}
	});
});