(function () {
    "use strict";

    // Component to test support for arrays
    fluid.defaults("fluid.tests.binder.array", {
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

    fluid.defaults("fluid.tests.binder.array.environment", {
        gradeNames:       ["fluid.tests.binder.environment"],
        markupFixture:    ".viewport-array",
        binderGradeNames: ["fluid.tests.binder.array"],
        moduleName:       "Testing array notation",
        components: {
            startupTests: {
                type: "fluid.tests.binder.caseHolder.startup"
            },
            simpleRelayTests: {
                type: "fluid.tests.binder.caseHolder.simpleRelay"
            }
        }
    });

    fluid.test.runTests("fluid.tests.binder.array.environment");
})();
