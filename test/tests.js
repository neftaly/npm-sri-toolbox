"use strict";

var assert = require("assert"),
    sriToolbox = require("../main"),
    fs = require("fs"),

//    testString = "",
    sourceCode = fs.readFileSync("./test/jquery-1.10.2.min.js.testdata", { encoding: "ascii" });


describe("Generate:", function () {

    it("Default", function () {
        var options = {};
        var expect = "sha256-C6CB9UYIS9UJeqinPHWTHVqh/E1uhG5Twh+Y5qFQmYg=";
        var result = sriToolbox.generate(options, sourceCode);
        assert.equal(expect, result);
    });

    it("Unicode chars", function () {
        var options = {};
        var unicodeSourceCode = "console.log('I ♡ WebAppSec!');\n";
        var expect = "sha256-TH5eRuwfOSKZE0EKVF4WZ6gVQ/zUch4CZE2knqpS4MU=";
        var result = sriToolbox.generate(options, unicodeSourceCode);
        assert.equal(expect, result);
    });

    it("Custom", function () {
        var options = {
            type: "application/javascript",
            algorithms: ["sha512"],
            delimiter: "  "
        };
        var expect = "type:application/javascript  sha512-OqaFaP8lkurUEqDH9cOavDesVi8At8Fq8HzV7/iBqtznfscQQLNsCtnC0qpO3XdE+nKw9Ey4tIXU8oOxtJwhQQ==";
        var result = sriToolbox.generate(options, sourceCode);
        assert.equal(expect, result);
    });

    it("Object", function () {
        var options = {
            full: true,
            type: "application/javascript; charset: utf8"
        };
        var expect = {
            hashes: {
                sha256: "C6CB9UYIS9UJeqinPHWTHVqh/E1uhG5Twh+Y5qFQmYg="
            },
            type: "application/javascript",
            integrity: "type:application/javascript sha256-C6CB9UYIS9UJeqinPHWTHVqh/E1uhG5Twh+Y5qFQmYg="
        };
        var result = sriToolbox.generate(options, sourceCode);
        assert.deepEqual(expect, result);
    });

    it("Malformed type", function () {
        var options = {
            type: "application/javascr\"ipt; IGNORE THIS ",
        };
        var expect = "type:application/javascript sha256-C6CB9UYIS9UJeqinPHWTHVqh/E1uhG5Twh+Y5qFQmYg=";
        var result = sriToolbox.generate(options, sourceCode);
        assert.equal(expect, result);
    });

    it("RFC-6838 chars", function () {
        var options = {
            type: "text/aA!#$&-^_+.",
        };
        var expect = "type:text/aA!#$&-^_+. sha256-C6CB9UYIS9UJeqinPHWTHVqh/E1uhG5Twh+Y5qFQmYg=";
        var result = sriToolbox.generate(options, sourceCode);
        assert.equal(expect, result);
    });

});
