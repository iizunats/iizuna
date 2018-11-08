export class ListenerConfiguration {
    constructor(public listener: () => {},
                public type: string,
                public childSelector?: string) {
    }
}

export function EventListener(type: string = null, childSelector: string = null) {
    return function (target: any, propertyKey: string) {
        if (typeof target.__eventListeners === "undefined") {
            target.__eventListeners = {};
        }

        target.__eventListeners[propertyKey] = new ListenerConfiguration(
            target[propertyKey],
            type === null ? propertyKey : type,
            childSelector
        );
    };
}