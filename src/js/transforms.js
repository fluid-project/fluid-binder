/*

    Model transformation functions useful in validating form content.

 */
/* eslint-env node */
"use strict";
var fluid = fluid || require("infusion");

fluid.registerNamespace("fluid.binder.transforms");

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
                            type:  "fluid.binder.transforms.stripEmptyString",
                            inputPath: ""
                        }
                    }
                }
            }
        }
    }
    ```

 */
fluid.binder.transforms.stripEmptyString = function (value) {
    return value === "" ? null : value;
};

fluid.defaults("fluid.binder.transforms.stripEmptyString", {
    gradeNames: ["fluid.standardTransformFunction"]
});
