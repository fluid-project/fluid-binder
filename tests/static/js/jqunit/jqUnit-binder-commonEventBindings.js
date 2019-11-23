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
            paragraphClick: ".paragraph-click"
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
            }
        },
        invokers: {
            handleInputClick: {
                funcName: "gpii.tests.binder.commonEventBindings.handleInputClick",
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
