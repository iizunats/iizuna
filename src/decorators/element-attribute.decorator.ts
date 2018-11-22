import {ConfigRegistry} from "../helpers/config.registry";

export function ElementAttribute(configRegistryIdentifier: string = '') {
	return (target: any, propertyKey: string) => {
		if (typeof target.__elementAttributes === "undefined") {
			target.__elementAttributes = {};
		}
		const targetValue = target[propertyKey];
		target.__elementAttributes[propertyKey] = configRegistryIdentifier === '' ? targetValue : ConfigRegistry.getConfig(configRegistryIdentifier, targetValue);
	};
}