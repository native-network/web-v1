# Native App

## Set up and installation

1. Clone this repo
2. Run `yarn` to install dependencies

## Running a development environment

1. After dependencies have been installed, run `yarn start`

## Building a production build

1. Run `yarn build`

## Testing

### Unit testing

The project uses [Jest](https://jestjs.io/en/) as the test suite, [Enzyme](http://airbnb.io/enzyme/) for testing 
React components, and [Instanbul](https://istanbul.js.org/) for coverage reports.

1. Run `yarn test` to run unit tests. By default, tests are run in a watch mode.
1. To run a coverage report, add the `--coverage` flag: `yarn test --coverage`.

Test configuration is established in `/test/config/setup.js`. This configuration includes setting up Enzyme's React 16
Adapter, exposing Enzyme's `shallow`, `mount`, and `render` globally to avoid repetitive imports. Additionally, there's a
global helper method to simplify creating new components with Enzyme: `buildComponent()`.

#### Using `buildComponent`

`buildComponent` takes 3 arguments: 

* `Component` - the component being rendered
* `props` - the props needed for the component
* `render` - The Enzyme render method to use (defaults to `shallow`)

`buildComponent` is exposed globally for the test suite, so it is not necessary to import into your test file. 

Sample Usage:

```js

import { Component } from 'path/to/your/component.jsx'

describe('Component', () => {
  let wrapper;

  beforeEach(() => {
    // Assuming this component does not need any props
    // and you'd like a shallow render
    wrapper = buildComponent(Component);
  });

  it('does something', () => {
    expect(Component).toHaveLength(1);
  });

  // overwrite render for a specific test
  it('mounts', () => {
    wrapper = buildComponent(Component, {}, mount);

    // wrapper is now using enzyme's `mount`
    expect(Component).toHaveLength(1);
  });
});

```

## Styles

This project utilizes [css-modules](https://github.com/css-modules/css-modules) with [postcss](https://postcss.org/) and
[cssnext](http://cssnext.io/) plugins configured in the build step. CSS-modules provide scoped css class names that can 
be defined at a component level to provide isolated styles. 

CSSNext is configured to provide `@import` syntax, CSS variable naming conventions, as well as nesting.
