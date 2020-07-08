(function () {
    "use strict";

    // bindOnDomChange
    // fluid.binder.bindOnDomChange
    // <input type="text" name="bound-text-field"/>

    fluid.registerNamespace("fluid.tests.binder.bindOnDomChange.testComponent");

    fluid.tests.binder.bindOnDomChange.testComponent.changeMarkup = function (that, selector, markup) {
        var element = that.locate(selector);
        element.html(markup);
        that.events.onDomChange.fire(that);
    };

    fluid.defaults("fluid.tests.binder.bindOnDomChange.testComponent", {
        gradeNames: ["fluid.binder.bindOnCreate", "fluid.binder.bindOnDomChange"],
        model: {
            textField: "initial value"
        },
        selectors: {
            textField: "input[name='bound-text-field']"
        },
        bindings: {
            textField: {
                selector: "textField",
                path:     "textField"
            }
        },
        invokers: {
            changeMarkup: {
                funcName: "fluid.tests.binder.bindOnDomChange.testComponent.changeMarkup",
                args: ["{that}", "textField", "<p>Updated Markup</p><input type=\"text\" name=\"bound-text-field\"/>"]
            }
        }
    });

    fluid.defaults("fluid.tests.binder.bindOnDomChange.caseHolder", {
        gradeNames: ["fluid.tests.binder.caseHolder"],
        rawModules: [{
            name: "Testing support for 'bind on dom change' grade...",
            tests: [
                {
                    name: "Confirm that bindings persist across DOM changes...",
                    type: "test",
                    sequence: [
                        // Confirm that the initial value is set correctly on startup
                        {
                            func: "fluid.tests.binder.testElement",
                            args: ["assertEquals", "The form value should be correct on startup...", "initial value", "[name='bound-text-field']"] // (fnName, message, expected, selector)
                        },
                        // Reset the markup
                        {
                            func: "{testEnvironment}.binder.changeMarkup"
                        },
                        // Apply a model change
                        {
                            func: "{testEnvironment}.binder.applier.change",
                            args: ["textField", "updated value"]
                        },
                        // Confirm that the model change has taken effect
                        {
                            func: "fluid.tests.binder.testElement",
                            args: ["assertEquals", "A form element should be updated after a model change...", "updated value", "[name='bound-text-field']"] // (fnName, message, expected, selector)
                        }
                    ]
                }
            ]
        }]
    });

    fluid.defaults("fluid.tests.binder.bindOnDomChange.environment", {
        gradeNames:       ["fluid.tests.binder.environment"],
        markupFixture:    ".viewport-bindOnDomChange",
        binderGradeNames: ["fluid.tests.binder.bindOnDomChange.testComponent"],
        moduleName:       "Testing 'bind on dom change' support",
        components: {
            caseHolder: {
                type: "fluid.tests.binder.bindOnDomChange.caseHolder"
            }
        }
    });

    fluid.test.runTests("fluid.tests.binder.bindOnDomChange.environment");
})();
