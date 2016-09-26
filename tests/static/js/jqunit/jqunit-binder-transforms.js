/* globals fluid, jqUnit */
(function () {
    "use strict";
    var gpii = fluid.registerNamespace("gpii");

    fluid.registerNamespace("gpii.tests.binder.transforms");
    gpii.tests.binder.transforms.runSingleTest = function (testDef) {
        jqUnit.test(testDef.message, function () {
            var fnName = testDef.fnName || "assertEquals";
            var inputArray = fluid.makeArray(testDef.input);
            fluid.each(inputArray, function (input) {
                var output = fluid.model.transformWithRules(input, testDef.rules);
                jqUnit[fnName]("The output should be as expected for input '" + input + "'...", testDef.expected, output);
            });
        });
    };

    // We cannot use IoC tests or even a component here because we have no way of preventing input or expected values
    // like `'{"foo":"bar"}'` from being resolved as `undefined` IoC references.  We cannot use "noResolve" on the whole
    // construct, as we would like to reuse individual rulesets.
    //
    // TODO: Discuss with Antranig
    var rules = {
        booleanToString: {
            "": {
                transform: {
                    type:     "gpii.binder.transforms.booleanToString",
                    inputPath: ""
                }
            }
        },
        stringToBoolean: {
            "": {
                transform: {
                    type:     "gpii.binder.transforms.stringToBoolean",
                    inputPath: ""
                }
            }
        },
        stringToObject: {
            "": {
                transform: {
                    type:     "gpii.binder.transforms.stringToObject",
                    inputPath: ""
                }
            }
        },
        objectToString: {
            "": {
                transform: {
                    type:     "gpii.binder.transforms.objectToString",
                    inputPath: ""
                }
            }
        },
        stringToNumber: {
            "": {
                transform: {
                    type: "fluid.transforms.stringToNumber",
                    inputPath: ""
                }
            }
        },
        numberToString: {
            "": {
                transform: {
                    type: "fluid.transforms.numberToString",
                    inputPath: ""
                }
            }
        },
        stringToDate: {
            "": {
                transform: {
                    type: "gpii.binder.transforms.stringToDate",
                    inputPath: ""
                }
            }
        },
        dateToString: {
            "": {
                transform: {
                    type: "gpii.binder.transforms.dateToString",
                    inputPath: ""
                }
            }
        },
        dateTimeToString: {
            "": {
                transform: {
                    type: "gpii.binder.transforms.dateTimeToString",
                    inputPath: ""
                }
            }
        }
    };

    var tests = [
        {
            message:  "The string value 'false' should have been returned...",
            input:    false,
            rules:    rules.booleanToString,
            expected: "false"
        },
        {
            message: "The string value 'true' should have been returned...",
            input: true,
            rules: rules.booleanToString,
            expected: "true"
        },
        {
            message: "All falsy values should be interpreted as false",
            input: ["false", "0", null, ""],
            rules: rules.stringToBoolean,
            expected: false
        },
        {
            message: "Undefined values should be handled as expected",
            input: [undefined],
            rules: rules.stringToBoolean,
            expected: {},
            fnName: "assertDeepEq"
        },
        {
            message: "All falsy values should be interpreted as true",
            input: ["true", "something"],
            rules: rules.stringToBoolean,
            expected: true
        },
        {
            message: "A stringified object should be correctly decoded",
            input: ["{ \"foo\": \"bar\" }"],
            rules: rules.stringToObject,
            expected: {foo: "bar"},
            fnName: "assertDeepEq"
        },
        {
            message: "An object should be correctly converted to a string",
            input: [{ foo: "bar" }],
            rules: rules.objectToString,
            expected: "{\"foo\":\"bar\"}"
        },
        {
            message: "A stringified date should be correctly decoded",
            input: ["1972-02-05"],
            rules: rules.stringToDate,
            expected: new Date("1972-02-05"),
            fnName: "assertDeepEq"
        },
        {
            message: "A date should be correctly converted to a string",
            input: [new Date("2014-01-17")],
            rules: rules.dateToString,
            expected: "2014-01-17"
        },
        {
            message: "A date/time should be correctly converted to a string",
            input: [new Date("2011-04-22T17:14:25")],
            rules: rules.dateTimeToString,
            expected: "2011-04-22T17:14:25.000Z"
        },
        // "canary" tests to confirm that the untested string to number transform functions provided with Fluid still work.
        {
            message: "A string should be correctly converted to a number",
            input: "0",
            rules: rules.stringToNumber,
            expected: 0
        },
        // "canary" tests to confirm that the untested number to string transform functions provided with Fluid still work.
        {
            message: "A number should be correctly converted to a string",
            input: 1,
            rules: rules.numberToString,
            expected: "1"
        }
    ];

    fluid.each(tests, gpii.tests.binder.transforms.runSingleTest);
})();
