import {ComponentFactory} from "iizuna";
import {AccordionComponent} from "./components/accordion.component";
import {ModalComponent} from "./components/modal/modal.component";
import {ModalTriggerComponent} from "./components/modal/modal-trigger.component";
import {ScrollToTargetComponent} from "./components/scroll/scroll-to-target.component";
import {ScrollTopComponent} from "./components/scroll/scroll-top.component";

ComponentFactory.registerComponents([
	AccordionComponent,
	//
	ModalComponent,
	ModalTriggerComponent,
	//
	ScrollToTargetComponent,
	ScrollTopComponent
]);