// Adapted from node ./node_modules/istanbul/lib/cli.js report
"use strict";
var path = require("path");
var http = require("http");
var fs = require("fs");
var shell = require("shelljs");
var port = 7358;
var server;

module.exports = {
    serve_files: [
        "instrumented/*.js"
    ],
    "framework": "qunit",
    "test_page": [
        "tests/static/tests-binder-array.html",
        "tests/static/tests-binder-checkbox.html",
        "tests/static/tests-binder-clear.html",
        // Currently testing this with Karma, which requires non-trivial changes that would prevent it from working here.
        // "tests/static/tests-binder-encoding.html",
        "tests/static/tests-binder-long.html",
        "tests/static/tests-binder-radio.html",
        "tests/static/tests-binder-select.html",
        "tests/static/tests-binder-short.html",
        "tests/static/tests-binder-textarea.html"
    ],
    "parallel": 5,
    src_files: [
        "src/*.js"
    ],

    // proxy to the create http server
    // phantomjs has problems with POSTs to different port
    "proxies": {
        "/coverage": {
            "target": "http://localhost:7358"
        }
    },

    // instrument files, spin up http server to write coverage data to disk
    on_start: function (config, data, callback) {
        shell.exec("node ./node_modules/istanbul/lib/cli.js instrument --output instrumented src", function (code, output) {
            if (code) {
                callback(code, output);
                return;
            }

            // Output to the coverage directory, which needs to exist.
            var outputDir = path.join(__dirname, "coverage");
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir);
            }

            // if instrumented successfully
            // start the server
            server = http.createServer(function (req, res) {
                // console.error("... Received coverage of", req.headers["content-length"], "length");
                // need separate files per browser/client
                req.pipe(fs.createWriteStream(path.join(outputDir, "coverage-" + Math.random() + ".json")));
                // make sure we"ve got it all
                req.on("end", res.end.bind(res));
            }).listen(port, function (serverErr) {
                // console.error("------ Listening for coverage on " + port);
                // when server is ready
                // pass control back to testem
                callback(serverErr);
            });
        });
    },

    // after tests done, stop http server, combined coverage data into the report
    on_exit: function (config, data, callback) {
        // shutdown the server
        server.close();

        // generate report
        shell.exec("node ./node_modules/istanbul/lib/cli.js report", function (code, output) {
            if (code) {
                return callback(code, output);
            }

            // check on generated report
            var lcov = shell.grep("end_of_record", path.join(__dirname, "coverage/lcov.info"));
            var report = shell.grep("src/index.html", path.join(__dirname, "coverage/lcov-report/index.html"));

            if (!lcov || !report) {
                callback(new Error("Unable to generate report"));
                return;
            }

            // everything is good
            callback(null);
        });
    }
};
