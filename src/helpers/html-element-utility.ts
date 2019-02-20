/**
 * @description
 * A utility class with some static methods that can be used to interact with HTMLElements
 */
export abstract class HtmlElementUtility {

	/**
	 * @description
	 * Returns the found element based by the passed data attribute (selector).
	 * The attribute of the element can either be prefix with "data-" or not. It is found in both cases
	 * @param {string} selector The data attribute
	 * @param {HTMLElement} element The element in which should be searched. The fallback is "document"
	 * @param {string} value If a element with a specific value of the attribute is needed
	 * @return {HTMLElement|null}
	 */
	public static querySelectByAttribute<E extends Element = Element>(selector: string, element: any = document, value: string = null): E | null {
		const queryValued = value !== null ? selector + '="' + value + '"' : selector;
		return element.querySelector('[data-' + queryValued + '],[' + queryValued + ']');
	}

	/**
	 * @description
	 * Returns the found elements based by the passed data attribute (selector).
	 * The attribute of the element can either be prefix with "data-" or not. It is found in both cases
	 * @param {string} selector The data attribute
	 * @param {HTMLElement} element The element in which should be searched. The fallback is "document"
	 * @param {string} value If a element with a specific value of the attribute is needed
	 * @return {NodeList}
	 */
	public static querySelectAllByAttribute<E extends Element = Element>(selector: string, element: any = document, value: string = null): NodeListOf<E> {
		const queryValued = value !== null ? selector + '="' + value + '"' : selector;
		return element.querySelectorAll('[data-' + queryValued + '],[' + queryValued + ']');
	}

	/**
	 * @description
	 * Returns the value inside of the attribute of the given element.
	 * The attribute of the element can either be prefix with "data-" or not. It is found in both cases.
	 * We also try to convert the given selector from camelcase to kebab-case.
	 * If no value is found for the converted selector, we try to get the value of the camelcase selector.
	 * @param {string} selector The data attribute
	 * @param {HTMLElement} element The element of which the attribute value should be returned
	 * @return {string}
	 */
	public static getSelectorValue(selector: string, element: Element): string {
		const clearedSelector = selector.replace(/^data-/, '');
		return getDataAttribute(camelCaseToKebabCase(clearedSelector)) || getDataAttribute(clearedSelector);

		/**
		 * @description
		 * Returns the value of the passed selector regardless of the prefixed "data-".
		 * If both, the selector with and without the prefixed "data-" exists, then the value without the data- is returned.
		 * @param {string} selector
		 */
		function getDataAttribute(selector: string): string {
			return element.getAttribute(selector) || element.getAttribute('data-' + selector);
		}

		/**
		 * @description
		 * Converts the passes camelcase string to kebab-case
		 * @param {string} string
		 * @return {string}
		 * @see https://gist.github.com/nblackburn/875e6ff75bc8ce171c758bf75f304707
		 */
		function camelCaseToKebabCase(string: string): string {
			return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
		}
	}

	/**
	 * @description
	 * Simply check whether an element is a descendant of another
	 * @param {Element} parent the parent that is being checked
	 * @param {Element} child the child element
	 * @return {boolean}
	 */
	public static isDescendant(parent: Element, child: Element): boolean {
		let node = child.parentNode;
		while (node != null) {
			if (node == parent) {
				return true;
			}
			node = node.parentNode;
		}
		return false;
	}
}