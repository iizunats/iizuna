import {Component} from "../../src/decorators/component.decorator";
import {EventListener} from "../../src/decorators/event-listener.decorator";
import {smoothScroll} from "../../src/helpers/scroll";
import {ElementAttribute} from "../../src/decorators/element-attribute.decorator";

@Component({
    selector: 'scroll-top'
})
export class ScrollTopComponent {
    @ElementAttribute()
    protected duration = 500;//default duration if not set as attribute

    constructor() {
    }

    @EventListener()
    public click() {
        smoothScroll(0, +this.duration);
    }
}