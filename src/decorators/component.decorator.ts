import { AbstractComponent } from "../classes/abstract.component";

export type ComponentOptions = {
	selector: string;
	childrenSelectors?: ReadonlyArray<string>;
	template?: string;
	templateUrl?: string;
	templateCachingEnabled?: boolean;
	restrict?: string;
};

type ExactShape<T, Shape> = T extends Shape ? (Exclude<keyof T, keyof Shape> extends never ? T : never) : never;

/**
 * @description
 * Is used purely for typing purposes.
 * Returns the `config` argument as is and preserves literal types from the `as const` annotation.
 */
type CreateConfig = <T extends ComponentOptions>(config: ExactShape<T, ComponentOptions>) => T;
export const createConfig: CreateConfig = (config) => config;

export interface Constructor<T> {
	new (...args: any[]): T;
}

/**
 * @description
 * Is used to pass configuration values to the component class.
 * @param {ComponentOptions} options
 * @internal
 */
export function Component<TOptions extends ComponentOptions = ComponentOptions>(options: ExactShape<TOptions, ComponentOptions>) {
	return <T extends Constructor<AbstractComponent>>(target: T) =>
		class extends target {
			this: AbstractComponent<TOptions>;

			constructor(...args: any[]) {
				super();
				this.__options = options;
			}
		};
}
