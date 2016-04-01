/* globals fluid */
(function () {
    "use strict";
    var gpii = fluid.registerNamespace("gpii");

    // Component to test "short notation"
    fluid.defaults("gpii.tests.binder.short", {
        gradeNames: ["gpii.tests.binder.base"],
        bindings: {
            initFromModel:    "initFromModel",
            initFromMarkup:   "initFromMarkup",
            updateFromModel:  "updateFromModel",
            updateFromMarkup: "updateFromMarkup"
        }
    });

    fluid.defaults("gpii.binder.tests.short.environment", {
        gradeNames:       ["gpii.binder.tests.environment"],
        binderContainer:  ".viewport-short",
        binderGradeNames: ["gpii.tests.binder.short"],
        moduleMessage:    "Testing binder component (short notation)...",
        components: {
            startupTests: {
                type: "gpii.binder.tests.caseHolder.startup"
            },
            simpleRelayTests: {
                type: "gpii.binder.tests.caseHolder.simpleRelay"
            }
        }
    });

    gpii.binder.tests["short"].environment();
})();