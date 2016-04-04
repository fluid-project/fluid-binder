/* globals fluid */
(function () {
    "use strict";
    var gpii = fluid.registerNamespace("gpii");

    // Component to test support for select elements
    fluid.defaults("gpii.tests.binder.select", {
        gradeNames: ["gpii.tests.binder.base"],
        bindings: [
            {
                selector: "initFromModel",
                path:     "initFromModel"
            },
            {
                selector: "initFromMarkup",
                path:     "initFromMarkup"
            },
            {
                selector: "updateFromModel",
                path:     "updateFromModel"
            },
            {
                selector: "updateFromMarkup",
                path:     "updateFromMarkup"
            }
        ]
    });

    fluid.defaults("gpii.binder.tests.select.caseHolder", {
        gradeNames: ["gpii.binder.tests.caseHolder"],
        rawModules: [{
            tests: [
                {
                    name: "Confirm that a form update results in a model update...",
                    type: "test",
                    sequence: [
                        {
                            func: "fluid.changeElementValue",
                            args: ["[name='update-from-markup']", "updated using form controls"]
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

    fluid.defaults("gpii.binder.tests.select.environment", {
        gradeNames:       ["gpii.binder.tests.environment"],
        binderContainer:  ".viewport-select",
        binderGradeNames: ["gpii.tests.binder.select"],
        moduleName:       "Testing select form inputs",
        components: {
            startupTests: {
                type: "gpii.binder.tests.caseHolder.startup"
            },
            selectTests: {
                type: "gpii.binder.tests.select.caseHolder"
            }
        }
    });

    gpii.binder.tests.select.environment();
})();