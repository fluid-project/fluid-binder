/* globals fluid */
(function () {
    "use strict";
    var gpii = fluid.registerNamespace("gpii");

    // Component to test support for textarea elements
    fluid.defaults("gpii.tests.binder.textarea", {
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

    fluid.defaults("gpii.binder.tests.textarea.environment", {
        gradeNames:       ["gpii.binder.tests.environment"],
        binderContainer:  ".viewport-textarea",
        binderGradeNames: ["gpii.tests.binder.textarea"],
        moduleMessage:    "Testing textarea form inputs...",
        components: {
            startupTests: {
                type: "gpii.binder.tests.caseHolder.startup"
            },
            simpleRelayTests: {
                type: "gpii.binder.tests.caseHolder.simpleRelay"
            }
        }
    });

    gpii.binder.tests.textarea.environment();
})();