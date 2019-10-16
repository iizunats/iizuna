import {Promise} from "es6-promise";
import {Facade} from "../facade";
import {CachingFacadeInterface} from "./caching-facade.interface";

export class VariableCacheFacade extends Facade implements CachingFacadeInterface<string, any> {
	private cachingVariable: { [key: string]: any } = {};

	/**
	 * @description
	 * Returns the item from the variable cache when found. otherwise null
	 * @param {string} key
	 * @return {Promise<T>}
	 */
	public get(key: string): Promise<any> {
		return new Promise((resolve) => {
			resolve(key in this.cachingVariable ? this.cachingVariable[key] : null);
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