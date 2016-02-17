// Karma configuration
// Generated on Wed Jan 27 2016 22:36:57 GMT-0500 (Eastern Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jspm', 'jasmine'],


    // list of files / patterns to load in the browser
    files: [],

    // JSPM karma config
    jspm: {
        config: '_system.config.js',
        packages: 'lib/',
        loadFiles: ['app/**/*.spec.js'],
        serveFiles: ['app/**/!(*.spec).js']
    },

    proxies: {
        '/lib/': '/base/lib/',
        '/app/': '/base/app/'
    },


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'app/**/*.spec.js': ['babel'],
        'app/**/!(*.spec).js': ['babel', 'coverage']
    },

    babelPreprocessor: {
        options: {
            sourceMap: 'inline',
            retainLines: true
        },
        sourceFileName: function (file) {
            return file.originalPath;
        }
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],

    mochaReporter: {
        output: 'minimal'
    },

    coverageReporter: {
        instrumenters: {
            isparta: require('isparta')
        },
        instrumenter: {
            'app/**/!(*.spec).js': 'isparta'
        },
        dir: 'tests',
        reporters: [
            { type: 'html', subdir: 'coverage' },
            { type: 'text-summary', subdir: 'coverage' }
        ]
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
