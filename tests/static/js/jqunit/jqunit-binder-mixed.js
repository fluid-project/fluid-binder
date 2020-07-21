(function () {
    "use strict";

    // Test a mix of "long" and "short" notation. Also guards against a regression of merge policy issues addressed in fluid-4145.
    fluid.defaults("fluid.tests.binder.mixed", {
        gradeNames: ["fluid.tests.binder.long.startup"],
        bindings: {
            updateFromModel:  "updateFromModel",
            updateFromMarkup: "updateFromMarkup",
            missingElement:   "missingElement"
        }
    });

    fluid.defaults("fluid.tests.binder.mixed.environment", {
        gradeNames:       ["fluid.tests.binder.environment"],
        markupFixture:    ".viewport-mixed",
        binderGradeNames: ["fluid.tests.binder.mixed"],
        moduleName:       "Testing binder component (mixed notation)",
        components: {
            startupTests: {
                type: "fluid.tests.binder.caseHolder.startup"
            },
            simpleRelayTests: {
                type: "fluid.tests.binder.caseHolder.simpleRelay"
            }
        }
    });

    fluid.test.runTests("fluid.tests.binder.mixed.environment");
})();
