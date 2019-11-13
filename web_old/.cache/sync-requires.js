const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/thomas/code/also-adventure/web/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/thomas/code/also-adventure/web/src/pages/404.js"))),
  "component---src-pages-archive-js": hot(preferDefault(require("/Users/thomas/code/also-adventure/web/src/pages/archive.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/thomas/code/also-adventure/web/src/pages/index.js")))
}

