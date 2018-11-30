/**
 * @description
 * A simple debounce function that is also used by the DebounceEvent Decorator
 * @param callback The callback that should get debounced
 * @param {number} delay the delay of the debounce in milliseconds
 * @param {boolean} immediate Only used recursively
 * @return {() => any} The debounced callback that should be used as function
 */
export function debounce(callback: any, delay: number, immediate = false): () => void {
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