/* eslint-env node */
"use strict";
var fluid = require("infusion");
var gpii  = fluid.registerNamespace("gpii");

require("../");
require("gpii-testem");

var outputFile = fluid.module.resolvePath("%gpii-binder/report.tap");

fluid.defaults("gpii.test.binder.testem", {
    gradeNames: ["gpii.testem"],
    istanbulCmd: "node node_modules/istanbul/lib/cli.js",
    sourceDirs: ["src"],
    testPages: [ "tests/static/all-tests.html"],
    coverageDir: "coverage",
    reportsDir: "reports",
    testemOptions: {
        "report_file": outputFile
    }
});

module.exports = gpii.test.binder.testem().getTestemOptions();
