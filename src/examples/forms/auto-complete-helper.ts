import {Promise} from "es6-promise";
import {AjaxHelper} from "../../helpers/ajax-helper";
import {OptionItem} from "./auto-complete.component";

export const AutoCompleteHelper = new class {
    private jsonFileResponsePromise: Promise<XMLHttpRequest> = null;

    /**
     * @description
     * Returns the json that is returned by the passed api.
     * The input value is injected into the url where the "{{value}}" placeholder stands
     * @param {string} apiUrl
     * @param {string} elementValue
     * @return {Promise<OptionItem[]>}
     */
    public getApiResponse(apiUrl: string, elementValue: string): Promise<OptionItem[]> {
        return new Promise((resolve, reject) => {
            const injectedUrl = apiUrl.replace('{{value}}', elementValue);
            AjaxHelper.get(injectedUrl).then((xhr) => {
                resolve(JSON.parse(xhr.response) as OptionItem[]);
            }, reject);
        });
    }

    /**
     * @description
     * Returns the json requested from the jsonFile and filtered by the "filterObjectArray" method
     * @return {Promise<OptionItem[]>}
     */
    public filterJsonFile(jsonFileUrl: string, elementValue: string): Promise<OptionItem[]> {
        return new Promise((resolve) => {
            //we are caching the ajax response, because we are requesting a static file that is unlike to change
            if (this.jsonFileResponsePromise === null) {
                this.jsonFileResponsePromise = AjaxHelper.get(jsonFileUrl);
            }
            this.jsonFileResponsePromise.then((xhr) => {
                let data = JSON.parse(xhr.response) as OptionItem[];
                resolve(this.filterObjectArray(data, elementValue));
            });
        });
    }

    /**
     * @description
     * Returns the json passed in the json attribute filtered by the "filterObjectArray" method

     * @param {string} jsonString
     * @param {string} elementValue
     * @return {Promise<OptionItem[]>}
     */
    public filterJson(jsonString: string, elementValue: string): Promise<OptionItem[]> {
        let data = JSON.parse(jsonString) as OptionItem[];
        return new Promise((resolve) => {
            resolve(this.filterObjectArray(data, elementValue));
        });
    }

    /**
     * @description
     * Filters the passed objectArray by a simple index of filter
     * @param {OptionItem[]} objectArray
     * @param {string} elementValue
     * @return {OptionItem[]}
     */
    private filterObjectArray(objectArray: OptionItem[], elementValue: string) {
        return objectArray.filter((item: OptionItem) => {
            return item.label.toLowerCase().indexOf(elementValue.toLowerCase()) !== -1;
        });
    }
};