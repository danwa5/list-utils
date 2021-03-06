# clippy

This is a Vue.js 2+ application that allows a user to easily modify the delimiter in a list of items.
A common use case is copying a column of results from Sequel Pro or Google Spreadsheet and then
transforming it to a comma-delimited string to be used in a SQL query. There are options to remove
blank and duplicate items and enclose items in quotes.

## Prerequisites

- [Yarn](https://classic.yarnpkg.com/en/)
- [Vue CLI](https://cli.vuejs.org/)
- [Webpack](https://webpack.js.org/)

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

## Running tests

### Lints and fixes files
```
yarn lint
```

### Run end-to-end tests
```
yarn run cypress:open
```

## Important

- To optimize performance, this app is configured to only import the Bootstrap components
that it uses. However, Webpack 4 typically only [tree shakes](https://webpack.js.org/guides/tree-shaking/#conclusion) in production mode. Your bundle size will depend on the mode you're using.

- For insight into the contents of your bundle package, take a look at the [Webpack Bundle Analyzer](https://github.com/mrbbot/vue-cli-plugin-webpack-bundle-analyzer) results.