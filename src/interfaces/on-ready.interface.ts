/**
 * @description
 * This interface needs to be implemented to allow every individual-component to listen for the dom-ready event
 */
export interface OnReady {
	/**
	 * @description
	 * This method is called when the DOM is ready.
	 */
	onReady(): void;
}