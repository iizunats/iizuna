import {ConfigRegistry} from "../helpers/config.registry";
import {ComponentFactory} from "../helpers/component.factory";
import {HtmlElementUtility} from "../helpers/html-element-utility";
import {ComponentInternal} from "../interfaces/component.interface";

export function ElementAttribute(configRegistryIdentifier: string = '') {
	return (target: any, propertyKey: string) => {
		ComponentFactory.onComponentClassInitialized(function (object: ComponentInternal) {
			let att = HtmlElementUtility.getSelectorValue(propertyKey, object.element);
			if (att !== null) { // first get the value of the element attribute
				object[propertyKey] = att;
			} else if (configRegistryIdentifier !== '') {//if not set, try to get the global default override.
				target[propertyKey] = ConfigRegistry.getConfig(configRegistryIdentifier, target[propertyKey]);
			}
		}, target);
	};
}