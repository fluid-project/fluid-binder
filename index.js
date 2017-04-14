/* eslint-env node */
"use strict";
var fluid = require("infusion");
var gpii  = fluid.registerNamespace("gpii");

// Register our content so that it can be referenced in other packages using `fluid.module.resolvePath("%gpii-binder/path/to/content")`
fluid.module.register("gpii-binder", __dirname, require);
