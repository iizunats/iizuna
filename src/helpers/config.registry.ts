/**
 * @description
 * The ConfigRegistry allows the global override of attributes that are received via the ElementAttribute Decorator.
 * @todo: explain more
 */
export abstract class ConfigRegistry {
	/**
	 * @description
	 * Local storage of configuration values.
	 * @type {{}}
	 */
	public static configs: any = {};

	/**
	 * @description
	 * Sets the config value of any configuration
	 * @param {string} name
	 * @param value
	 */
	public static setConfig(name: string, value: any) {
		this.configs[name] = value;
	}

	/**
	 * @description
	 * Returns the configuration values currently stored inside of the configs object.
	 * The defaultValue is returned if no config was found.
	 * This method is normally just used by the ElementAttribute Decorator. But feel free to use it.
	 * @param {string} name
	 * @param defaultValue
	 * @return {any}
	 */
	public static getConfig(name: string, defaultValue: any = null) {
		if (typeof this.configs[name] === "undefined") {
			return defaultValue;
		}
		return this.configs[name];
	}
}