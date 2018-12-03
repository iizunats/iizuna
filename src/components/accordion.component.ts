import {AbstractComponent, Component, ElementAttribute, EventListener, HtmlElementUtility, OnReady} from "iizuna";


/**
 * First define the Component and Decorate it with the Component Decorator.
 * Note the childrenSelectors option. With this option, pseudo components within the actual component can be addressed.
 */
@Component({
	selector: 'accordion',
	childrenSelectors: [
		'accordion-header', 'accordion-content'
	]
})
export class AccordionComponent extends AbstractComponent implements OnReady {

	/**
	 * Here we declare all options that can be overridden both via data attribute and via the ConfigRegistry.
	 */
	@ElementAttribute()
	protected classActiveHeader = 'active';
	@ElementAttribute()
	protected classInactiveHeader = 'inactive';
	@ElementAttribute()
	protected classOpenedContent = 'open';
	@ElementAttribute()
	protected classClosedContent = 'closed';

	/**
	 *  This method, if defined, is called automatically at DOMReady
	 */
	onReady(): void {
		this.closeAllContents();
		this.deactivateAllHeaders();
	}

	/**
	 * We can also declare EventListener for pseudo components.
	 * To do so, the selector must be defined as the second parameter ('accordion-header').
	 */
	@EventListener('click', 'accordion-header')
	public clickHeader(headerElement: HTMLElement) {
		const identifier = HtmlElementUtility.getSelectorValue('accordion-header', headerElement);
		this.closeAllContents();
		this.deactivateAllHeaders();
		this.openContentElement(this.getTargetContent(identifier));
		this.activateHeaderElement(headerElement);
	}

	private openContentElement(contentElement: HTMLElement) {
		contentElement.classList.add(this.classOpenedContent);
		contentElement.classList.remove(this.classClosedContent);
		contentElement.style.height = contentElement.scrollHeight + 'px';
	}

	private activateHeaderElement(headerElement: HTMLElement) {
		headerElement.classList.add(this.classActiveHeader);
		headerElement.classList.remove(this.classInactiveHeader);
	}

	private getTargetContent(identifier: string) {
		return HtmlElementUtility.querySelectByAttribute('accordion-content', this.element, identifier) as HTMLElement;
	}

	private closeAllContents() {
		const allContents = HtmlElementUtility.querySelectAllByAttribute('accordion-content', this.element) as NodeListOf<HTMLElement>;
		for (let i = 0; i < allContents.length; i++) {
			allContents[i].classList.remove(this.classOpenedContent);
			allContents[i].classList.add(this.classClosedContent);
			allContents[i].style.height = '0';
		}
	}

	private deactivateAllHeaders() {
		const allHeaders = HtmlElementUtility.querySelectAllByAttribute('accordion-header', this.element);
		for (let i = 0; i < allHeaders.length; i++) {
			allHeaders[i].classList.remove(this.classActiveHeader);
			allHeaders[i].classList.add(this.classInactiveHeader);
		}
	}
}