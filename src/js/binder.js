/*

    Add persistent bindings between a selector and a model value.  Changes are propagated between the two. See the
    documentation for more details:

    https://github.com/GPII/gpii-binder/

    This code was originally written by Antranig Basman <amb26@ponder.org.uk> and with his advice was updated and
    extended by Tony Atkins <tony@raisingthefloor.org>.

*/
/* global fluid, jQuery */
(function () {
    "use strict";
    var gpii = fluid.registerNamespace("gpii");
    fluid.registerNamespace("gpii.binder");

    /**
     *
     * Try to evolve a given string into a typed variable or object.
     *
     * @param originalValue {String|Array} The value we will try to evolve.
     * @returns {Object|String} An object if we were able to parse it, otherwise the original string.
     *
     */
    gpii.binder.jsonOrString = function (originalValue) {
        if (typeof originalValue === "string") {
            // empty "value" elements in HTML should not result in a bunch of empty strings in our model
            if (originalValue.length === 0) {
                return null;
            }
            else {
                try {
                    var objectValue = JSON.parse(originalValue);
                    return objectValue;
                }
                catch (e) {
                    // Ignore the error and keep the string value.
                    return originalValue;
                }
            }
        }
        else if (Array.isArray(originalValue)) {
            return originalValue.map(gpii.binder.jsonOrString);
        }
        else {
            return originalValue;
        }
    };

    /**
     * 
     * A function to encode problematic values that will not work correctly with fluid.value -> jQuery.val().
     * Adds special handling for boolean values, which would ordinarily be mangled.
     * 
     * @param originalData The original data, in its original form.
     * @returns {Object|String} The original data, encoded as needed to work correctly with fluid.value.
     */
    gpii.binder.getSafeValue = function (originalData) {
        if (Array.isArray(originalData)) {
            return originalData.map(gpii.binder.getSafeValue);
        }
        else if (typeof originalData !== "string") {
            return JSON.stringify(originalData);
        }
        else {
            return originalData;
        }
    };

    /**
     *
     * A function to "safely" apply changes. It uses the model change applier, but deletes "null" or "undefined" values.
     * This is required to deal with form fields whose value is set to an empty string, which commonly occurs with text
     * inputs.
     *
     * @param that {Object} The component itself.
     * @param path {String} The path to the model variable to be updated.
     * @param elementValue {Object} The value to set.
     */
    gpii.binder.applyChangeSafely = function (that, path, elementValue) {
        if (elementValue === null || elementValue === undefined) {
            that.applier.change(path, elementValue, "DELETE");
        }
        else {
            that.applier.change(path, elementValue);
        }
    };

    /**
     *
     * The main function to create bindings between markup and model elements.  See above for usage details.
     *
     * @param that - A fluid viewComponent with `options.bindings` and `options.selectors` defined.
     *
     */
    gpii.binder.applyBinding = function (that) {
        var bindings = that.options.bindings;
        fluid.each(bindings, function (value, key) {
            var path     = typeof value === "string" ? value : value.path;
            var selector = typeof value === "string" ? key : value.selector;
            var element = that.locate(selector);

            if (element.length > 0) {
                // Update the model when the form changes
                element.change(function () {
                    fluid.log("Changing model based on element update.");

                    var elementValue = gpii.binder.jsonOrString(fluid.value(element));
                    gpii.binder.applyChangeSafely(that, path, elementValue);
                });

                // Update the form elements when the model changes
                that.applier.modelChanged.addListener(path, function (change) {
                    fluid.log("Changing value based on model update.");

                    fluid.value(element, gpii.binder.getSafeValue(change));
                });

                // If we have model data initially, update the form.  Model values win out over markup.
                var initialModelValue = fluid.get(that.model, path);
                if (initialModelValue !== undefined) {
                    fluid.value(element, gpii.binder.getSafeValue(initialModelValue));
                }
                // If we have no model data, but there are defaults in the markup, using them to update the model.
                else {
                    var initialFormValue = gpii.binder.jsonOrString(fluid.value(element));
                    that.applier.change(path, initialFormValue);
                }
            }
            else {
                fluid.log("Could not locate element using selector '" + element.selector + "'...");
            }
        });
    };

    // A mix-in grade to apply bindings when a viewComponent is created.
    fluid.defaults("gpii.binder.bindOnCreate", {
        gradeNames: ["fluid.viewComponent"],
        listeners: {
            "onCreate.applyBinding": {
                funcName: "gpii.binder.applyBinding",
                args:     ["{that}"]
            }
        }
    });
    
    fluid.defaults("gpii.binder.bindOnDomChange", {
        gradeNames: ["fluid.viewComponent"],
        events: {
            onDomChange: null
        },
        listeners: {
            "onDomChange.applyBinding": {
                funcName: "gpii.binder.applyBinding",
                args:     ["{that}"]
            }
        }
    });
})(jQuery);


