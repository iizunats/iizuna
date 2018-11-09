import {Component} from "../../decorators/component.decorator";
import {Component as ComponentInterface} from "../../interfaces/component.interface";
import {EventListener} from "../../decorators/event-listener.decorator";
import {ElementAttribute} from "../../decorators/element-attribute.decorator";
import {ComponentRegistry} from "../../helpers/component.registry";

@Component({
    selector: 'modal-trigger'
})
export class ModalTriggerComponent implements ComponentInterface {
    element: HTMLElement;

    @ElementAttribute()
    type: string = 'open';
    @ElementAttribute()
    target: string;

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