export function ElementAttribute() {
    return function (target: any, propertyKey: string) {
        if (typeof target.__elementAttributes === "undefined") {
            target.__elementAttributes = {};
        }

        target.__elementAttributes[propertyKey] = target[propertyKey];
    };
}