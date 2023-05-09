/* global module */

let config = {
  'notGetBlocks': [
    'blocks-demo.html',
  ],
  'ignoredBlocks': [
    'no-js',
  ],
  'alwaysAddBlocks': [
    'sprite-svg',
    // 'sprite-png',
    // 'object-fit-polyfill',
  ],
  'addStyleBefore': [
    'src/scss/_tailwind-colours.scss',
    'src/scss/_tailwind-screens.scss',
    'src/scss/variables.scss',
    'src/scss/mixins.scss',
    // 'somePackage/dist/somePackage.css', // для 'node_modules/somePackage/dist/somePackage.css',
  ],
  'addStyleAfter': [
    // 'src/scss/print.scss',
  ],
  'addJsBefore': [
    // 'somePackage/dist/somePackage.js', // для 'node_modules/somePackage/dist/somePackage.js',
  ],
  'addJsAfter': [
    './script.js',
    './test.js'
  ],
  'addAssets': {
    'src/fonts/*.{woff,woff2,ttf,svg}': 'fonts/',
    'src/images/logo': 'images/logo/',
    'src/images/main-banner': 'images/main-banner/',
    'src/images/recent-cars': 'images/recent-cars/',
    'src/images/featured-cars': 'images/featured-cars/',
    'src/images/models': 'images/models/',
    'src/images/choose': 'images/choose/',
    'src/images/geography': 'images/geography/',
    'src/images/partner': 'images/partner/',
    'src/images/blog': 'images/blog/',
    'src/images/car-shop': 'images/car-shop/',
    'src/images/advantages': 'images/advantages/',
    'src/images/region-page': 'images/region-page/',
    'src/images/country-page': 'images/country-page/',
    'src/css/utils.css': 'css/',
    'src/js/utils.js': 'js/',
    // 'src/favicon/*.{png,ico,svg,xml,webmanifest}': 'img/favicon',
    // 'node_modules/somePackage/images/*.{png,svg,jpg,jpeg}': 'img/',
  },
  'dir': {
    'src': 'src/',
    'build': 'build/',
    'blocks': 'src/blocks/',
  }
};

module.exports = config;
