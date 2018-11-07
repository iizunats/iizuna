import {DomReady} from "../helpers/dom-ready";
import {OnReady} from "../interfaces/on-ready.interface";

export function Component(options: { selector: string }) {
    return function <T extends { new(...args: any[]): {} }>(target: T) {
        return class DecoratedComponent extends target {
            protected __eventListeners: any ;
            protected elements: NodeList = null;

            constructor(...args: any[]) {
                super();
                DomReady.ready(() => {
                    this.elements = document.querySelectorAll('[data-' + options.selector + '],[' + options.selector + ']');
                    applyEventListeners(this);
                    if ('onReady' in this && typeof (this as OnReady).onReady === 'function') {
                        (this as OnReady).onReady();
                    }
                });


                /**
                 * @description
                 * Applies all Event listeners, that are created by the EventListener Decorator
                 * @param {object} object
                 */
                function applyEventListeners(object: DecoratedComponent) {
                    if (typeof object.__eventListeners !== "object") {
                        return;
                    }
                    for (let name in object.__eventListeners) {
                        if (!object.__eventListeners.hasOwnProperty(name)) {
                            continue;
                        }
                        for (let i = 0; i < object.elements.length; i++) {
                            object.elements[i].addEventListener(name, function (event) {
                                object.__eventListeners[name].apply(object, [this, event]);
                            });
                        }
                    }
                }
            }
        };
    };
}