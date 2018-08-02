# Native App

## Table of Contents

* [Requirements](#markdown-header-requirements)
* [Setup and Installation](#markdown-header-setup-and-installation)
* [Running the Development Environment](#markdown-header-running-the-development-environment)
* [Building a Production Build](#markdown-header-building-a-production-build)
* [Code Quality (Linting)](#markdown-header-code-quality-linting)
* [Testing](#markdown-header-testing)
    * [Unit Testing](#markdown-header-unit-testing)
        * [Using `buildComponent`](#markdown-header-using-buildcomponent)
* [Styles](#markdown-header-styles)
    * [PostCSS Plugins](#markdown-header-postcss-plugins)

***

## Requirements

* node `^8.0.0`
* yarn `^1.7.0`

## Setup and Installation
1. Clone this repo
2. Install dependencies

    ```
    $ yarn install
    ```

3. Copy sample .env.sample to .env.|ENVIRONMENT_NAME|

    **Note**: Ensure your `.env` file is up to date with the latest `.env.sample` file. New environment variables may 
    have been changed or added, which could result in a bad build.
 
    ```
    $ cp .env.sample .env
    ```
    
4. Make any necessary environment variable changes

## Running the Development Environment

After dependencies have been installed and an `.env` file has been created, run `yarn start`

**Note**: To run this project without an `.env` file, variables can be set in the CLI:

```
$ REACT_APP_API_HOST=http://localhost REACT_APP_API_PORT=3004 yarn start
```

## Building a Production Build

Run `yarn build`:

  * The build task runs prebuild steps: 
      * `clean` (which refreshes the `build/` directory)
      * `lint` lints the `src`, `scripts`, `config`, and `test` directories

## Code Quality (Linting)

This project is configured with [eslint](https://eslint.org/) and [prettier](https://prettier.io/) to lint JavaScript files,
and [Stylelint](http://stylelint.io/) to lint CSS files. To run the lint task, use `yarn lint`. For simple lint fixes,
the `--fix` flag can also be passed: `yarn lint --fix`

The project is configured with git precommit hooks via [`husky`](https://github.com/typicode/husky) and [`lint-staged`](https://www.npmjs.com/package/lint-staged) to ensure code quality on each commit.

If a commit fails, eslint and stylelint should be checked. On commit, `eslint` is run first against all JavaScript files, followed by `stylelint` on all CSS files. Eslint's `--fix` flag is **not** run for errors on commit; errors should be
fixed manually. To reduce the risk of failed commits, `eslint` should be run before checking in code. Run lint rules 
on the entire project directly:

* `yarn lint` -- on all JavaScript and CSS files
* `yarn lint:js` -- run the lint on all JavaScript files
* `yarn lint:css` -- run the linter on all CSS files

Set up auto-linting and prettier to be run on file save or in real-time in your IDE: [WebStorm](https://prettier.io/docs/en/webstorm.html) || 
[VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode). 


## Testing

### Unit testing

The project uses [Jest](https://jestjs.io/en/) as the test suite, [Enzyme](http://airbnb.io/enzyme/) for testing 
React components, and [Instanbul](https://istanbul.js.org/) for coverage reports.

1. Run `yarn test` to run unit tests. By default, tests are run in a watch mode.
2. To run a coverage report, add the `--coverage` flag: `yarn test --coverage`.

Test configuration is established in `/test/config/setup.js`. This configuration includes setting up Enzyme's React 16
Adapter, exposing Enzyme's `shallow`, `mount`, and `render` globally to avoid repetitive imports. Additionally, there's a
global helper method to simplify creating new components with Enzyme: `buildComponent()`.

#### Using `buildComponent`

`buildComponent` takes 3 arguments: 

* `Component` - the component being rendered
* `props` - the props object of the component
* `render` - The Enzyme render method to use (defaults to `shallow`)

`buildComponent` is exposed globally for the test suite, so it is not necessary to import into your test file. Because
the `jsx` is defined in the test configuration, there's no need to import `React` into your unit tests.

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

### PostCSS Plugins

* [postcss-import](https://github.com/postcss/postcss-import) - allows the use of `@import` syntax inside the css files to provide partials support
* [postcss-extend-rule](https://github.com/jonathantneal/postcss-extend-rule) - provides `@extend` syntax with decorators
* [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties) - provides CSS variable support
* [postcss-color-mod-function](https://github.com/jonathantneal/postcss-color-mod-function) - custom color modification, similar to SASS and LESS color modifications
* [postcss-preset-env](https://github.com/csstools/postcss-preset-env) - polyfill to provide browser support for future css syntax

Further reading: [An Introduction to PostCSS](https://www.sitepoint.com/an-introduction-to-postcss/)
