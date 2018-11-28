import {ComponentInternal} from "../interfaces/component.interface";
import {HtmlElementUtility} from "./html-element-utility";
import {OnReady} from "../interfaces/on-ready.interface";
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

	public static onComponentClassInitialized(callback: any, individualComponent: any) {
		if (typeof individualComponent.__componentClassInitializedListeners === "undefined") {
			individualComponent.__componentClassInitializedListeners = [];
		}
		individualComponent.__componentClassInitializedListeners.push(callback);
	}

	private static callComponentClassInitialized(individualComponent: ComponentInternal) {
		let abstractCasted = individualComponent as any;
		if ('__componentClassInitializedListeners' in abstractCasted) {
			for (let i = 0; i < abstractCasted.__componentClassInitializedListeners.length; i++) {
				abstractCasted.__componentClassInitializedListeners[i](individualComponent);
			}
		}
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
		this.callComponentClassInitialized(individualComponent);
		this.callReadyListener(individualComponent);
		if (individualComponent.__options.selector) {
			ComponentRegistry.registerComponent(individualComponent.__options.selector, individualComponent);
		}
	}

	public static createComponentWithElement(element: HTMLElement, componentClass: any) {
		this.initializeComponent(this.createComponentClass(componentClass), element);
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