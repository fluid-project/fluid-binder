// Adapted from node ./node_modules/istanbul/lib/cli.js report
"use strict";
var fluid = require("infusion");
var gpii  = fluid.registerNamespace("gpii");

require("./index");

gpii.binder.loadTestingSupport();

var outputFile = fluid.module.resolvePath("%gpii-binder/report.tap");

var testemHarness = gpii.test.testem.instrumented({
    testPages: [
        "%gpii-binder/tests/static/tests-binder-array.html",
        "%gpii-binder/tests/static/tests-binder-bindOnDomChange.html",
        "%gpii-binder/tests/static/tests-binder-checkbox.html",
        "%gpii-binder/tests/static/tests-binder-clear.html",
        // Currently testing this with Karma, which requires non-trivial changes that would prevent it from working here.
        // "tests/static/tests-binder-encoding.html",
        "%gpii-binder/tests/static/tests-binder-long.html",
        "%gpii-binder/tests/static/tests-binder-radio.html",
        "%gpii-binder/tests/static/tests-binder-select.html",
        "%gpii-binder/tests/static/tests-binder-short.html",
        "%gpii-binder/tests/static/tests-binder-textarea.html"
    ],
    testemOptions: {
        "framework":   "qunit",
        "parallel":    5,
        "report_file": outputFile
    }
});
module.exports = testemHarness.options.testemOptions;