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

1. To run unit tests, run `yarn test`. To run tests continuously, pass 
the `--watch` flag: `yarn test --watch`.

## Styles

This project utilizes [css-modules](https://github.com/css-modules/css-modules) with [postcss](https://postcss.org/) and [cssnext](http://cssnext.io/) plugins configured in the build step. CSS-modules provide scoped css class names that can be defined at a component level to provide isolated styles. 

CSSNext is configured to provide `@import` syntax, CSS variable naming conventions, as well as nesting.
