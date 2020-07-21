/* globals jqUnit */
(function (fluid, jqUnit) {
    "use strict";

    fluid.registerNamespace("fluid.tests.binder.transforms");

    fluid.tests.binder.transforms.testDefs = {
        checkToBoolean: {
            message: "Testing `fluid.binder.transforms.checkToBoolean`",
            input: { value: ["on"] },
            expected: { value: true },
            transformRules: {
                "value": {
                    transform: {
                        type: "fluid.binder.transforms.checkToBoolean",
                        inputPath: "value"
                    }
                }
            }
        },
        booleanToCheck: {
            message: "Testing `fluid.binder.transforms.booleanToCheck`",
            input: { value: false },
            expected: { value: [] },
            transformRules: {
                "value": {
                    transform: {
                        type: "fluid.binder.transforms.booleanToCheck",
                        inputPath: "value"
                    }
                }
            }
        }
    };

    jqUnit.module("Static tests for model transformation transform functions.");

    fluid.each(fluid.tests.binder.transforms.testDefs, function (testDef) {
        jqUnit.test(testDef.message, function () {
            var output = fluid.model.transformWithRules(testDef.input, testDef.transformRules);
            jqUnit.assertDeepEq(testDef.message + " (forward)", testDef.expected, output);

            var invertedConfig = fluid.model.transform.invertConfiguration(testDef.transformRules);
            var inverseOutput = fluid.model.transformWithRules(output, invertedConfig);
            jqUnit.assertDeepEq(testDef.message + " (inverse)", testDef.input, inverseOutput);
        });
    });
})(fluid, jqUnit);
