export class Template {
	constructor(protected _html: string) {
	}

	get html(): string {
		return this._html;
	}

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