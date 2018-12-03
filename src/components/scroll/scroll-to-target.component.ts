import {AbstractComponent, Component, ElementAttribute, EventListener, smoothScroll} from "iizuna";

/**
 * In this example we use the following functions:
 * - smoothScroll (scrolls the page smooth, like the name says)
 * - EventListener Decorator (registers an event listener to the Element that is found on page load for the selector)
 * - ElementAttribute Decorators (get the values of the attributes of the found element on page load)
 */
@Component({
	selector: 'scroll-to-target'
})
export class ScrollToTargetComponent extends AbstractComponent {
	@ElementAttribute()
	protected duration = 500;//default duration if not set as attribute

	@ElementAttribute()
	private target: string = '';

	@EventListener()
	public click() {
		smoothScroll(document.querySelector(this.target), +this.duration);
	}
}