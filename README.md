# iizuna

> A TypeScript Framework for non-pwa pages

## Installation

```
npm install iizuna --save
```

### Node

```typescript
import "iizuna";
```

## Why not Angular, React, Vue.js etc?


Have you ever had to develop a project that you could not develop as a singe-page project?


I have encountered this problem many times already. Every time I wanted to use one of the above frameworks, but could not, because these are based on client-side rendering.

This framework is based on simple components, which can be set to an element via data attribute and thus extend this to various functionalities.


## Usage

First, the component must be declared. Here we declare a simple "scroll to top" button.

```typescript
// scroll-top.component.ts
import {AbstractComponent, Component, ElementAttribute, EventListener, smoothScroll} from "iizuna";

/**
 * Decorate the declared component class with the @Component decorator (the magic happens here)
 */
@Component({
	/**
	 * define the data- selector which should be used to identify the element
	 * (matches scroll-top and data-scroll-top)
	 */
	selector: 'scroll-top'
})
export class ScrollTopComponent extends AbstractComponent {

	/**
	 * Declare a class property and decorate it via the @ElementAttribute decorator which automatically retrieves the attribute value of the element on page load.
	 * (800 if the element would look like this <button scroll-top duration="800">To top!</button>)
	 *
	 * If the attribute is not specified, the default value (in this case 500) is used
	 */
	@ElementAttribute()
	protected duration = 500;

	/**
	 * Attach a simple click listener to the element.
	 *
	 * You can also define multiple listeners of the same kind if you specify the listener name as first argument for the @EventListener decorator like:
	 *
	 * @EventListener('click')
	 * public clickOne() {
	 * }
	 *
	 * @EventListener('click')
	 * public clickTwo() {
	 * }
	 *
	 */
	@EventListener()
	public click() {
		smoothScroll(0, +this.duration);
	}
}
```

Then we need to register the created component for bootstrapping.

```typescript
// main.ts
import {ComponentFactory} from "iizuna";
import {ScrollTopComponent} from "./scroll-top.component";

ComponentFactory.registerComponents([
	ScrollTopComponent
]);
```

Now we just have to define the html and call the page (after building the javascript of cause).

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"/>
    <title>TypeScript Components</title>
  </head>
<body>
	<button scroll-top duration="1000">To Top 1000ms</button>
  <script src="build.js"></script>
</body>
</html>
```

Take a look at [the examples](https://github.com/Nano1237/iizuna/tree/master/examples) if you want to see more advanced component configurations.

A documentation will follow soon to show you all programming possibilities.