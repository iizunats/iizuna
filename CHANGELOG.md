# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [3.5.0]

### Added

- Simple Facade pattern
- "Example" Facade for caching (currently just a "VariableCache")

## [3.4.0]

### Added

- "registerComponentsOnce" method for the "ComponentFactory" which just registers components if they haven't already been registered

## [3.3.0]

### Added

- WindowEventListener Decorator (works like the `GlobalEventListener`, but `window` is used instead of `document`)
- Restriction feature that lets you know if a component is used on a wrong element.

### Changed

- Removing a lot of redundant code inside of the *EventListenerDecorator Classes. Keep an eye on these :/

## [3.2.0]

### Added
- Changelog
- Possibility to defined the "ElementAttribute" selectors in the HTML as kebab-case instead of camelcase. All of the following is now possible:

Attribute definition:
```typescript
class MyComponent{
  @ElementAttribute()
  myFancySelector: string = '';
}
```

HTML definition:
```html

<div data-myFancySelector="value">OLD</div>
<div myFancySelector="value">ALSO OLD</div>

<div data-my-fancy-selector="value">NEW</div>
<div my-fancy-selector="value">ALSO NEW</div>

```

- Template cache for Components with Template URL (see Issue #16)
- missing libs in tsconfig file