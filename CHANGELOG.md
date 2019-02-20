# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

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