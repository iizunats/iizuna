export class Template {
	constructor(protected _html: string) {
	}

	get html(): string {
		return this._html;
	}
}