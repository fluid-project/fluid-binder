/* global fluid */
(function () {
    "use strict";

    /**
     * GPII Binder Markup Events Grade
     * This grade allows binding typical HTML events such as
     * mouse clicks and keypress events to selectors each time
     * the markup is rendered for a component. (Meaning they will
     * also apply if a component is rerendered after a model refresh
     * or similar situation)
     *
     * It adds a new area to a grades options called `markupEventBindings`
     * which allows binding `selectors` to jQuery events. Theoretically
     * other event constructs could be supported in the future, but only
     * jQuery events are implemented at the time of writing.
     *
     * Binding is initiated when the components `onMarkupRendered` event is
     * fired. If you are using a grade derived from `gpii.handlebars.templateAware`
     * this event will be automatically fired when the handlebars markup is
     * rendered.
     *
     * Example usage of adding a click handler to a selector productListLinks.
     * ```
     * markupEventBindings: {
     *     productListLinks: {
     *         // type: jQuery <- Defaults to jQuery but could be configured ITF
     *         method: "click",
     *         args: ["{that}.selectProduct"]
     *     }
     * }
     * ```
     */
    fluid.defaults("gpii.binder.bindMarkupEvents", {
        mergePolicy: {
            decorators: "noexpand"
        },
        events: {
            onDomBind: null,
            onDomUnbind: null,
            onMarkupRendered: null
        },
        listeners: {
            onMarkupRendered: "{that}.events.onDomBind.fire({that}, {that}.container)",
            onDestroy: "{that}.events.onDomUnbind.fire({that}, {that}.container)",
            onDomBind: "fluid.decoratorViewComponent.processDecorators({that}, {that}.options.markupEventBindings)"
        }
    });

    /**
     *
     * Markup Event Binding
     *
     * @typedef {Object} MarkupEventBinding
     * @property {String} type - Currently the only supported value is `jQuery`. This property
     * can also be omitted, in which case it will default to `jQuery`.
     * @property {String|Array} method - The DOM Event we are binding to such as `click`. If we
     * want to listen for multiple events in the same binding this can be an array of event
     * types such as `["click", "keypress"]`.
     * @property {Array} args - A list of arguments to be passed to the event. This supports the
     * usual range of Fluid IoC syntax. Typically, this will be an invoker on the component to be
     * called when the event is triggered.
     */

    /**
     *
     * Markup Event Bindings
     *
     * This is an object containing mappings of selector names to `MarkupEventBinding`
     * declarations. Each key should be a name corresponding to a selector in the
     * components `selectors` option block.
     *
     * @typedef {Object} MarkupEventBindings
     */

    fluid.registerNamespace("fluid.decoratorViewComponent");

    //
    // The methods below might be generic enough to go straight to infusion
    //

    /**
     *
     * Expands string encoded arguments to the event invoker, filling
     * in any compact string versions of infusion invokers.
     *
     * @param {Object} that - The component itself.
     * @param {String|Object} arg - A single argument being passed to the event invoker.
     * @param {String} name - The name for the invoker.
     * @return {Object} The expanded argument.
     */
    fluid.expandCompoundArg = function (that, arg, name) {
        var expanded = arg;
        if (typeof(arg) === "string") {
            if (arg.indexOf("(") !== -1) {
                var invokerec = fluid.compactStringToRec(arg, "invoker");
                // TODO: perhaps a a courtesy we could expose {node} or even {this}
                expanded = fluid.makeInvoker(that, invokerec, name);
            } else {
                expanded = fluid.expandImmediate(arg, that);
            }
        }
        return expanded;
    };

    /**
     *
     * Processes a single markup event binding decorator of event type jQuery.
     * Currently the only type of event supported is jQuery events, so this does
     * all the work.
     *
     * @param {MarkupEventBinding} dec - The single binding decorator being processed.
     * @param {DOMNode} node - The node we are listening to for the specified events.
     * @param {Object} that - The component itself.
     * @param {String} name - Name that will be used for the invoker created to handle
     * this event.
     * @return {jQuery[]} Array of jQuery objects which the events attached to them.
     */
    fluid.processjQueryDecorator = function (dec, node, that, name) {
        var args = fluid.makeArray(dec.args);
        var expanded = fluid.transform(args, function (arg, index) {
            return fluid.expandCompoundArg(that, arg, name + " argument " + index);
        });
        fluid.log("Got expanded value of ", expanded, " for jQuery decorator");
        // Support for listing multiple methods in an array, or just a single string method
        var methods = [dec.method];
        var togo = [];
        if (fluid.isArrayable(dec.method)) {
            methods = dec.method;
        }
        fluid.each(methods, function (method) {
            var func = node[method];
            togo.push(func.apply(node, expanded));
        });
        return togo;
    };

    /**
     *
     * Function to process the markup binding decorators and create the events described
     * by them. The markup needs to be rendered and settled before this can be called.
     *
     * @param {gpii.binder.bindMarkupEvents} that - Any component inheriting from `bindMarkupEvents`.
     * @param {MarkupEventBindings} decorators - Markup Event Binding decorators on the component.
     */
    fluid.decoratorViewComponent.processDecorators = function (that, decorators) {
        fluid.each(decorators, function (val, key) {
            var node = that.locate(key);
            if (node.length > 0) {
                var name = "Decorator for DOM node with selector " + key + " for component " + fluid.dumpThat(that);
                // val can be an array to support multiple event handlers
                var handlerDecs = fluid.isArrayable(val) ? val : [val];
                fluid.each(handlerDecs, function (nextVal) {
                    var decs = fluid.makeArray(nextVal);
                    fluid.each(decs, function (dec) {
                        // If no type is specified default to jQuery
                        if (!dec.type || dec.type === "jQuery") {
                            fluid.processjQueryDecorator(dec, node, that, name);
                        }
                    });
                });
            }
        });
    };
})();
