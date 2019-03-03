export class TemplateCache {
	public static get(identifier: string): string {
		if (typeof window.localStorage === 'undefined' || typeof window.localStorage.getItem !== 'function') {
			return null;
		}
		return window.localStorage.getItem(identifier);
	}

	public static set(identifier: string, data: string): void {
		if (typeof window.localStorage === 'undefined' || typeof window.localStorage.setItem !== 'function') {
			return null;
		}
		window.localStorage.setItem(identifier, data);
	}
}