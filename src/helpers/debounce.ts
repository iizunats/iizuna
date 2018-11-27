export function debounce(callback: any, delay: number, immediate = false) {
	let timeout: any;
	return function () {
		const context = this;
		const args = arguments;
		const later = function () {
			timeout = null;
			if (!immediate) {
				callback.apply(context, args);
			}
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, delay);
		if (callNow) {
			callback.apply(context, args);
		}
	};
}