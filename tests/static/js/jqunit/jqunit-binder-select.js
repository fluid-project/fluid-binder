(function () {
    "use strict";

    // Component to test support for select elements
    fluid.defaults("fluid.tests.binder.select", {
        gradeNames: ["fluid.tests.binder.base"],
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

    fluid.defaults("fluid.tests.binder.select.caseHolder", {
        gradeNames: ["fluid.tests.binder.caseHolder"],
        rawModules: [{
            name: "Testing support for select elements...",
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
                            func: "fluid.tests.binder.testElement",
                            args: ["assertEquals", "A form element should be updated after a model change...", "updated using applier", "[name='update-from-model']"] // (fnName, message, expected, selector)
                        }
                    ]
                }
            ]
        }]
    });

    fluid.defaults("fluid.tests.binder.select.environment", {
        gradeNames:       ["fluid.tests.binder.environment"],
        markupFixture:    ".viewport-select",
        binderGradeNames: ["fluid.tests.binder.select"],
        moduleName:       "Testing select form inputs",
        components: {
            startupTests: {
                type: "fluid.tests.binder.caseHolder.startup"
            },
            selectTests: {
                type: "fluid.tests.binder.select.caseHolder"
            }
        }
    });

    fluid.test.runTests("fluid.tests.binder.select.environment");
})();
