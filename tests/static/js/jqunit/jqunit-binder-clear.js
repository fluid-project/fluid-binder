(function () {
    "use strict";

    fluid.defaults("gpii.tests.binder.toBeCleared", {
        gradeNames: ["gpii.binder.bindOnCreate"],
        model: {
            toBeCleared: "Model value"
        },
        selectors: {
            toBeCleared: "[name='to-be-cleared']"
        },
        bindings: {
            toBeCleared: {
                selector: "toBeCleared",
                path:     "toBeCleared",
                rules: {
                    domToModel: {
                        "": {
                            transform: {
                                type:      "gpii.binder.transforms.stripEmptyString",
                                inputPath: ""
                            }
                        }
                    }
                }
            }
        },
        components: {
            hasRelayedModel: {
                type: "fluid.modelComponent",
                options: {
                    model: "{toBeCleared}.model"
                }
            }
        }
    });

    fluid.defaults("gpii.tests.binder.clear.caseHolder", {
        gradeNames: ["gpii.tests.binder.caseHolder"],
        rawModules: [{
            name: "Testing clearing an existing model value from a text field...",
            tests: [
                {
                    name: "Confirm that clearing out a text field sets the associated model value to `null`...",
                    sequence: [
                        {
                            func: "jqUnit.assertEquals",
                            args: ["The initial model value should be correct...", "Model value", "{testEnvironment}.binder.model.toBeCleared"]
                        },
                        {
                            func: "jqUnit.assertEquals",
                            args: ["The initial model value should be correctly relayed...", "Model value", "{testEnvironment}.binder.hasRelayedModel.model.toBeCleared"]
                        },
                        {
                            func: "fluid.changeElementValue",
                            args: ["[name='to-be-cleared']", ""]
                        },
                        {
                            func: "jqUnit.assertEquals",
                            args: ["The model value should have been cleared out when we cleared the text field...", undefined, "{testEnvironment}.binder.model.toBeCleared"]
                        },
                        {
                            func: "jqUnit.assertEquals",
                            args: ["The model value deletion should have been relayed correctly...", undefined, "{testEnvironment}.binder.hasRelayedModel.model.toBeCleared"]
                        }
                    ]
                }
            ]
        }]
    });

    fluid.defaults("gpii.tests.binder.clear.environment", {
        gradeNames:       ["gpii.tests.binder.environment"],
        markupFixture:    ".viewport-clear",
        binderGradeNames: ["gpii.tests.binder.toBeCleared"],
        moduleName:       "Testing clearing an existing value",
        components: {
            tests: {
                type: "gpii.tests.binder.clear.caseHolder"
            }
        }
    });

    fluid.test.runTests("gpii.tests.binder.clear.environment");
})();
