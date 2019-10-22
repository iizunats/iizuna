/**
 * @description
 * A simple template class without much functionality.
 * Currently only used to add more functionalities to the templates later
 */
import {ConfigRegistry} from "../helpers/config.registry";
import * as Mustache from "mustache";

export class Template {
	/**
	 * @deprecated Will be removed, when only mustache is used as template engine
	 */
	protected expressionWrapper: string[];
	protected compatibleMode: boolean;

	constructor(protected _html: string) {
		this.compatibleMode = ConfigRegistry.getConfig('template.compatibleMode', true);
		this.expressionWrapper = ConfigRegistry.getConfig('template.expressionWrapper', ['(\\$\\{|%24%7B)', '(\\}|%7D)']);
	}

	get html(): string {
		return this._html;
	}

	public render(vars: any): string {
		console.log(this.compatibleMode, vars);
		return this.compatibleMode ? this.renderOldVersion(vars) : this.renderMustache(vars);
	}

	private renderMustache(vars: any): string {
		return Mustache.render(this.html, vars);
	}

	/**
	 * @description
	 * Replaces placeholder values inside of the html ("${varName}") with the passed key-value-pairs
	 * @param vars an object containing key value pairs of the variable names and values
	 * @deprecated will be removed in future versions
	 * @return {string}
	 */
	private renderOldVersion(vars: any): string {
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