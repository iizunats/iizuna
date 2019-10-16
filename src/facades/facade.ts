export abstract class Facade {
	private static facades: { [key: string]: Facade[] } = {};
	public priority = 0; // The priority of the facade usage. if a facade has a higher priority, then this facade is used

	/**
	 * @description
	 * Registers a new facade
	 * @param {string} name
	 * @param {Facade} facade
	 */
	public static register(name: string, facade: Facade): void {
		if (!(name in this.facades)) {
			this.facades[name] = [];
		}
		this.facades[name].push(facade);
	}

	/**
	 * @description
	 * Returns a facade based by its name
	 * @param {string} name
	 * @return {Facade}
	 */
	public static get(name: string): Facade | null {
		if (!(name in this.facades)) {
			return null;
		}
		return this.facades[name].sort((a, b) => b.priority - a.priority)[0] || null;
	}
}