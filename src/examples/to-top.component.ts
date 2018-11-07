import {Component} from "../decorators/component.decorator";
import {OnReady} from "../interfaces/on-ready.interface";
import {EventListener} from "../decorators/event-listener.decorator";

@Component({
    selector: 'to-top'
})
export class ToTopComponent implements OnReady {
    constructor() {
    }

    @EventListener()
    public click(element: HTMLElement) {
        console.log('AAAAA', this, element);
    }

    onReady() {
        console.log('READYYYY');
    }
}