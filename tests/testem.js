/* eslint-env node */
"use strict";
var fluid = require("infusion");
var gpii  = fluid.registerNamespace("gpii");

require("../");
require("gpii-testem");

var outputFile = fluid.module.resolvePath("%gpii-binder/report.tap");

fluid.defaults("gpii.test.binder.testem", {
    gradeNames: ["gpii.testem"],
    sourceDirs: {
        src: "%gpii-binder/src"
    },
    contentDirs: {
        tests:   "%gpii-binder/tests"
    },
    testPages: ["tests/static/all-tests.html"],
    reportsDir: "%gpii-binder/reports",
    browserArgs: {
        // The `--headless` arg is needed until https://issues.gpii.net/browse/GPII-4145 is resolved.
        //
        // If you want to actually see the Firefox output, you'll need to run Testem manually, i.e.:
        // `node node_modules/testem/testem.js --file tests/testem.js`
        "Firefox": [
            "--no-remote",
            "--headless"
        ]
    },
    testemOptions: {
        "report_file": outputFile,
        "skip": "PhantomJS,Headless Chrome,Safari,IE"
    }
});

module.exports = gpii.test.binder.testem().getTestemOptions();
