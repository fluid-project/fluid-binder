/* globals fluid */
(function () {
    "use strict";
    var gpii = fluid.registerNamespace("gpii");

    // Component to test support for arrays
    fluid.defaults("gpii.tests.binder.array", {
        gradeNames: ["gpii.tests.binder.base"],
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

    fluid.defaults("gpii.binder.tests.array.environment", {
        gradeNames:       ["gpii.binder.tests.environment"],
        binderContainer:  ".viewport-array",
        binderGradeNames: ["gpii.tests.binder.array"],
        moduleName:       "Testing array notation",
        components: {
            startupTests: {
                type: "gpii.binder.tests.caseHolder.startup"
            },
            simpleRelayTests: {
                type: "gpii.binder.tests.caseHolder.simpleRelay"
            }
        }
    });

    gpii.binder.tests.array.environment();
})();