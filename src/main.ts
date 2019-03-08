import "./polyfills/cutom-events"
import "./events/key.events";

/**
 * Component related structures
 */
export {AbstractComponent} from "./classes/abstract.component";
export {Component} from "./decorators/component.decorator";
export {ComponentFactory} from "./helpers/component.factory";
export {ComponentRegistry} from "./helpers/component.registry";
export {OnReady} from "./interfaces/on-ready.interface";
export {ConfigRegistry} from "./helpers/config.registry";
export {Template} from "./classes/template";
/**
 * Component decorating related structures
 */
export {Debounce} from "./decorators/debounce.decorator";
export {ElementAttribute} from "./decorators/element-attribute.decorator";
export {EventListener} from "./decorators/event-listener.decorator";
export {GlobalEventListener} from "./decorators/global-event-listener.decorator";
export {WindowEventListener} from "./decorators/window-event-listener.decorator";
/**
 * useful functions
 */
export {debounce} from "./helpers/debounce";
export {smoothScroll} from "./helpers/scroll";
/**
 * Other kind of helping structures
 */
export {AjaxHelper} from "./helpers/ajax-helper";
export {DomReady} from "./helpers/dom-ready";
export {EventHelper} from "./helpers/event-helper";
export {HtmlElementUtility} from "./helpers/html-element-utility";