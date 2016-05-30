/* globals fluid, jqUnit */
(function () {
    "use strict";
    var gpii = fluid.registerNamespace("gpii");

// Component to test support for encoded "typed" data
    fluid.defaults("gpii.tests.binder.encoding", {
        gradeNames: ["fluid.viewComponent"],
        model: {
        },
        selectors: {
            "number-from-markup": "[name='number-from-markup']",
            "number-select":      ".number-select",
            "false-from-markup":  "[name='false-from-markup']",
            "zero-from-markup":   "[name='zero-from-markup']",
            "null-from-markup":   "[name='null-from-markup']",
            "falsy-select":       ".falsy-select",
            "object-from-markup": "[name='object-from-markup']",
            "array-from-markup":  "[name='array-from-markup']"
        },
        bindings: {
            "number-from-markup": "number-from-markup",
            "number-select":      "number-select",
            "false-from-markup":  "false-from-markup",
            "zero-from-markup":   "zero-from-markup",
            "null-from-markup":   "null-from-markup",
            "falsy-select":       "falsy-select",
            "object-from-markup": "object-from-markup",
            "array-from-markup":  "array-from-markup"
        },
        listeners: {
            "onCreate.applyBinding": {
                funcName: "gpii.binder.applyBinding",
                args:     ["{that}"]
            }
        }
    });

    fluid.defaults("gpii.tests.binder.encoding.caseHolder", {
        gradeNames: ["gpii.tests.binder.caseHolder"],
        rawModules: [{
            name: "Testing support for encoding non-string data...",
            tests: [
                {
                    name: "Encoded variables in the initial markup should be passed to the model correctly...",
                    sequence: [
                        {
                            func: "jqUnit.assertEquals",
                            args: ["A number in the initial markup should be a number in the model...", 3, "{testEnvironment}.binder.model.number-from-markup"]
                        },
                        {
                            func: "jqUnit.assertEquals",
                            args: ["A false value in the initial markup should be false in the model...", false, "{testEnvironment}.binder.model.false-from-markup"]
                        },
                        {
                            func: "jqUnit.assertEquals",
                            args: ["A zero in the initial markup should be a number in the model...", 0, "{testEnvironment}.binder.model.zero-from-markup"]
                        },
                        {
                            func: "jqUnit.assertEquals",
                            args: ["A null value in the initial markup should be null in the model...", null, "{testEnvironment}.binder.model.null-from-markup"]
                        },
                        {
                            func: "jqUnit.assertDeepEq",
                            args: ["An array in the initial markup should be an object in the model...", ["foo", "bar"], "{testEnvironment}.binder.model.array-from-markup"]
                        },
                        {
                            func: "jqUnit.assertDeepEq",
                            args: ["An object in the initial markup should be an object in the model...", { "foo": "bar"}, "{testEnvironment}.binder.model.object-from-markup"]
                        }
                    ]
                },
                {
                    name: "Confirm that picking a numeric value from a list results in a model update...",
                    type: "test",
                    sequence: [
                        {
                            func: "fluid.changeElementValue",
                            args: [".number-select", 2]
                        },
                        {
                            func: "jqUnit.assertEquals",
                            args: ["The model data should be set to the correct number...", 2, "{testEnvironment}.binder.model.number-select"]
                        }
                    ]
                },
                {
                    name: "Confirm that setting a number value via a model update results in a form change...",
                    type: "test",
                    sequence: [
                        {
                            func: "{testEnvironment}.binder.applier.change",
                            args: ["number-select", 1]
                        },
                        {
                            func: "gpii.tests.binder.testElement",
                            args: ["assertEquals", "The form element should have been updated...", "1", ".number-select"] // (fnName, message, expected, selector)
                        }
                    ]
                },
                {
                    name: "Confirm that picking a 'falsy' value from a list results in a model update...",
                    type: "test",
                    sequence: [
                        // NOTE: This must be a string because jQuery's val() function works with strings, arrays, and objects, but not `false`.
                        {
                            func: "fluid.changeElementValue",
                            args: [".falsy-select", "false"]
                        },
                        {
                            func: "jqUnit.assertEquals",
                            args: ["The model data should be set to 'false'...", false, "{testEnvironment}.binder.model.falsy-select"]
                        },
                        {
                            func: "fluid.changeElementValue",
                            args: [".falsy-select", 0]
                        },
                        {
                            func: "jqUnit.assertEquals",
                            args: ["The model data should be set to zero...", 0, "{testEnvironment}.binder.model.falsy-select"]
                        },
                        {
                            func: "fluid.changeElementValue",
                            args: [".falsy-select", null]
                        },
                        {
                            func: "jqUnit.assertEquals",
                            args: ["The model data should be set to undefined...", undefined, "{testEnvironment}.binder.model.falsy-select"]
                        }
                    ]
                },
                {
                    name: "Confirm that setting a 'falsy' value via a model update results in a form change...",
                    type: "test",
                    sequence: [
                        {
                            func: "{testEnvironment}.binder.applier.change",
                            args: ["falsy-select", false]
                        },
                        {
                            func: "gpii.tests.binder.testElement",
                            args: ["assertEquals", "The form element should have been updated...", "false", ".falsy-select"] // (fnName, message, expected, selector)
                        }
                    ]
                }
            ]
        }]
    });

    fluid.defaults("gpii.tests.binder.encoding.environment", {
        gradeNames:       ["gpii.tests.binder.environment"],
        markupFixture:    ".viewport-encoding",
        binderGradeNames: ["gpii.tests.binder.encoding"],
        moduleName:       "Testing encoding support",
        components: {
            encodingTests: {
                type: "gpii.tests.binder.encoding.caseHolder"
            }
        }
    });
    jqUnit.module("foo");
    gpii.tests.binder.encoding.environment();
})();