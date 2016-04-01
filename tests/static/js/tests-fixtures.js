/*

    A test environment, caseHolder, and reusable common tests for use in our test suite.

 */

/* globals fluid, $, jqUnit */
"use strict";
var gpii = fluid.registerNamespace("gpii");

// Base viewComponent used in most tests.
fluid.defaults("gpii.tests.binder.base", {
    gradeNames: ["fluid.viewComponent"],
    model: {
        initFromModel:    "initialized from model" // The markup will be initialized with this value.
    },
    selectors: {
        initFromModel:    "[name='init-from-model']",
        initFromMarkup:   "[name='init-from-markup']",
        updateFromModel:  "[name='update-from-model']",
        updateFromMarkup: "[name='update-from-markup']"
    },
    listeners: {
        "onCreate.applyBinding": {
            funcName: "gpii.binder.applyBinding",
            args:     ["{that}"]
        }
    }
});

fluid.registerNamespace("gpii.binder.tests");

// Client-side function to retrieve a value by a selector from within an IoC test.
gpii.binder.tests.getElementValue = function (selector) {
    return fluid.value($(selector));
};

// Client-side function to click a selector
gpii.binder.tests.clickSelector = function (selector) {
    $(selector).click();
};

// Client side one-shot element test, which can use most jqUnit functions.
gpii.binder.tests.testElement = function (fnName, message, expected, selector) {
    var value = gpii.binder.tests.getElementValue(selector);
    jqUnit[fnName](message, expected, value);
};

/*

    A test caseHolder that (re)constructs its binder for each test.  Your test definitions when using this
    grade should be stored in `rawModules` rather than `modules`.

 */
fluid.defaults("gpii.binder.tests.caseHolder", {
    gradeNames: ["gpii.express.tests.caseHolder.base"],
    sequenceStart: [
        {
            func: "{testEnvironment}.events.constructComponent.fire"
        }
    ]
});

// Common tests to confirm that variables are populated correctly on startup...
fluid.defaults("gpii.binder.tests.caseHolder.startup", {
    gradeNames: ["gpii.binder.tests.caseHolder"],
    rawModules: [{
        tests: [
            {
                name: "Confirm that bindings are passed correctly on initialization...",
                type: "test",
                sequence: [
                    {
                        func: "gpii.binder.tests.testElement",
                        args: ["assertEquals", "A form element with no markup value should be correctly initialized...", "initialized from model", "[name='init-from-model']"] // (fnName, message, expected, selector)
                    },
                    {
                        func: "jqUnit.assertEquals",
                        args: ["Model data should be correctly initialized from markup values...", "initialized from markup", "{testEnvironment}.binder.model.initFromMarkup"]
                    }
                ]
            }
        ]
    }]
});

// Common tests for many variations (form field type, etc.)
fluid.defaults("gpii.binder.tests.caseHolder.simpleRelay", {
    gradeNames: ["gpii.binder.tests.caseHolder"],
    rawModules: [{
        tests: [
            {
                name: "Confirm that a form update results in a model update...",
                type: "test",
                sequence: [
                    {
                        func: "fluid.changeElementValue",
                        args: ["[name='update-from-markup']", "updated via form element"]
                    },
                    {
                        func: "jqUnit.assertEquals",
                        args: ["Model data should be correctly updated after a form field change...", "updated via form element", "{testEnvironment}.binder.model.updateFromMarkup"]
                    }
                ]
            },
            {
                name: "Confirm that a model update results in a form change...",
                type: "test",
                sequence: [
                    {
                        func: "{testEnvironment}.binder.applier.change",
                        args: ["updateFromModel", "updated from model"]
                    },
                    {
                        func: "gpii.binder.tests.testElement",
                        args: ["assertEquals", "A form element should be updated after a model change...", "updated from model", "[name='update-from-model']"] // (fnName, message, expected, selector)
                    }
                ]
            }
        ]
    }]
});

/*

    A test environment that creates a new test component with the specified container and gradeNames whenever
    the `constructComponent` event is fired.  Intended for use with an instance of the `caseHolder` grade above.

*/
fluid.defaults("gpii.binder.tests.environment", {
    gradeNames: ["fluid.test.testEnvironment"],
    binderContainer: "body",
    binderGradeNames: [],
    moduleMessage: "",
    events: {
        constructComponent: null
    },
    components: {
        binder: {
            type:          "fluid.viewComponent",
            createOnEvent: "constructComponent",
            container:     "{gpii.binder.tests.environment}.options.binderContainer",
            options: {
                gradeNames: "{gpii.binder.tests.environment}.options.binderGradeNames"
            }
        }
    },
    listeners: {
        "onCreate.announceModule": {
            funcName: "jqUnit.module",
            args: ["{that}.options.moduleMessage"]
        }
    }
});