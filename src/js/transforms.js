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
