/* eslint-env node */
"use strict";
var fluid = require("infusion");

// Register our content so that it can be referenced in other packages using `fluid.module.resolvePath("%fluid-binder/path/to/content")`
fluid.module.register("fluid-binder", __dirname, require);
