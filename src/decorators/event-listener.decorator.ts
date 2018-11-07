export function EventListener() {
    return function (target: any, propertyKey: string) {
        if (typeof target.__eventListeners === "undefined") {
            target.__eventListeners = {};
        }
        target.__eventListeners[propertyKey] = target[propertyKey];
    };
}