import { AbstractComponent } from "../classes/abstract.component";

export type ComponentOptions = {
  selector: string;
  childrenSelectors?: readonly string[];
  template?: string;
  templateUrl?: string;
  templateCachingEnabled?: boolean;
  restrict?: string;
};

export interface Constructor<T> {
  new (...args: any[]): T;
}

/**
 * @description
 * Is used to pass configuration values to the component class.
 * @param {object} options
 * @internal
 */
export function Component<TOptions extends ComponentOptions = ComponentOptions>(options: TOptions) {
  return <T extends Constructor<AbstractComponent>>(target: T) =>
    class extends target {
      constructor(...args: any[]) {
        super();
        (this as unknown as AbstractComponent<TOptions>).__options = options;
      }
    };
}
