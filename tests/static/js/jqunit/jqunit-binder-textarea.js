(function (fluid) {
    "use strict";

    // Component to test support for textarea elements
    fluid.defaults("fluid.tests.binder.textarea", {
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

    fluid.defaults("fluid.tests.binder.textarea.environment", {
        gradeNames:       ["fluid.tests.binder.environment"],
        markupFixture:    ".viewport-textarea",
        binderGradeNames: ["fluid.tests.binder.textarea"],
        moduleName:       "Testing textarea form inputs",
        components: {
            startupTests: {
                type: "fluid.tests.binder.caseHolder.startup"
            },
            simpleRelayTests: {
                type: "fluid.tests.binder.caseHolder.simpleRelay"
            }
        }
    });

    fluid.test.runTests("fluid.tests.binder.textarea.environment");
})(fluid);
