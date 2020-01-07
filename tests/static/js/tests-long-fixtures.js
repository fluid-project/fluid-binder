(function () {
    "use strict";

    // Base grade used in both the "long" and "mixed" notation tests.
    // Also guards against a regression of merge policy issues addressed in GPII-4145.
    fluid.defaults("gpii.tests.binder.long.startup", {
        gradeNames: ["gpii.tests.binder.base"],
        bindings: {
            initFromModel: {
                selector: "initFromModel",
                path:     "initFromModel"
            },
            initFromMarkup: {
                selector: "initFromMarkup",
                path:     "initFromMarkup"
            }
        }
    });
})();
