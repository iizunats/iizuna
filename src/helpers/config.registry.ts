export abstract class ConfigRegistry {
	protected static configs: any = {};

	public static setConfig(name: string, value: any) {
		this.configs[name] = value;
	}

	public static getConfig(name: string, defaultValue: any = null) {
		if (typeof this.configs[name] === "undefined") {
			return defaultValue;
		}
		return this.configs[name];
	}
}