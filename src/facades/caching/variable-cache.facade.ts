import {Promise} from "es6-promise";
import {Facade} from "../facade";
import {CachingFacadeInterface} from "./caching-facade.interface";

export class VariableCacheFacade extends Facade implements CachingFacadeInterface<string, any> {
	private cachingVariable: { [key: string]: any } = {};

	public get(key: string): Promise<any> {
		return new Promise((resolve) => {
			resolve(this.cachingVariable[key]);
		});
	}

	/**
	 * @description
	 * Simply Returns a variable from variable cache
	 * @param {string} key
	 * @param value
	 */
	public set(key: string, value: any): Promise<void> {
		return new Promise((resolve) => {
			this.cachingVariable[key] = value;
			resolve();
		});
	}
}