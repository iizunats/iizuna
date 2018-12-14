/**
 * @description
 * A simple template class without much functionality.
 * Currently only used to add more functionalities to the templates later
 */
import {ConfigRegistry} from "../helpers/config.registry";

export class Template {
	protected expressionWrapper: string[];

	constructor(protected _html: string) {
		this.expressionWrapper = ConfigRegistry.getConfig('template.expressionWrapper', ['(\$\{|%24%7B)', '(\}|%7D)']);
	}

	get html(): string {
		return this._html;
	}

	/**
	 * @description
	 * Replaces placeholder values inside of the html ("${varName}") with the passed key-value-pairs
	 * @param vars an object containing key value pairs of the variable names and values
	 * @return {string}
	 */
	public render(vars: any): string {
		let html = this.html;
		const start = this.expressionWrapper[0];
		const end = this.expressionWrapper[1];
		for (let name in vars) {
			if (vars.hasOwnProperty(name)) {
				let regex = new RegExp(start + name + end, 'g');

				html = html.replace(regex, vars[name]);
			}
		}

		return html;
	}
}