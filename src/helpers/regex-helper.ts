export abstract class RegexHelper {
	/**
	 * @description
	 * Escapes the given string to be used as a RegExp
	 * @see https://stackoverflow.com/a/6969486/2217462
	 * @param string
	 */
	public static escapeRegExp(string: string) {
		return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
	}
}