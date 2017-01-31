/*

    A Fluid component to launch testem with test coverage instrumentation.

 */
/* eslint-env node */
"use strict";
var fluid = require("infusion");
var gpii  = fluid.registerNamespace("gpii");

var path   = require("path");
var http   = require("http");
var fs     = require("fs");
var rimraf = require("rimraf");

fluid.registerNamespace("gpii.test.testem");

gpii.test.testem.cleanDirs = function (pathStringOrArray) {
    var dirPaths = fluid.makeArray(pathStringOrArray);
    fluid.each(dirPaths, function (dirPath) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
        else {
            var pattern = path.join(dirPath, "*");
            rimraf(pattern, function (error) {
                if (error) {
                    fluid.fail(error);
                }
            });
        }
    });
};

gpii.test.testem.init = function (that, config, data, callback) {
    var coverageDir     = fluid.module.resolvePath(that.options.coverageDir);
    gpii.test.testem.cleanDirs([coverageDir]);

    that.server = http.createServer(function (req, res) {
        // console.error("... Received coverage of", req.headers["content-length"], "length");
        // need separate files per browser/client
        req.pipe(fs.createWriteStream(path.join(coverageDir, "coverage-" + Math.random() + ".json")));
        // make sure we"ve got it all
        req.on("end", res.end.bind(res));
    }).listen(that.options.coveragePort, function (serverErr) {
        // console.error("------ Listening for coverage on " + port);
        // when server is ready
        // pass control back to testem
        callback(serverErr);
    });
};

gpii.test.testem.shutdown = function (that, config, data, callback) {
    if (that.server) {
        // shutdown the server
        that.server.close(callback);
    }
    else {
        callback(new Error("Cannot shutdown server because it does not exist."));
    }
};

gpii.test.testem.resolvePaths = function (pathsToResolve) {
    return fluid.transform(fluid.makeArray(pathsToResolve), fluid.module.resolvePath);
};

fluid.defaults("gpii.test.testem", {
    gradeNames: ["fluid.component"],
    coveragePort: 7358,
    sourceDir:       "%gpii-binder/src",
    coverageDir:     "%gpii-binder/coverage",
    instrumentedDir: "%gpii-binder/instrumented",
    sourceFiles:     "%gpii-binder/src/js/*.js",
    serveFiles:      "%gpii-binder/src/js/*.js",
    testemOptions: {
        on_start: "{that}.onStart",
        on_exit:  "{that}.onExit",
        src_files: {
            expander: {
                funcName: "gpii.test.testem.resolvePaths",
                args:     ["{that}.options.sourceFiles"]
            }
        },
        // TODO:  Testem doesn't seem to accept full paths, it wants paths relative to where you run things from.
        test_page: {
            expander: {
                funcName: "gpii.test.testem.resolvePaths",
                args:     ["{that}.options.testPages"]
            }
        },
        serve_files: {
            expander: {
                funcName: "gpii.test.testem.resolvePaths",
                args:     ["{that}.options.serveFiles"]
            }
        },
        "proxies": {
            "/coverage": {
                "target": {
                    expander: {
                        funcName: "fluid.stringTemplate",
                        args: ["http://localhost:%port", { port: "{that}.options.coveragePort" }]
                    }
                }
            }
        }
    },
    invokers: {
        "onStart": {
            funcName: "gpii.test.testem.init",
            args:     ["{that}", "{arguments}.0", "{arguments}.1", "{arguments}.2"] // config, data, callback
        },
        "onExit": {
            funcName: "gpii.test.testem.shutdown",
            args:     ["{that}", "{arguments}.0", "{arguments}.1", "{arguments}.2"] // config, data, callback
        }
    }
});
