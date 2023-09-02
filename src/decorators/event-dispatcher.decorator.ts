import { AbstractComponent } from "../classes/abstract.component";

/**
 * @description
 * Dispatches a CustomEvent from the current component instance.
 * The return value of the decorated method is the CustomEventInit of this CustomEvent.
 * @param {string} name The event type.
 * @constructor
 */
export function EventDispatcher<T, TComponent extends AbstractComponent>(name: string) {
	function emit(elem: Element | undefined, config: T): T {
		const customEventInit: CustomEventInit<T> = { detail: config, bubbles: true };
		const event = new CustomEvent(name, customEventInit);

		if (elem) {
			elem.dispatchEvent(event);
		}

		return config;
	}

	return (_: TComponent, __: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => T>) => {
		if (!(descriptor.value instanceof Function)) {
			throw new Error("EventDispatcher must be used as a decorator on a class method.");
		}

		const originalMethod = descriptor.value;

		descriptor.value = function (...args: any[]) {
			const self: AbstractComponent = this as any;
			const result = originalMethod.apply(self, args);
			return emit(self.element, result);
		};

		return descriptor;
	};
}