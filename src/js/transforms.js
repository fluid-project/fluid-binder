/*

    Model transformation functions useful in validating form content.

 */
/* eslint-env node */
"use strict";
var fluid = fluid || require("infusion");
var gpii  = fluid.registerNamespace("gpii");

fluid.registerNamespace("gpii.binder.transforms");

/*

    A transform function to optionally strip empty strings when they are relayed.  Add this to your binder component
    using code like:

    ```
    bindings: {
        sample: {
            selector: "sample",
            path:     "sample",
            rules: {
                domToModel: {
                    "": {
                        transform: {
                            type:  "gpii.binder.transforms.stripEmptyString",
                            inputPath: ""
                        }
                    }
                }
            }
        }
    }
    ```

 */
gpii.binder.transforms.stripEmptyString = function (value) {
    return value === "" ? null : value;
};

fluid.defaults("gpii.binder.transforms.stripEmptyString", {
    gradeNames: ["fluid.standardTransformFunction"]
});

/**
 *
 * Transform the value returned by jQuery.val for a single checkbox into a boolean.
 *
 * @param value {Array} - An array of values, either the value attribute of a ticked checkbox, or "on" if the checkbox has no value specified.
 * @return {Boolean} - `true` if the first value is checked, `false`.
 *
 */
gpii.binder.transforms.checkToBoolean = function (value) {
    return fluid.get(value, 0) ? true : false;
};

fluid.defaults("gpii.binder.transforms.checkToBoolean", {
    gradeNames: ["fluid.standardTransformFunction"]
});

/**
 *
 * Transform a boolean model value into the value used for checkboxes by jQuery.val.
 *
 * @param value {Boolean} - The value to be passed to the DOM.
 * @return {Array} - An array with the first value set to "on" if the value is `true`, an empty Array otherwise.
 *
 */
gpii.binder.transforms.booleanToCheck = function (value) {
    return value ? ["on"] : [];
};

fluid.defaults("gpii.binder.transforms.booleanToCheck", {
    gradeNames: ["fluid.standardTransformFunction"]
});
