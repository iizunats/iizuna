import {Promise} from "es6-promise";

export interface CachingFacadeInterface<KEY, VALUE> {
	set: (key: KEY, value: VALUE) => Promise<void>;
	get: <VALUE>(key: KEY) => Promise<VALUE>;
}