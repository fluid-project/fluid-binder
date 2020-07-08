(function () {
    "use strict";

    // Component to test "short notation"
    fluid.defaults("fluid.tests.binder.short", {
        gradeNames: ["fluid.tests.binder.base"],
        bindings: {
            initFromModel:    "initFromModel",
            initFromMarkup:   "initFromMarkup",
            updateFromModel:  "updateFromModel",
            updateFromMarkup: "updateFromMarkup",
            missingElement:   "missingElement"
        }
    });

    fluid.defaults("fluid.tests.binder.short.environment", {
        gradeNames:       ["fluid.tests.binder.environment"],
        moduleName:       "Testing binder component (short notation)",
        markupFixture:    ".viewport-short",
        binderGradeNames: ["fluid.tests.binder.short"],
        components: {
            startupTests: {
                type: "fluid.tests.binder.caseHolder.startup"
            },
            simpleRelayTests: {
                type: "fluid.tests.binder.caseHolder.simpleRelay"
            }
        }
    });

    fluid.test.runTests("fluid.tests.binder.short.environment");
})();
