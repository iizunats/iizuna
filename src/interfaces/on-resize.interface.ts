/**
 * @description
 * This interface needs to be implemented to attach a resize event listener
 */
export interface OnResize {
	/**
	 * @description
	 * This method is called when the window is resize'd.
	 */
	onResize(): void;
}