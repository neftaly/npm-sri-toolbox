var assert = require("assert")
var sriToolbox = require("../main");
var fs = require("fs");

//var testString = "";
var sourceCode = fs.readFileSync("./test/jquery-1.10.2.min.js.testdata", { encoding: "ascii" });


describe("Generate:", function(){

	it("Default", function(){
		var options = {};
		var expect = "sha256-C6CB9UYIS9UJeqinPHWTHVqh/E1uhG5Twh+Y5qFQmYg=";
		var result = sriToolbox.generate(options, sourceCode);
		assert.equal(expect, result);
	});

	it("Custom", function(){
		var options = {
			type: "application/javascript",
			algorithms: ["sha512"],
			delimiter: "  "
		};
		var expect = "type:application/javascript  sha512-OqaFaP8lkurUEqDH9cOavDesVi8At8Fq8HzV7/iBqtznfscQQLNsCtnC0qpO3XdE+nKw9Ey4tIXU8oOxtJwhQQ==";
		var result = sriToolbox.generate(options, sourceCode);
		assert.equal(expect, result);
	});

});
