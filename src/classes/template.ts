/**
 * @description
 * A simple template class without much funtionality.
 * Currently only used to add more functionalities to the templates later
 */
export class Template {
	constructor(protected _html: string) {
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
	public render(vars: any) {
		let html = this.html;
		for (let name in vars) {
			if (vars.hasOwnProperty(name)) {
				let regex = new RegExp('\\${' + name + '}', 'g');

				html = html.replace(regex, vars[name]);
			}
		}

		return html;
	}
}