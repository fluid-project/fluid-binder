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
                args: ["gpii.tests.binder.commonEventBindings.handleParagraphClick({arguments}.0)"]
            },
            multipleEventInputButton: {
                method: ["click", "keydown"],
                args: ["{that}.handleInputClick"]
            },
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
        },
        invokers: {
            handleInputClick: {
                funcName: "gpii.tests.binder.commonEventBindings.handleInputClick",
                args: ["{arguments}.0"]
            },
            handleInputKeydown: {
                funcName: "gpii.tests.binder.commonEventBindings.handleInputKeydown",
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

    fluid.defaults("gpii.tests.binder.commonEventBindings.caseHolder", {
        gradeNames: ["gpii.tests.binder.caseHolder"],
        rawModules: [{
            name: "Testing support for common event bindings...",
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

    fluid.defaults("gpii.tests.binder.commonEventBindings.environment", {
        gradeNames:       ["gpii.tests.binder.environment"],
        markupFixture:    ".viewport-common-event-bindings",
        binderGradeNames: ["gpii.tests.binder.commonEventBindings"],
        moduleName:       "Testing common event bindings",
        components: {
            commonEventBindingsTests: {
                type: "gpii.tests.binder.commonEventBindings.caseHolder"
            }
        }
    });

    gpii.tests.binder.commonEventBindings.environment();
})();
