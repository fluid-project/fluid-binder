(function () {
    "use strict";

    // Test a mix of "long" and "short" notation. Also guards against a regression of merge policy issues addressed in GPII-4145.
    fluid.defaults("gpii.tests.binder.mixed", {
        gradeNames: ["gpii.tests.binder.long.startup"],
        bindings: {
            updateFromModel:  "updateFromModel",
            updateFromMarkup: "updateFromMarkup",
            missingElement:   "missingElement"
        }
    });

    fluid.defaults("gpii.tests.binder.mixed.environment", {
        gradeNames:       ["gpii.tests.binder.environment"],
        markupFixture:    ".viewport-mixed",
        binderGradeNames: ["gpii.tests.binder.mixed"],
        moduleName:       "Testing binder component (mixed notation)",
        components: {
            startupTests: {
                type: "gpii.tests.binder.caseHolder.startup"
            },
            simpleRelayTests: {
                type: "gpii.tests.binder.caseHolder.simpleRelay"
            }
        }
    });

    fluid.test.runTests("gpii.tests.binder.mixed.environment");
})();
