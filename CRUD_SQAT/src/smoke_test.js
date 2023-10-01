(function() {
    "use strict";
    let child_process = require("child_process");
    let http = require("http");

    let BASE_URL = "http://localhost:3000";

    let child;

    exports.setUp = function(done) {
        child = child_process.spawn("node", ["src/index.js", "3000"], { stdio: "pipe" });
        let stdout = "";

        child.stdout.setEncoding("utf8");
        child.stdout.on("data", function(chunk) {
            stdout += chunk;
            if (stdout.trim() === "Server started") {
                done();
            }
        });
    };

    exports.tearDown = function(done) {
        child.on("exit", function() {
            done();
        });
        child.kill();
    };

    exports.test_getHomePage = function(test) {
        checkMarker(BASE_URL, "AstanaIT page", function(foundMarker) {
            test.ok(foundMarker, "Home page");
            test.done();
        });
    };

    exports.test_get404Page = function(test) {
        checkMarker(BASE_URL + "/doesntexistpage", "AstanaIT 404 page", function(foundMarker) {
            test.ok(foundMarker, "404 page");
            test.done();
        });
    };

    function checkMarker(url, marker, callback) {
        let request = http.get(url);
        request.on("response", function(response) {
            let data = "";
            response.setEncoding("utf8");

            response.on("data", function(chunk) {
                data += chunk;
            });
            response.on("end", function() {
                let foundMarker = data.indexOf(marker) !== -1;
                callback(foundMarker);
            });
        });
    }
}());