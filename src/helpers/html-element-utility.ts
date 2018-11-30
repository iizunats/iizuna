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
	 * The attribute of the element can either be prefix with "data-" or not. It is found in both cases
	 * @param {string} selector The data attribute
	 * @param {HTMLElement} element The element of which the attribute value should be returned
	 * @return {string}
	 */
	public static getSelectorValue(selector: string, element: Element): string {
		const clearedSelector = selector.replace(/^data-/, '');
		return element.getAttribute(clearedSelector) || element.getAttribute('data-' + clearedSelector);
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