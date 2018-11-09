import {Component} from "../../decorators/component.decorator";
import {EventListener} from "../../decorators/event-listener.decorator";
import {smoothScroll} from "../../helpers/scroll";
import {ElementAttribute} from "../../decorators/element-attribute.decorator";

@Component({
    selector: 'scroll-to-target'
})
export class ScrollToTargetComponent {
    @ElementAttribute()
    protected duration = 500;//default duration if not set as attribute

    @ElementAttribute()
    private target: string;

    @EventListener()
    public click() {
        smoothScroll(document.querySelector(this.target), +this.duration);
    }
}