/* globals fluid, jqUnit */
(function () {
    "use strict";
    var gpii = fluid.registerNamespace("gpii");

    // Component to test support for common event bindings
    fluid.defaults("gpii.tests.binder.commonEventBindings", {
        gradeNames: ["gpii.tests.binder.base", "gpii.binder.bindMarkupEvents"],
        bindings: {
        },
        selectors: {
            inputButton: "#input-button",
            inputKeydown: "#input-button",
            paragraphClick: ".paragraph-click",
            multipleEventInputButton: "#input-multiple-events-button",
            multipleEventHandlerInputButton: "#input-multiple-handlers-events-button"
        },
        markupEventBindings: {
            inputButton: {
                method: "click",
                args: ["{that}.handleInputClick"]
            },
            inputKeydown: {
                method: "keydown",
                args: ["{that}.handleInputClick"]
            },
            paragraphClick: {
                method: "click",
                args: ["{that}.handleParagraphClick"]
            },
            multipleEventInputButton: {
                method: ["click"],
                args: ["{that}.handleInputClick"]
            }
        },
        invokers: {
            handleInputClick: {
                funcName: "gpii.tests.binder.commonEventBindings.handleInputClick",
                args: ["{arguments}.0"]
            },
            handleInputKeydown: {
                funcName: "gpii.tests.binder.commonEventBindings.handleInputKeydown",
                args: ["{arguments}.0"]
            },
            handleParagraphClick: {
                funcName: "gpii.tests.binder.commonEventBindings.handleParagraphClick",
                args: ["{arguments}.0"]
            }
        },
        listeners: {
            "onCreate.markupEventBindings": "{that}.events.onMarkupRendered.fire()"
        }
    });

    gpii.tests.binder.commonEventBindings.handleInputClick = function (event) {
        jqUnit.assertEquals("We just clicked an input...", "INPUT", event.target.nodeName);
    };

    gpii.tests.binder.commonEventBindings.handleInputKeydown = function (event) {
        jqUnit.assertEquals("We just keydowned an input...", "INPUT", event.target.nodeName);
    };

    gpii.tests.binder.commonEventBindings.handleParagraphClick = function (event) {
        jqUnit.assertEquals("We just clicked a paragraph...", "P", event.target.nodeName);
    };

    fluid.defaults("gpii.tests.binder.commonEventBindingsOverride.caseHolder", {
        gradeNames: ["gpii.tests.binder.caseHolder"],
        rawModules: [{
            name: "Testing support for overriding common event bindings in sub grades...",
            tests: [
                {
                    name: "Test markup event binding for click on an input button",
                    type: "test",
                    expect: 1,
                    sequence: [
                        {
                            func: "gpii.tests.binder.clickSelector",
                            args: ["#input-button"]
                        }
                    ]
                },
                {
                    name: "Test markup event binding for keydown on an input button",
                    type: "test",
                    expect: 1,
                    sequence: [
                        {
                            func: "gpii.tests.binder.keydownSelector",
                            args: ["#input-button"]
                        }
                    ]
                },
                {
                    name: "Test markup event binding for click on a paragraph with a class",
                    type: "test",
                    expect: 1,
                    sequence: [
                        {
                            func: "gpii.tests.binder.clickSelector",
                            args: [".paragraph-click"]
                        }
                    ]
                },
                {
                    name: "Test markup event binding for both `click` and `keydown` on an input button",
                    type: "test",
                    expect: 2,
                    sequence: [
                        {
                            func: "gpii.tests.binder.clickSelector",
                            args: ["#input-multiple-events-button"]
                        },
                        {
                            func: "gpii.tests.binder.keydownSelector",
                            args: ["#input-multiple-events-button"]
                        }
                    ]
                },
                {
                    name: "Test markup event binding for both `click` and `keydown` on an input button, each using a different handler",
                    type: "test",
                    expect: 2,
                    sequence: [
                        {
                            func: "gpii.tests.binder.clickSelector",
                            args: ["#input-multiple-handlers-events-button"]
                        },
                        {
                            func: "gpii.tests.binder.keydownSelector",
                            args: ["#input-multiple-handlers-events-button"]
                        }
                    ]
                }
            ]
        }]
    });

    //
    // Test for overriding binder markup events
    //
    fluid.defaults("gpii.tests.binder.commonEventBindingsOverride", {
        gradeNames: ["gpii.tests.binder.commonEventBindings"],
        markupEventBindings: {
            // In the original grade this only had 1 method, overriding with 2
            multipleEventInputButton: {
                method: ["click", "keydown"],
                args: ["{that}.handleInputClick"]
            },
            // This is a new set of events that was not in the original grade
            multipleEventHandlerInputButton: [
                {
                    method: "click",
                    args: ["{that}.handleInputClick"]
                },
                {
                    method: "keydown",
                    args: ["{that}.handleInputKeydown"]
                }
            ]
        }
    });

    fluid.defaults("gpii.tests.binder.commonEventBindingsOverride.environment", {
        gradeNames:       ["gpii.tests.binder.environment"],
        markupFixture:    ".viewport-common-event-bindings",
        binderGradeNames: ["gpii.tests.binder.commonEventBindingsOverride"],
        moduleName:       "Testing common event bindings",
        components: {
            commonEventBindingsOverrideTests: {
                type: "gpii.tests.binder.commonEventBindingsOverride.caseHolder"
            }
        }
    });

    gpii.tests.binder.commonEventBindingsOverride.environment();
})();
