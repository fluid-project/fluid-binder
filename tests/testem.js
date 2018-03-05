/* eslint-env node */
"use strict";
var fluid = require("infusion");
var gpii  = fluid.registerNamespace("gpii");

require("../");
require("gpii-testem");

var outputFile = fluid.module.resolvePath("%gpii-binder/report.tap");

fluid.defaults("gpii.test.binder.testem", {
    gradeNames: ["gpii.testem"],
    sourceDirs: { src: "%gpii-binder/src" },
    testPages: ["tests/static/all-tests.html"],
    reportsDir: "%gpii-binder/reports",
    testemOptions: {
        "report_file": outputFile
    }
});

module.exports = gpii.test.binder.testem().getTestemOptions();
