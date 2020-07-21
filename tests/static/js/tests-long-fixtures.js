(function () {
    "use strict";

    // Base grade used in both the "long" and "mixed" notation tests.
    // Also guards against a regression of merge policy issues addressed in fluid-4145.
    fluid.defaults("fluid.tests.binder.long.startup", {
        gradeNames: ["fluid.tests.binder.base"],
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
