// Adapted from node ./node_modules/istanbul/lib/cli.js report
/* eslint-env node */
"use strict";
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
        "report_file": outputFile
    }
});
module.exports = testemHarness.options.testemOptions;
