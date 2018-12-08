import {
	AbstractComponent,
	Component,
	EventHelper,
	EventListener,
	GlobalEventListener,
	HtmlElementUtility,
	OnReady
} from "iizuna";

/**
 * In this example we use the following functions:
 * - OnReady Interface (onReady Method is called after DOMReady)
 * - key.escape Event (this event is aromatically registered with iizuna)
 * - HtmlElementUtility.isDescendant (detects whether an element is a child of another)
 * - custom events (here we use it 1. to listen for key.escape and 2. to emit/listen the modal.open event)
 * - EventListener Decorator (registers an event listener to the Element that is found on page load for the selector)
 * - GlobalEventListener Decorator (registers an event to the document)
 */
@Component({
	selector: 'modal'
})
export class ModalComponent extends AbstractComponent implements OnReady {
	onReady() {
		/**
		 * @description
		 * Close the modal if the user presses the escape key.
		 * But check in before, if the user is currently using an element inside of the modal (e.g. an input).
		 * If so, don't close the modal!
		 */
		document.addEventListener('key.escape', () => {
			if (!HtmlElementUtility.isDescendant(this.element, document.activeElement)) {
				this.closeModal();
			}
		});
	}

	/**
	 * @description
	 * Close the modal if the user clicks on the background
	 * @param {HTMLElement} element
	 * @param {Event} event
	 */
	@EventListener()
	click(element: HTMLElement, event: Event) {
		if (element === event.target) {
			this.closeModal();
		}
	}

	/**
	 * @description
	 * Simply removes the "closed" class and adds the "open" class to the current element
	 */
	public openModal() {
		EventHelper.triggerCustomEvent('modal.open');
		this.element.classList.remove('closed');
		this.element.classList.add('open');
	}

	/**
	 * @description
	 * Simply removes the "open" class and adds the "closed" class to the current element.
	 * Also attach this method to the global "modal.open" custom event, because we want to close all modals if a modal is about to open.
	 * The event emitting instance opens itself after the event.
	 */
	@GlobalEventListener('modal.open')
	public closeModal() {
		this.element.classList.remove('open');
		this.element.classList.add('closed');
	}
}