(function () {
    "use strict";

    // Component to test support for radio buttons
    fluid.defaults("fluid.tests.binder.radio", {
        gradeNames: ["fluid.tests.binder.base"],
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

    fluid.defaults("fluid.tests.binder.radio.caseHolder", {
        gradeNames: ["fluid.tests.binder.caseHolder"],
        rawModules: [{
            name: "Testing support for radio buttons...",
            tests: [
                {
                    name: "Confirm that a form update results in a model update...",
                    type: "test",
                    sequence: [
                        {
                            func: "fluid.tests.binder.clickSelector",
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
                            func: "fluid.tests.binder.testElement",
                            args: ["assertEquals", "A form element should be updated after a model change...", "updated using applier", "[name='update-from-model']"] // (fnName, message, expected, selector)
                        }
                    ]
                }
            ]
        }]
    });

    fluid.defaults("fluid.tests.binder.radio.environment", {
        gradeNames:       ["fluid.tests.binder.environment"],
        markupFixture:    ".viewport-radio",
        binderGradeNames: ["fluid.tests.binder.radio"],
        moduleName:       "Testing radio button support",
        components: {
            startupTests: {
                type: "fluid.tests.binder.caseHolder.startup"
            },
            radioTests: {
                type: "fluid.tests.binder.radio.caseHolder"
            }
        }
    });

    fluid.test.runTests("fluid.tests.binder.radio.environment");
})();
