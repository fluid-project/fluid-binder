// Adapted from node ./node_modules/istanbul/lib/cli.js report
/* eslint-env node */
"use strict";
// If we use python to host this directory, this file will be loaded from the browser.  To avoid this, we "gate"
// The body of the script behind a check to see if `require` exists.
if (require) {
    var fluid = require("infusion");
    var gpii  = fluid.registerNamespace("gpii");

    require("./index");

    gpii.binder.loadTestingSupport();

    var outputFile = fluid.module.resolvePath("%gpii-binder/report.tap");

    var testemHarness = gpii.test.testem({
        testPages: [ "tests/static/all-tests.html" ],
        testemOptions: {
            "framework":   "qunit",
            "parallel":    1,
            "report_file": outputFile,
            "routes": {
                "/src": "instrumented",
                "/testem.js": "/"
            }
        }
    });
    module.exports = testemHarness.options.testemOptions;
}
