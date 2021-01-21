/*

    A test environment, caseHolder, and reusable common tests for use in our test suite.

 */
/* eslint-env browser */
/* globals jqUnit, QUnit */
(function (fluid, $, jqUnit, QUnit) {
    "use strict";
    fluid.registerNamespace("fluid.tests.binder.base");

    fluid.tests.binder.base.tallyUpdates = function (that, path) {
        fluid.log("tallying a model change to '" + path + "'.");
        var currentCount = fluid.get(that.updateCounter, path) || 0;
        currentCount++;
        fluid.set(that.updateCounter, path, currentCount);
    };

    // Base viewComponent used in most tests.
    fluid.defaults("fluid.tests.binder.base", {
        gradeNames: ["fluid.binder.bindOnCreate"],
        model: {
            initFromModel:    "initialized from model" // The markup will be initialized with this value.
        },
        members: {
            updateCounter: {}
        },
        selectors: {
            initFromModel:    "[name='init-from-model']",
            initFromMarkup:   "[name='init-from-markup']",
            updateFromModel:  "[name='update-from-model']",
            updateFromMarkup: "[name='update-from-markup']",
            missingElement:   ".not-found-at-all"
        },
        modelListeners: {
            "*": {
                funcName: "fluid.tests.binder.base.tallyUpdates",
                args: ["{that}", "{change}.path"]
            }
        }
    });

    fluid.registerNamespace("fluid.tests.binder");

    // Client-side function to retrieve a value by a selector from within an IoC test.
    fluid.tests.binder.getElementValue = function (selector) {
        return fluid.value($(selector));
    };

    // Client-side function to click a selector
    fluid.tests.binder.clickSelector = function (selector) {
        $(selector).click();
    };

    // Client-side function to keydown a selector
    gpii.tests.binder.keydownSelector = function (selector) {
        $(selector).keydown();
    };

    // Client side one-shot element test, which can use most jqUnit functions.
    fluid.tests.binder.testElement = function (fnName, message, expected, selector) {
        var value = fluid.tests.binder.getElementValue(selector);
        jqUnit[fnName](message, expected, value);
    };

    fluid.registerNamespace("fluid.tests.binder.caseHolder");
    fluid.tests.binder.caseHolder.prependModuleName = function (that) {
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
    fluid.defaults("fluid.tests.binder.caseHolder", {
        gradeNames: ["fluid.test.testCaseHolder"],
        mergePolicy: {
            rawModules:    "noexpand"
        },
        moduleSource: {
            funcName: "fluid.tests.binder.caseHolder.prependModuleName",
            args:     ["{that}"]
        }
    });

    // Common tests to confirm that variables are populated correctly on startup...
    fluid.defaults("fluid.tests.binder.caseHolder.startup", {
        gradeNames: ["fluid.tests.binder.caseHolder"],
        rawModules: [{
            name: "Common startup tests...",
            tests: [
                {
                    name: "Confirm that bindings are passed correctly on initialization...",
                    type: "test",
                    sequence: [
                        {
                            func: "fluid.tests.binder.testElement",
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
    fluid.defaults("fluid.tests.binder.caseHolder.simpleRelay", {
        gradeNames: ["fluid.tests.binder.caseHolder"],
        rawModules: [
            {
                name: "Common tests for fluid-binder...",
                tests: [
                    {
                        name: "Confirm that a form update results in a single model update...",
                        type: "test",
                        sequence: [
                            // The value should have been changed once based on the value of the markup.
                            {
                                funcName: "jqUnit.assertEquals",
                                args: ["There should have been one initial model relay to populate the field.", 1, "{testEnvironment}.binder.updateCounter.updateFromMarkup"]
                            },
                            {
                                func: "fluid.changeElementValue",
                                args: ["[name='update-from-markup']", "updated via form element"]
                            },
                            {
                                func: "jqUnit.assertEquals",
                                args: [ QUnit.config.currentModule + ": Model data should be correctly updated after a form field change...", "updated via form element", "{testEnvironment}.binder.model.updateFromMarkup"]
                            },
                            // The tally should now indicate that the value has been updated twice.
                            {
                                funcName: "jqUnit.assertEquals",
                                args: ["There should have been one additional model relay based on the form change.", 2, "{testEnvironment}.binder.updateCounter.updateFromMarkup"]
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
                                func: "fluid.tests.binder.testElement",
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
    fluid.defaults("fluid.tests.binder.environment", {
        gradeNames: ["fluid.test.testEnvironment"],
        binderGradeNames: [],
        // If `moduleName` is set, distribute that to all caseHolders so that they can prepend it to their test names.
        distributeOptions: {
            source: "{that}.options.moduleName",
            target: "{that fluid.tests.binder.caseHolder}.options.moduleName"
        },
        components: {
            binder: {
                type:      "fluid.viewComponent",
                container: "{fluid.tests.binder.environment}.options.markupFixture",
                options: {
                    gradeNames: "{fluid.tests.binder.environment}.options.binderGradeNames"
                }
            }
        }
    });
})(fluid, $, jqUnit, QUnit);
