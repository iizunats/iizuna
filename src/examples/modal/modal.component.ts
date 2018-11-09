import {Component} from "../../decorators/component.decorator";
import {Component as ComponentInterface} from "../../interfaces/component.interface";
import {EventListener} from "../../decorators/event-listener.decorator";
import {OnReady} from "../../interfaces/on-ready.interface";
import {HtmlElementUtility} from "../../helpers/html-element-utility";

@Component({
    selector: 'modal'
})
export class ModalComponent implements ComponentInterface, OnReady {
    element: HTMLElement;

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
        /**
         * @description
         * Close all modal if any modal is opened.
         * The event emitting instance opens itself after the event. so don't mind him
         */
        document.addEventListener('modal.open', () => {
            this.closeModal();
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
        document.dispatchEvent(new Event('modal.open'));
        this.element.classList.remove('closed');
        this.element.classList.add('open');
    }

    /**
     * @description
     * Simply removes the "open" class and adds the "closed" class to the current element
     */
    public closeModal() {
        this.element.classList.remove('open');
        this.element.classList.add('closed');
    }
}