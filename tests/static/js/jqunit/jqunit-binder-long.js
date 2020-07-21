(function () {
    "use strict";

    fluid.defaults("fluid.tests.binder.long.startup", {
        gradeNames: ["fluid.tests.binder.base"],
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

    // Component to test "long notation".   Also guards against a regression of merge policy issues addressed in fluid-4145.
    fluid.defaults("fluid.tests.binder.long", {
        gradeNames: ["fluid.tests.binder.long.startup"],
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

    fluid.defaults("fluid.tests.binder.long.environment", {
        gradeNames:       ["fluid.tests.binder.environment"],
        markupFixture:    ".viewport-long",
        binderGradeNames: ["fluid.tests.binder.long"],
        moduleName:       "Testing binder component (long notation)",
        components: {
            startupTests: {
                type: "fluid.tests.binder.caseHolder.startup"
            },
            simpleRelayTests: {
                type: "fluid.tests.binder.caseHolder.simpleRelay"
            }
        }
    });

    fluid.test.runTests("fluid.tests.binder.long.environment");
})();
