import {ConfigRegistry} from "../helpers/config.registry";

export function ElementAttribute(configRegistryIdentifier: string = '') {
	return (target: any, propertyKey: string) => {
		if (typeof target.__elementAttributes === "undefined") {
			target.__elementAttributes = {};
		}
		target.__elementAttributes[propertyKey] = configRegistryIdentifier === '' ? target[propertyKey] : ConfigRegistry.getConfig(configRegistryIdentifier, target[propertyKey]);
	};
}