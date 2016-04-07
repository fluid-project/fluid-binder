/* globals fluid */
(function () {
    "use strict";
    var gpii = fluid.registerNamespace("gpii");

    // Component to test support for radio buttons
    fluid.defaults("gpii.tests.binder.radio", {
        gradeNames: ["gpii.tests.binder.base"],
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
            }
        }
    });

    fluid.defaults("gpii.binder.tests.radio.caseHolder", {
        gradeNames: ["gpii.binder.tests.caseHolder"],
        rawModules: [{
            tests: [
                {
                    name: "Confirm that a form update results in a model update...",
                    type: "test",
                    sequence: [
                        {
                            func: "gpii.binder.tests.clickSelector",
                            args: ["#update-from-markup-markup"]
                        },
                        {
                            func: "jqUnit.assertEquals",
                            args: ["Model data should be correctly updated after a form field change...", "updated using form controls", "{testEnvironment}.binder.model.updateFromMarkup"]
                        }
                    ]
                },
                {
                    name: "Confirm that a model update results in a form change...",
                    type: "test",
                    sequence: [
                        {
                            func: "{testEnvironment}.binder.applier.change",
                            args: ["updateFromModel", "updated using applier"]
                        },
                        {
                            func: "gpii.binder.tests.testElement",
                            args: ["assertEquals", "A form element should be updated after a model change...", "updated using applier", "[name='update-from-model']"] // (fnName, message, expected, selector)
                        }
                    ]
                }
            ]
        }]
    });

    fluid.defaults("gpii.binder.tests.radio.environment", {
        gradeNames:       ["gpii.binder.tests.environment"],
        markupFixture:    ".viewport-radio",
        binderGradeNames: ["gpii.tests.binder.radio"],
        moduleName:       "Testing radio button support",
        components: {
            startupTests: {
                type: "gpii.binder.tests.caseHolder.startup"
            },
            radioTests: {
                type: "gpii.binder.tests.radio.caseHolder"
            }
        }
    });

    gpii.binder.tests.radio.environment();
})();