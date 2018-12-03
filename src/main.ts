import {ComponentFactory} from "iizuna";
import {AccordionComponent} from "./components/accordion.component";
import {ModalComponent} from "./components/modal/modal.component";
import {ModalTriggerComponent} from "./components/modal/modal-trigger.component";


ComponentFactory.registerComponents([
	AccordionComponent,
	//
	ModalComponent,
	ModalTriggerComponent
]);