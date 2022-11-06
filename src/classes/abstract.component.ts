import type { ComponentOptions } from "../decorators/component.decorator";
import { HtmlElementUtility } from "../helpers/html-element-utility";
import { Template } from "./template";

/**
 * @description
 * Basically any Component that is created via the Component-Decorator implements this Interface implicit via Type casting
 */
export abstract class AbstractComponent<TComponentOptions extends ComponentOptions = ComponentOptions> {
  [index: string]: any;

  /**
   * @description
   * Contains the value of the component selector of the element.
   */
  get identifier(): string {
    return HtmlElementUtility.getSelectorValue(this.selector, this.element);
  }

  /**
   * @description
   * The Element that was found in the DOM on DomReady for the given selector
   */
  element: Element;
  /**
   * @description
   * This property will be filled automatically if the class was decorated by the Component Decorator.
   * It contains the passed selector string.
   */
  selector: string;
  /**
   * @description
   * The HTML of the Template that is found if the Component Decorator was correctly configured.
   * @see Component
   */
  template: Template;
  /**
   * @description
   * The Elements that are found by the childSelectors configured by the Component Decorator
   */
  children: { [key in TComponentOptions["childrenSelectors"][number]]: Element[] };
  /**
   * @description
   * The complete Configuration passed to the Component Decorator.
   * Two underscores, because its not meant to be used outside of the framework
   */
  __options: TComponentOptions;
  /**
   * @description
   * A property that contains all listeners for component class initialization.
   * Two underscores, because its not meant to be used outside of the framework
   */
  // __componentClassInitializedListeners: ((componentObject: AbstractComponent) => void)[] = [];
}
