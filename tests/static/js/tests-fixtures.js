/*

    A test environment, caseHolder, and reusable common tests for use in our test suite.

 */

/* globals fluid, $, jqUnit, QUnit */
"use strict";
var gpii = fluid.registerNamespace("gpii");

// Base viewComponent used in most tests.
fluid.defaults("gpii.tests.binder.base", {
    gradeNames: ["fluid.viewComponent"],
    model: {
        initFromModel:    "initialized from model" // The markup will be initialized with this value.
    },
    selectors: {
        initFromModel:    "[name='init-from-model']",
        initFromMarkup:   "[name='init-from-markup']",
        updateFromModel:  "[name='update-from-model']",
        updateFromMarkup: "[name='update-from-markup']",
        missingElement:   ".not-found-at-all"
    },
    listeners: {
        "onCreate.applyBinding": {
            funcName: "gpii.binder.applyBinding",
            args:     ["{that}"]
        }
    }
});

fluid.registerNamespace("gpii.binder.tests");

// Client-side function to retrieve a value by a selector from within an IoC test.
gpii.binder.tests.getElementValue = function (selector) {
    return fluid.value($(selector));
};

// Client-side function to click a selector
gpii.binder.tests.clickSelector = function (selector) {
    $(selector).click();
};

// Client side one-shot element test, which can use most jqUnit functions.
gpii.binder.tests.testElement = function (fnName, message, expected, selector) {
    var value = gpii.binder.tests.getElementValue(selector);
    jqUnit[fnName](message, expected, value);
};

fluid.registerNamespace("gpii.binder.tests.caseHolder");
gpii.binder.tests.caseHolder.prependModuleName = function (that) {
    if (that.options.modules) {
        return that.options.modules;
    }
    else if (that.options.rawModules) {
        if (that.options.moduleName) {
            var processedModules = [];
            fluid.each(that.options.rawModules, function (module) {
                var processedModule = fluid.copy(module);
                var processedTests = [];
                fluid.each(module.tests, function (testDef) {
                    var processedTest = fluid.copy(testDef);
                    processedTest.name = that.options.moduleName + ": " + testDef.name;
                    processedTests.push(processedTest);
                });
                processedModule.tests = processedTests;
                processedModules.push(processedModule);
            });

            return processedModules;
        }
        else {
            return that.options.rawModules;
        }
    }
};

// A common caseHolder for all tests.  As we reuse many of these tests, supports prepending an identifier to all tests
// names, which makes it easier to identify failures in a particular variation.
fluid.defaults("gpii.binder.tests.caseHolder", {
    gradeNames: ["fluid.test.testCaseHolder"],
    mergePolicy: {
        rawModules:    "noexpand"
    },
    moduleSource: {
        funcName: "gpii.binder.tests.caseHolder.prependModuleName",
        args:     ["{that}"]
    }
});

// Common tests to confirm that variables are populated correctly on startup...
fluid.defaults("gpii.binder.tests.caseHolder.startup", {
    gradeNames: ["gpii.binder.tests.caseHolder"],
    rawModules: [{
        name: "Common startup tests...",
        tests: [
            {
                name: "Confirm that bindings are passed correctly on initialization...",
                type: "test",
                sequence: [
                    {
                        func: "gpii.binder.tests.testElement",
                        args: ["assertEquals", "A form element with no markup value should be correctly initialized...", "initialized from model", "[name='init-from-model']"] // (fnName, message, expected, selector)
                    },
                    {
                        func: "jqUnit.assertEquals",
                        args: [ QUnit.config.currentModule + ": Model data should be correctly initialized from markup values...", "initialized from markup", "{testEnvironment}.binder.model.initFromMarkup"]
                    }
                ]
            }
        ]
    }]
});

// Common tests for many variations (form field type, etc.)
fluid.defaults("gpii.binder.tests.caseHolder.simpleRelay", {
    gradeNames: ["gpii.binder.tests.caseHolder"],
    rawModules: [
        {
            name: "Common tests for gpii-binder...",
            tests: [
                {
                    name: "Confirm that a form update results in a model update...",
                    type: "test",
                    sequence: [
                        {
                            func: "fluid.changeElementValue",
                            args: ["[name='update-from-markup']", "updated via form element"]
                        },
                        {
                            func: "jqUnit.assertEquals",
                            args: [ QUnit.config.currentModule + ": Model data should be correctly updated after a form field change...", "updated via form element", "{testEnvironment}.binder.model.updateFromMarkup"]
                        }
                    ]
                },
                {
                    name: "Confirm that a model update results in a form change...",
                    type: "test",
                    sequence: [
                        {
                            func: "{testEnvironment}.binder.applier.change",
                            args: ["updateFromModel", "updated from model"]
                        },
                        {
                            func: "gpii.binder.tests.testElement",
                            args: ["assertEquals", "A form element should be updated after a model change...", "updated from model", "[name='update-from-model']"] // (fnName, message, expected, selector)
                        }
                    ]
                }
            ]
        }
    ]
});

/*

    A test environment that lets us try variations on our component using different container and grade combinations.

 */
fluid.defaults("gpii.binder.tests.environment", {
    gradeNames: ["fluid.test.testEnvironment"],
    binderGradeNames: [],
    // If `moduleName` is set, distribute that to all caseHolders so that they can prepend it to their test names.
    distributeOptions: {
        source: "{that}.options.moduleName",
        target: "{that gpii.binder.tests.caseHolder}.options.moduleName"
    },
    components: {
        binder: {
            type:          "fluid.viewComponent",
            container:     "{gpii.binder.tests.environment}.options.markupFixture",
            options: {
                gradeNames: "{gpii.binder.tests.environment}.options.binderGradeNames"
            }
        }
    }
});