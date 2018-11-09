import {Promise} from "es6-promise";

export abstract class AjaxHelper {
    public static get(url: string): Promise<XMLHttpRequest> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    resolve(xhr);
                } else {
                    reject(xhr);
                }
            };
            xhr.send();
        });
    }
}