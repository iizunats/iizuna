import {AbstractComponent, Component, ComponentRegistry, ElementAttribute, EventListener} from "iizuna";

/**
 * In this example we use the following functions:
 * - ComponentRegistry (here we try to get components based by the selector and then call public methods of these.)
 * - custom events (here we use it to emit the modal.open/modal.close events)
 * - EventListener Decorator (registers an event listener to the Element that is found on page load for the selector)
 * - ElementAttribute Decorators (get the values of the attributes of the found element on page load)
 */
@Component({
	selector: 'modal-trigger'
})
export class ModalTriggerComponent extends AbstractComponent {
	/**
	 * either opening or closing a modal
	 */
	@ElementAttribute()
	type: string = 'open';
	/**
	 * The name of the modal that should be opened/closed
	 */
	@ElementAttribute()
	target: string;

	/**
	 * Register a click listener
	 * (because the first argument of the decorator is omitted, the decorator uses the property name (click) for the event name)
	 */
	@EventListener()
	click() {
		const targetModals = ComponentRegistry.getComponentsBySelectorAndIdentifier('modal', this.target);
		if (targetModals.length > 0) {
			switch (this.type) {
				case 'open':
					targetModals[0].openModal();
					break;
				case 'close':
					targetModals[0].closeModal();
					break;
			}
		}
	}
}