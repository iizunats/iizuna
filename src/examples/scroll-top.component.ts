import {Component} from "../decorators/component.decorator";
import {EventListener} from "../decorators/event-listener.decorator";
import {smoothScroll} from "../helpers/scroll";
import {ElementAttribute} from "../decorators/element-attribute.decorator";

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