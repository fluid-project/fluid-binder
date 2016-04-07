/* globals fluid */
(function () {
    "use strict";
    var gpii = fluid.registerNamespace("gpii");

    // Component to test "long notation"
    fluid.defaults("gpii.tests.binder.long", {
        gradeNames: ["gpii.tests.binder.base"],
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

    fluid.defaults("gpii.binder.tests.long.environment", {
        gradeNames:       ["gpii.binder.tests.environment"],
        markupFixture:    ".viewport-long",
        binderGradeNames: ["gpii.tests.binder.long"],
        moduleName:       "Testing binder component (long notation)",
        components: {
            startupTests: {
                type: "gpii.binder.tests.caseHolder.startup"
            },
            simpleRelayTests: {
                type: "gpii.binder.tests.caseHolder.simpleRelay"
            }
        }
    });

    gpii.binder.tests["long"].environment();
})();