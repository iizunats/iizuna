import {ComponentInternal} from "../interfaces/component.interface";
import {HtmlElementUtility} from "./html-element-utility";
import {OnReady} from "../interfaces/on-ready.interface";
import {ListenerConfiguration} from "../decorators/event-listener.decorator";
import {debounce} from "./debounce";
import {ComponentRegistry} from "./component.registry";
import {Template} from "../classes/template";
import {DomReady} from "./dom-ready";

export abstract class ComponentFactory {

	public static registerComponents(components: any[]) {
		DomReady.ready(() => {
			for (let i = 0; i < components.length; i++) {
				const componentClass = this.createComponentClass(components[i]);
				const elements = HtmlElementUtility.querySelectAllByAttribute(componentClass.__options.selector);
				for (let j = 0; j < elements.length; j++) {
					this.initializeComponent(this.createComponentClass(components[i]), elements[j]);
				}
			}
		});
	}

	private static createComponentClass(componentClass: any) {
		return new componentClass() as ComponentInternal;
	}

	private static initializeComponent(individualComponent: ComponentInternal, element: HTMLElement) {
		individualComponent.element = element;
		if (typeof individualComponent.__options.template === 'string') {
			const templateElement = document.getElementById(individualComponent.__options.template) as HTMLTemplateElement;
			if (typeof templateElement.innerHTML !== 'undefined') {//we no longer check the instance of, because of some polyfills that cant inherit from the HTMLTemplateElement
				individualComponent.template = new Template(templateElement.innerHTML);
			}
		}

		if (individualComponent.__options.childrenSelectors && individualComponent.__options.childrenSelectors.length) {
			this.initializeChildrenElements(individualComponent, individualComponent.__options);
		}
		this.getAttributeValuesOfProperties(individualComponent);
		this.applyEventListeners(individualComponent);
		this.callReadyListener(individualComponent);
		if (individualComponent.__options.selector) {
			ComponentRegistry.registerComponent(individualComponent.__options.selector, individualComponent);
		}
	}

	public static createComponentWithElement(element: HTMLElement, componentClass: any) {
		this.initializeComponent(this.createComponentClass(componentClass), element);
	}

	private static getAttributeValuesOfProperties(object: ComponentInternal) {
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
	private static applyEventListeners(object: ComponentInternal) {
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

	private static initializeChildrenElements(individualComponent: ComponentInternal, options: any) {
		for (let j = 0; j < options.childrenSelectors.length; j++) {
			const childrenElements = HtmlElementUtility.querySelectAllByAttribute(options.childrenSelectors[j], individualComponent.element);
			if (typeof individualComponent.children === "undefined") {
				individualComponent.children = {};
			}
			individualComponent.children[options.childrenSelectors[j]] = childrenElements;
		}
	}

	private static callReadyListener(individualComponent: ComponentInternal): void {
		let onReadyCasted = individualComponent as {} as OnReady;
		if ('onReady' in individualComponent && typeof onReadyCasted.onReady === 'function') {
			onReadyCasted.onReady();
		}
	}
}