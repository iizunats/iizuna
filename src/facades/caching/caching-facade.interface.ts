import {Promise} from "es6-promise";

export interface CachingFacadeInterface<KEY, VALUE> {
	set: (key: KEY, value: VALUE) => Promise<void>;
	get: (key: KEY) => Promise<VALUE>;
}