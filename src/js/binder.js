/*

    Add persistent bindings between a selector and a model value.  Changes are propagated between the two. See the
    documentation for more details:

    https://github.com/the-t-in-rtf/gpii-binder/blob/GPII-1579/


    This code was originally written by Antranig Basman <amb26@ponder.org.uk> and with his advice was updated and
    extended by Tony Atkins <tony@raisingthefloor.org>.

*/
/* global fluid, jQuery */
(function () {
    "use strict";
    var gpii = fluid.registerNamespace("gpii");
    fluid.registerNamespace("gpii.templates.binder");

    /**
     *
     * The main function to create bindings between markup and model elements.  See above for usage details.
     *
     * @param that - A fluid viewComponent with `options.bindings` and `options.selectors` defined.
     * 
     */
    gpii.templates.binder.applyBinding = function (that) {
        var bindings = that.options.bindings;
        fluid.each(bindings, function (value, key) {
            var path     = typeof value === "string" ? value : value.path;
            var selector = typeof value === "string" ? key : value.selector;
            var element = that.locate(selector);

            if (element.length > 0) {
                // Update the model when the form changes
                element.change(function () {
                    fluid.log("Changing model based on element update.");

                    var elementValue = fluid.value(element);

                    // Standardize non-values and empty strings as `null` per https://issues.gpii.net/browse/GPII-1580
                    that.applier.change(path, (elementValue && elementValue.length > 0) ? elementValue : null);
                });

                // Update the form elements when the model changes
                that.applier.modelChanged.addListener(path, function (change) {
                    fluid.log("Changing value based on model update.");

                    fluid.value(element, change);
                });

                // If we have model data initially, update the form.  Model values win out over markup.
                var initialModelValue = fluid.get(that.model, path);
                if (initialModelValue !== undefined) {
                    fluid.value(element, initialModelValue);
                }
                // If we have no model data, but there are defaults in the markup, using them to update the model.
                else {
                    var initialFormValue = fluid.value(element);
                    if (initialFormValue) {
                        that.applier.change(path, initialFormValue);
                    }
                }
            }
            else {
                fluid.log("Could not locate element using selector '" + element.selector + "'...");
            }
        });
    };
})(jQuery);


