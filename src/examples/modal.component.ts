import {Component} from "../decorators/component.decorator";
import {Component as ComponentInterface} from "../interfaces/component.interface";

@Component({
    selector: 'modal'
})
export class ModalComponent implements ComponentInterface {
    element: HTMLElement;
    //@todo: schwierigkeit hier ist folgendes:
    /*
    - modal und modal öffner/schließer sind nicht im gleichen eltern element (diese komponente muss also einen listenrr auf ein anderes element setzen können)
    - modal muss auch bei ESC geschlossen werden können
    - modal hintergrund muss auch als closer dienen können

    Generell müssten elemente auch re-initialisiert werden können nach ajax anfrage oder manuellem erzeugen von data-attributen
        -> intuitiv für entwickler!!!!
     */
}