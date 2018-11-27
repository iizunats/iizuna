import {DomReady} from "../helpers/dom-ready";
import {OnReady} from "../interfaces/on-ready.interface";
import {ComponentInternal} from "../interfaces/component.interface";
import {ListenerConfiguration} from "./event-listener.decorator";
import {HtmlElementUtility} from "../helpers/html-element-utility";
import {ComponentRegistry} from "../helpers/component.registry";
import {Template} from "../classes/template";
import {debounce} from "../helpers/debounce";

export function Component(options: { selector: string, childrenSelectors?: any, template?: string }) {
	return function <T extends { new(...args: any[]): {} }>(target: T) {
		return class extends target {
			constructor(...args: any[]) {
				super();
				DomReady.ready(() => {
					const elements = HtmlElementUtility.querySelectAllByAttribute(options.selector);
					let templateObject = null;
					if (typeof options.template === 'string') {
						const templateElement = document.getElementById(options.template) as HTMLTemplateElement;
						if (typeof templateElement.innerHTML !== 'undefined') {//we no longer check the instance of, because of some polyfills that cant inherit from the HTMLTemplateElement
							templateObject = new Template(templateElement.innerHTML);
						}
					}
					for (let i = 0; i < elements.length; i++) {
						createComponentWithElement(elements[i], templateObject);
					}
				});

				function createComponentWithElement(element: HTMLElement, template: Template) {
					const individualComponent = new target() as ComponentInternal;
					individualComponent.element = element;
					individualComponent.template = template;
					initializeChildrenElements(individualComponent);
					getAttributeValuesOfProperties(individualComponent);
					applyEventListeners(individualComponent);
					callReadyListener(individualComponent);
					ComponentRegistry.registerComponent(options.selector, individualComponent);
				}
			}
		};
	};

	function callReadyListener(individualComponent: ComponentInternal) {
		let onReadyCasted = individualComponent as {} as OnReady;
		if ('onReady' in individualComponent && typeof onReadyCasted.onReady === 'function') {
			onReadyCasted.onReady();
		}
	}

	function initializeChildrenElements(individualComponent: ComponentInternal) {
		if (options.childrenSelectors && options.childrenSelectors.length) {
			for (let j = 0; j < options.childrenSelectors.length; j++) {
				const childrenElements = HtmlElementUtility.querySelectAllByAttribute(options.childrenSelectors[j], individualComponent.element);
				if (typeof individualComponent.children === "undefined") {
					individualComponent.children = {};
				}
				individualComponent.children[options.childrenSelectors[j]] = childrenElements;
			}
		}
	}

	function getAttributeValuesOfProperties(object: ComponentInternal) {
		if (typeof object.__elementAttributes !== "object") {
			return;
		}
		for (let name in object.__elementAttributes) {
			if (!object.__elementAttributes.hasOwnProperty(name)) {
				continue;
			}

			let att = HtmlElementUtility.getSelectorValue(name, object.element);
			if (att !== null) {
				object[name] = att;
			}
			if (typeof object.__elementAttributes[name] !== 'undefined') {
				object[name] = object.__elementAttributes[name];
			}
		}
	}

	/**
	 * @description
	 * Applies all Event listeners, that are created by the EventListener Decorator
	 * @param {object} object
	 */
	function applyEventListeners(object: ComponentInternal) {
		if (typeof object.__eventListeners !== "object") {
			return;
		}
		for (let name in object.__eventListeners) {
			if (!object.__eventListeners.hasOwnProperty(name)) {
				continue;
			}

			if (hasChildSelectors(object.__eventListeners[name])) {
				let listenerTargetElement = object.children[object.__eventListeners[name].childSelector];
				for (let i = 0; i < listenerTargetElement.length; i++) {
					applyEvent(listenerTargetElement[i], object, name);
				}
			} else {
				applyEvent(object.element, object, name);
			}
		}

		function hasChildSelectors(configuration: ListenerConfiguration) {
			return configuration.childSelector && object.children[configuration.childSelector];
		}


		function applyEvent(element: HTMLElement, object: any, name: string) {
			let listener = function (event: Event) {
				object.__eventListeners[name].listener.apply(object, [this, event]);
			};
			if (object.__debounced && object.__debounced[name]) {
				listener = debounce(listener, object.__debounced[name]);
			}

			element.addEventListener(object.__eventListeners[name].type, listener);
		}
	}
}