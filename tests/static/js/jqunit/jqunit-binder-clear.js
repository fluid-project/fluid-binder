/* globals fluid */
(function () {
    "use strict";
    var gpii = fluid.registerNamespace("gpii");

    fluid.defaults("gpii.tests.binder.toBeCleared", {
        gradeNames: ["fluid.viewComponent"],
        model: {
            toBeCleared: "Model value"
        },
        selectors: {
            toBeCleared: "[name='to-be-cleared']"
        },
        bindings: {
            toBeCleared: "toBeCleared"
        },
        listeners: {
            "onCreate.applyBinding": {
                funcName: "gpii.binder.applyBinding",
                args:     ["{that}"]
            }
        }
    });

    fluid.defaults("gpii.binder.tests.clear.caseHolder", {
        gradeNames: ["gpii.binder.tests.caseHolder"],
        rawModules: [{
            tests: [
                {
                    name: "Confirm that clearing out a text field sets the associated model value to `null`...",
                    sequence: [
                        {
                            func: "fluid.changeElementValue",
                            args: ["[name='to-be-cleared']", ""]
                        },
                        {
                            func: "jqUnit.assertEquals",
                            args: ["The model value should have been cleared out when we cleared the text field...", undefined, "{testEnvironment}.binder.model.toBeCleared"]
                        }
                    ]
                }
            ]
        }]
    });

    fluid.defaults("gpii.binder.tests.clear.environment", {
        gradeNames:       ["gpii.binder.tests.environment"],
        binderContainer:  ".viewport-toBeCleared",
        binderGradeNames: ["gpii.tests.binder.clear"],
        moduleMessage:    "Testing clearing an existing value...",
        components: {
            tests: {
                type: "gpii.binder.tests.clear.caseHolder"
            }
        }
    });

    gpii.binder.tests.clear.environment();
})();