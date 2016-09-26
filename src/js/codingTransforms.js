/*

    Model transformation functions to optionally encode/decode values when relaying data between model variables and
    DOM elements.

 */
/* eslint-env node */
"use strict";
var fluid = fluid || require("infusion");
var gpii  = fluid.registerNamespace("gpii");

fluid.registerNamespace("gpii.binder.transforms");

/**
 *
 * An encoding function for cases where an object has a `toString` function.  Not available directly as a transform,
 * but used to implement encoding of Booleans, etc. as strings below.
 *
 * @param value {Object} The value to be interpreted.
 * @returns {String} The output of `value.toString`.
 *
 */
gpii.binder.transforms.toString = function (value) {
    return value.toString();
};

/**
 *
 * Convert a string to a Boolean.
 *
 * The following are all `false`: `undefined`, `null`, "", "0", "false"
 *
 * Everything else is `true`.
 *
 * @param value {String} The value to be interpreted.
 * @returns {Boolean} The interpreted value.
 */
gpii.binder.transforms.stringToBoolean = function (value) {
    return !Boolean(value === undefined || value === null || value === "" || value === "0" || value === "false");
};

fluid.defaults("gpii.binder.transforms.stringToBoolean", {
    gradeNames: ["fluid.standardTransformFunction"]
});

gpii.binder.transforms.booleanToString = gpii.binder.transforms.toString;

fluid.defaults("gpii.binder.transforms.booleanToString", {
    gradeNames: ["fluid.standardTransformFunction"]
});

/**
 *
 * Transform a string to an object using `JSON.parse`.
 *
 * @param value
 */
gpii.binder.transforms.stringToObject = function (value) {
    return JSON.parse(value);
};

fluid.defaults("gpii.binder.transforms.stringToObject", {
    gradeNames: ["fluid.standardTransformFunction"]
});

/**
 *
 * Transform an object to a string using `JSON.stringify`.  You can pass the `space` option to be used
 * as part of your transform, as in:
 *
 * ```
 * "": {
     *   transform: {
     *     funcName: "gpii.binder.transforms.objectToString",
     *     inputPath: "",
     *     space: 2
     *   }
     * }
 * ```
 *
 * The default value for `space` is 0, which disabled spacing and line breaks.
 *
 * @param value
 */
gpii.binder.transforms.objectToString = function (value, transformSpec) {
    var space   = transformSpec.space || 0;
    return JSON.stringify(value, null, space);
};

fluid.defaults("gpii.binder.transforms.objectToString", {
    gradeNames: ["fluid.standardTransformFunction"]
});

/**
 *
 * Transform a string to a date using the Date constructor.  Accepts (among other things) the date and dateTime values
 * returned by HTML5 date and dateTime inputs.
 *
 * A string that cannot be parsed will be treated as `undefined`.
 *
 * @param value - The String value to be transformed into a Date object.
 * @returns {*}
 */
gpii.binder.transforms.stringToDate = function (value) {
    var date = new Date(value);
    return isNaN(date.getTime()) ? undefined : date;
};

fluid.defaults("gpii.binder.transforms.stringToDate", {
    gradeNames: ["fluid.standardTransformFunction"]
});

/**
 *
 * Transform a Date object into a date string using its toISOString method.  Results in date strings that are suitable
 * for use with both HTML5 "date" inputs and JSON Schema "date" format string validation.
 *
 * A non-date object will be treated as `undefined`.
 *
 * @param value - The Date object to be transformed into an ISO 8601 string.
 * @returns {*}
 */
gpii.binder.transforms.dateToString = function (value) {
    if (value instanceof Date) {
        var isoString = value.toISOString(); // A string like "2016-09-26T08:05:57.462Z"
        var dateString = isoString.substring(0, isoString.indexOf("T")); // A string like "2016-09-26"
        return dateString;
    }
    else {
        return undefined;
    }
};

fluid.defaults("gpii.binder.transforms.dateToString", {
    gradeNames: ["fluid.standardTransformFunction"]
});

/**
 *
 * Transform a Date object into a date/time string using its toISOString method.  Results in date strings that are
 * suitable for use with both HTML5 "dateTime" inputs and JSON Schema "date-time" format string validation.
 *
 * A non-date object will be treated as `undefined`.
 *
 * @param value - The Date object to be transformed into an ISO 8601 string.
 * @returns {*}
 */
gpii.binder.transforms.dateTimeToString = function (value) {
    return value instanceof Date ? value.toISOString() : undefined;
};

fluid.defaults("gpii.binder.transforms.dateTimeToString", {
    gradeNames: ["fluid.standardTransformFunction"]
});
