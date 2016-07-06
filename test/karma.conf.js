// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-09-08 using
// generator-karma 1.0.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'public/assets/lib/jquery/dist/jquery.js',
      'public/assets/lib/angular/angular.js',
      'public/assets/lib/angular-animate/angular-animate.js',
      'public/assets/lib/angular-aria/angular-aria.js',
      'public/assets/lib/angular-cookies/angular-cookies.js',
      'public/assets/lib/angular-messages/angular-messages.js',
      'public/assets/lib/angular-resource/angular-resource.js',
      'public/assets/lib/angular-route/angular-route.js',
      'public/assets/lib/angular-sanitize/angular-sanitize.js',
      'public/assets/lib/angular-toastr/dist/angular-toastr.tpls.js',
      'public/assets/lib/angular-touch/angular-touch.js',
      'public/assets/lib/bootstrap/dist/js/bootstrap.js',
      'public/assets/lib/spin.js/spin.js',
      'public/assets/lib/angular-loading/angular-loading.js',
      'public/assets/lib/angular-mocks/angular-mocks.js',
      // endbower
      "public/app/**/*.js",
      "public/app/**/*.html",
      "public/app/*.js",
      "test/mock/**/*.js",
      "test/app/**/*.specs.js",
      "test/app/*.specs.js"
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine",
      'karma-ng-html2js-preprocessor' 
    ],

    preprocessors: { 
      'public/app/**/*.html': 'html2js' 
    }, 

    // ngHtml2JsPreprocessor: { 
    //   stripPrefix: 'public/', 
    //   moduleName: 'angularApp' 
    // },
    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
