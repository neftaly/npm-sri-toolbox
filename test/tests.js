var assert = require("assert")
var sriToolbox = require("../main");
var fs = require("fs");

//var testString = "";
var sourceCode = fs.readFileSync("./test/jquery-1.10.2.min.js.testdata", { encoding: "ascii" });


describe("Generate:", function(){

	it("test name", function(){
		var expect = "ni:///sha-256;C6CB9UYIS9UJeqinPHWTHVqh_E1uhG5Twh-Y5qFQmYg?ct=application/javascript";
		var result = sriToolbox.generate({ parameters: { "ct": "application/javascript" } }, sourceCode);
		assert.equal(expect, result);
	});

});
