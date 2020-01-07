(function () {
    "use strict";

    fluid.defaults("gpii.tests.binder.long.startup", {
        gradeNames: ["gpii.tests.binder.base"],
        bindings: {
            initFromModel: {
                selector: "initFromModel",
                path:     "initFromModel"
            },
            initFromMarkup: {
                selector: "initFromMarkup",
                path:     "initFromMarkup"
            }
        }
    });

    // Component to test "long notation".   Also guards against a regression of merge policy issues addressed in GPII-4145.
    fluid.defaults("gpii.tests.binder.long", {
        gradeNames: ["gpii.tests.binder.long.startup"],
        bindings: {
            updateFromModel: {
                selector: "updateFromModel",
                path:     "updateFromModel"
            },
            updateFromMarkup: {
                selector: "updateFromMarkup",
                path:     "updateFromMarkup"
            },
            missingElement: {
                selector: "missingElement",
                path:     "missingElement"
            }
        }
    });

    fluid.defaults("gpii.tests.binder.long.environment", {
        gradeNames:       ["gpii.tests.binder.environment"],
        markupFixture:    ".viewport-long",
        binderGradeNames: ["gpii.tests.binder.long"],
        moduleName:       "Testing binder component (long notation)",
        components: {
            startupTests: {
                type: "gpii.tests.binder.caseHolder.startup"
            },
            simpleRelayTests: {
                type: "gpii.tests.binder.caseHolder.simpleRelay"
            }
        }
    });

    fluid.test.runTests("gpii.tests.binder.long.environment");
})();
