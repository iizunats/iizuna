export function ElementAttribute() {
    return (target: any, propertyKey: string) => {
        if (typeof target.__elementAttributes === "undefined") {
            target.__elementAttributes = {};
        }

        target.__elementAttributes[propertyKey] = target[propertyKey];
    };
}