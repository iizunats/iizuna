import {Component} from "../../src/decorators/component.decorator";
import {Component as ComponentInterface} from "../../src/interfaces/component.interface";
import {EventListener} from "../../src/decorators/event-listener.decorator";
import {ElementAttribute} from "../../src/decorators/element-attribute.decorator";
import {Promise} from "es6-promise";
import {AutoCompleteHelper} from "./auto-complete-helper";
import {HtmlElementUtility} from "../../src/helpers/html-element-utility";


export interface OptionItem {
    label: string;
    value: any
}

const AUTO_COMPLETE_INPUT = 'auto-complete-input';

@Component({
    selector: 'auto-complete',
    childrenSelectors: [
        AUTO_COMPLETE_INPUT
    ]
})
export class AutoCompleteComponent implements ComponentInterface {
    element: HTMLInputElement;

    //@todo: schwierigkeiten bereitet hier das handling der templates:
    /*
    - hier muss es folgende marker im template geben können:
        - die liste an sich um ein und ausgeblendet zu werden: check
        - das listen item um anhand der items dupliziert zu werden
        - der wert und das label des listen items um im template plaziert zu werden (mustache?)
     */

    @ElementAttribute()
    api: string = null;
    @ElementAttribute()
    jsonFile: string = null;
    @ElementAttribute()
    json: string = null;

    @EventListener('keyup', AUTO_COMPLETE_INPUT)
    keyupInput() {
        let filterPromise = new Promise((resolve) => {
            resolve([]);
        });
        const inputElement = HtmlElementUtility.querySelectByAttribute(AUTO_COMPLETE_INPUT, this.element);
        if (this.api !== null) {
            filterPromise = AutoCompleteHelper.getApiResponse(this.api, inputElement.value);
        } else if (this.jsonFile !== null) {
            filterPromise = AutoCompleteHelper.filterJsonFile(this.jsonFile, inputElement.value);
        } else if (this.json !== null) {
            filterPromise = AutoCompleteHelper.filterJson(this.json, inputElement.value);
        }
        filterPromise.then((data) => {
            console.dir(data);
        });
    }
}