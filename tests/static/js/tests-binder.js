// Test "binder" components that will be exercised using Zombie.
/* globals fluid */
"use strict";

fluid.registerNamespace("gpii.tests.binder");
// Base grade for (almost) all components
fluid.defaults("gpii.tests.binder.base", {
    gradeNames: ["fluid.viewComponent"],
    model: {
        initFromModel:    "initialized from model" // The markup will be initialized with this value.
    },
    selectors: {
        initFromModel:    "[name='init-from-model']",
        initFromMarkup:   "[name='init-from-markup']",
        updateFromModel:  "[name='update-from-model']",
        updateFromMarkup: "[name='update-from-markup']"
    },
    listeners: {
        "onCreate.applyBinding": {
            funcName: "gpii.binder.applyBinding",
            args:     ["{that}"]
        }
    }
});

// Component to test "long notation"
fluid.defaults("gpii.tests.binder.long", {
    gradeNames: ["gpii.tests.binder.base"],
    bindings: {
        initFromModel: {
            selector: "initFromModel",
            path:     "initFromModel"
        },
        initFromMarkup: {
            selector: "initFromMarkup",
            path:     "initFromMarkup"
        },
        updateFromModel: {
            selector: "updateFromModel",
            path:     "updateFromModel"
        },
        updateFromMarkup: {
            selector: "updateFromMarkup",
            path:     "updateFromMarkup"
        }
    }
});


// Component to test "short notation"
fluid.defaults("gpii.tests.binder.short", {
    gradeNames: ["gpii.tests.binder.base"],
    bindings: {
        initFromModel:    "initFromModel",
        initFromMarkup:   "initFromMarkup",
        updateFromModel:  "updateFromModel",
        updateFromMarkup: "updateFromMarkup"
    }
});

// Component to test array notation.
//
// NOTE:
//   The syntax used in the next example is no longer preferred, but is tested to confirm that older components
//   can work with the new binder during the transition.
//
fluid.defaults("gpii.tests.binder.array", {
    gradeNames: ["gpii.tests.binder.base"],
    bindings: [
        {
            selector: "initFromModel",
            path:     "initFromModel"
        },
        {
            selector: "initFromMarkup",
            path:     "initFromMarkup"
        },
        {
            selector: "updateFromModel",
            path:     "updateFromModel"
        },
        {
            selector: "updateFromMarkup",
            path:     "updateFromMarkup"
        }
    ]
});

// Component to test support for radio buttons
fluid.defaults("gpii.tests.binder.radio", {
    gradeNames: ["gpii.tests.binder.base"],
    bindings: {
        initFromModel: {
            selector: "initFromModel",
            path:     "initFromModel"
        },
        initFromMarkup: {
            selector: "initFromMarkup",
            path:     "initFromMarkup"
        },
        updateFromModel: {
            selector: "updateFromModel",
            path:     "updateFromModel"
        },
        updateFromMarkup: {
            selector: "updateFromMarkup",
            path:     "updateFromMarkup"
        }
    }
});

// Component to test support for checkboxes
fluid.defaults("gpii.tests.binder.checkbox", {
    gradeNames: ["gpii.tests.binder.base"],
    model: {
        initFromModel: ["on"]
    },
    selectors: {
        array: "input[name='checkbox-groups']"
    },
    bindings: {
        initFromModel: {
            selector: "initFromModel",
            path:     "initFromModel"
        },
        initFromMarkup: {
            selector: "initFromMarkup",
            path:     "initFromMarkup"
        },
        updateFromModel: {
            selector: "updateFromModel",
            path:     "updateFromModel"
        },
        updateFromMarkup: {
            selector: "updateFromMarkup",
            path:     "updateFromMarkup"
        },
        array: {
            selector: "array",
            path:     "array"
        }
    }
});

fluid.defaults("gpii.tests.binder.toBeCleared", {
    gradeNames: ["fluid.viewComponent"],
    model: {
        toBeCleared: "Model value"
    },
    selectors: {
        toBeCleared: "[name='to-be-cleared']"
    },
    bindings: {
        toBeCleared: "toBeCleared"
    },
    listeners: {
        "onCreate.applyBinding": {
            funcName: "gpii.binder.applyBinding",
            args:     ["{that}"]
        }
    }
});