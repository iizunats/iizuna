import {Component} from "../src/decorators/component.decorator";
import {EventListener} from "../src/decorators/event-listener.decorator";
import {HtmlElementUtility} from "../src/helpers/html-element-utility";
import {Component as ComponentInterface} from "../src/interfaces/component.interface";
import {ElementAttribute} from "../src/decorators/element-attribute.decorator";

const HEADER_SELECTOR = 'accordion-header';
const CONTENT_SELECTOR = 'accordion-content';

@Component({
    selector: 'accordion',
    childrenSelectors: [
        HEADER_SELECTOR, CONTENT_SELECTOR
    ]
})
export class AccordionComponent implements ComponentInterface {
    element: HTMLElement;

    @ElementAttribute()
    protected classActiveHeader = 'active';
    @ElementAttribute()
    protected classInactiveHeader = 'inactive';
    @ElementAttribute()
    protected classOpenedContent = 'open';
    @ElementAttribute()
    protected classClosedContent = 'closed';


    @EventListener('click', HEADER_SELECTOR)
    public clickHeader(headerElement: HTMLElement) {
        const identifier = HtmlElementUtility.getSelectorValue(HEADER_SELECTOR, headerElement);
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
        return HtmlElementUtility.querySelectByAttribute(CONTENT_SELECTOR, this.element, identifier);
    }

    private closeAllContents() {
        const allContents = HtmlElementUtility.querySelectAllByAttribute(CONTENT_SELECTOR, this.element);
        for (let i = 0; i < allContents.length; i++) {
            allContents[i].classList.remove(this.classOpenedContent);
            allContents[i].classList.add(this.classClosedContent);
            allContents[i].style.height = 0;
        }
    }

    private deactivateAllHeaders() {
        const allHeaders = HtmlElementUtility.querySelectAllByAttribute(HEADER_SELECTOR, this.element);
        for (let i = 0; i < allHeaders.length; i++) {
            allHeaders[i].classList.remove(this.classActiveHeader);
            allHeaders[i].classList.add(this.classInactiveHeader);
        }
    }
}