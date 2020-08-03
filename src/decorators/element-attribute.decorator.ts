import {ConfigRegistry} from '../helpers/config.registry';
import {ComponentFactory} from '../helpers/component.factory';
import {HtmlElementUtility} from '../helpers/html-element-utility';
import {AbstractComponent} from '../classes/abstract.component';

/**
 * @description
 * Makes it possibly to register properties of the component class as data-attributes.
 * This can be used to override specific properties directly in the html without any overhead.
 * @param {string} configRegistryIdentifier
 * @constructor
 */
export function ElementAttribute(configRegistryIdentifier: string = '') {
	return (target: any, propertyKey: string) => {
		ComponentFactory.onComponentClassInitialized(function (object: AbstractComponent) {
			let att = HtmlElementUtility.getSelectorValue(propertyKey, object.element);
			if (att !== null) { // first get the value of the element attribute
				object[propertyKey] = att === 'false' ? false : att;
			} else if (configRegistryIdentifier !== '') {//if not set, try to get the global default override.
				object[propertyKey] = ConfigRegistry.getConfig(configRegistryIdentifier, target[propertyKey] || object[propertyKey]);
			}
		}, target);
	};
}