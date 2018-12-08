# iizuna 
[![Build Status](https://travis-ci.com/Nano1237/iizuna.svg?branch=master)](https://travis-ci.com/Nano1237/iizuna)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Nano1237/iizuna.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Nano1237/iizuna/context:javascript)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/Nano1237/iizuna.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Nano1237/iizuna/alerts/)
[![NPM version](https://img.shields.io/npm/v/iizuna.svg)](https://www.npmjs.org/package/iizuna)
[![Donate](https://img.shields.io/badge/donorbox-donate-blue.svg)](https://donorbox.org/iizuna)


pronunciation: <span style="color:gray;">[Īdzuna]</span>

> We’re not designing pages, **we’re designing systems of components.** — [Stephen Hay](http://bradfrost.com/blog/post/bdconf-stephen-hay-presents-responsive-design-workflow/)

*Iizuna is available for use under the MIT software license.*

*You can report bugs and discuss features on the GitHub issues page.*

*To dive into the development you can take a look at [the sample page](https://github.com/Nano1237/iizuna/tree/examples).*
*There you will find some simple example components and a ready to use build process.*

[**Our wiki with the documentation can be found here.**](https://github.com/Nano1237/iizuna/wiki)

## Installation

```
npm install iizuna --save
```


## What ist iizuna?

Iizuna came from the idea of ​​designing a truly developer-friendly framework.
Many of today's TypeScript frameworks, such as Angular or React, are not designed to be used on pages that rely on old-fashioned server-side rendering.

This framework is really easy to use because it basically consists of only one building block, the component.

These components reflect rough HTML elements.
Selectors (currently only data-attributes) define which elements are decorated with the business-logic you develop.

Additional attributes allow additional configuration of the components, making them easily reusable.


## Wordings

First of all a few explanations to some of the words used in this framework.

### Component
The **class** containing the business logic. Not to be confused with the **Individual-Component**.

### Individual-Component
The **objects** instantiated based by the **Component** they are descendants of.
For each matching element on the page, which matches the component selector, a **Individual-Component** is created.

### Global Events
**CustomEvents** which are dispatched directly to the **document**.


## Usage

First, a component must be declared. Here we declare a simple "scroll to top" button.

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

Take a look at [the examples](https://github.com/Nano1237/iizuna/tree/examples) if you want to see more advanced component configurations.