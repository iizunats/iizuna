import {Promise} from "es6-promise";

/**
 * @description
 * A simple ajax helper for:
 * - a: less javascript for XMLHttpRequests
 * - b: promise support.
 */
export abstract class AjaxHelper {

	/**
	 * @description
	 * Does a HTTP-GET request on the given url
	 * @param {string} url
	 * @return {Promise<XMLHttpRequest>}
	 */
	public static get(url: string): Promise<XMLHttpRequest> {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open('GET', url);
			xhr.onload = function () {
				if (xhr.status === 200) {
					resolve(xhr);
				} else {
					reject(xhr);
				}
			};
			xhr.send();
		});
	}
}