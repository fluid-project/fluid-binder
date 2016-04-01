/* globals fluid */
(function () {
    "use strict";
    var gpii = fluid.registerNamespace("gpii");

// Component to test support for checkboxes
    fluid.defaults("gpii.tests.binder.checkbox", {
        gradeNames: ["gpii.tests.binder.base"],
        model: {
            initFromModel: ["on"]
        },
        selectors: {
            array: "input[name='checkbox-groups']"
        },
        bindings: {
            initFromModel: {
                selector: "initFromModel",
                path:     "initFromModel"
            },
            initFromMarkup: {
                selector: "initFromMarkup",
                path:     "initFromMarkup"
            },
            updateFromModel: {
                selector: "updateFromModel",
                path:     "updateFromModel"
            },
            updateFromMarkup: {
                selector: "updateFromMarkup",
                path:     "updateFromMarkup"
            },
            array: {
                selector: "array",
                path:     "array"
            }
        }
    });

    fluid.defaults("gpii.binder.tests.checkbox.caseHolder", {
        gradeNames: ["gpii.binder.tests.caseHolder"],
        rawModules: [{
            tests: [
                {
                    name: "Confirm that a single form update to the 'checkbox' component results in a model update...",
                    sequence: [
                        {
                            func: "gpii.binder.tests.clickSelector",
                            args: [".viewport-checkbox input[name='update-from-markup']"]
                        },
                        {
                            func: "jqUnit.assertDeepEq",
                            args: ["The 'checkbox' field should have been updated based on a form change...", ["updated using form controls"], "{testEnvironment}.binder.model.updateFromMarkup"]
                        }
                    ]
                },
                {
                    name: "Confirm that ticking multiple items in an array of checkboxes results in a model update...",
                    sequence: [
                        {
                            func: "gpii.binder.tests.clickSelector",
                            args: ["#checkbox-group-foo"]
                        },
                        {
                            func: "gpii.binder.tests.clickSelector",
                            args: ["#checkbox-group-bar"]
                        },
                        {
                            func: "jqUnit.assertDeepEq",
                            args: ["The 'checkbox' array should have been updated based on form changes...", ["foo", "bar"], "{testEnvironment}.binder.model.array"]
                        }
                    ]
                },
                {
                    name: "Test updating 'checkbox' form value using model change applier...",
                    sequence: [
                        {
                            func:    "{testEnvironment}.binder.applier.change",
                            args:     ["updateFromModel", "updated using applier"]
                        },
                        {
                            func: "gpii.binder.tests.testElement",
                            args: ["assertDeepEq", "The 'checkbox' form field should have been updated with new model data...", ["updated using applier"], "[name='update-from-model']"] // (fnName, message, expected, selector)
                        }
                    ]
                },
                {
                    name: "Test updating an array of 'checkbox' form values using model change applier...",
                    sequence: [
                        {
                            func: "{testEnvironment}.binder.applier.change",
                            args: ["array", ["bar", "foo"]]
                        },
                        {
                            func: "gpii.binder.tests.testElement",
                            args: ["assertDeepEq", "The 'checkbox' form field should have been updated with new model data...", ["foo", "bar"], "[name='checkbox-groups']:checked"] // (fnName, message, expected, selector)
                        }
                    ]
                }
            ]
        }]
    });

    fluid.defaults("gpii.binder.tests.checkbox.environment", {
        gradeNames:       ["gpii.binder.tests.environment"],
        binderContainer:  ".viewport-checkbox",
        binderGradeNames: ["gpii.tests.binder.checkbox"],
        moduleMessage:    "Testing checkbox support...",
        components: {
            checkboxTests: {
                type: "gpii.binder.tests.checkbox.caseHolder"
            }
        }
    });

    gpii.binder.tests.checkbox.environment();
})();