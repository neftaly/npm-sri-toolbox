/*
	subresource-integrity.generate
*/
"use strict";

var crypto = require("crypto");
var param = require("node-qs-serialization").param;
var base64formatter = require("base64formatter");


/*
	Facades
*/

var base64url = function (string) {
	return base64formatter(string, {to: "rfc4648"});
};

var hash = function (string, algorithm) {
	return crypto
		.createHash(algorithm)
		.digest(string);
};


/*
	Functionality
*/

var array = function (string, options) {
	// Defaults
	options = { 
		algorithms: options.algorithms || { "sha-256": "SHA256" }
		authority: options.authority || "",
		parameters: options.parameters || {}
	}; // TODO: Mixin
	// Designed for ES6 arrow functions
	return Object.keys(options.algorithms)
		.map(function (algorithm) { 
			return "ni:"
				+ "//"
				+ options.authority 
				+ "/"
				+ algorithm 
				+ ";"
				// TODO: currying
				+ base64url(hash(string, options.algorithms[algorithm]))
				+ "?"
				+ param(options.parameters);
		});
};


var string = function (string, options, delimiter) {
	// Defaults
	delimiter = delimiter || " ";
	return array.join(delimiter);
};


if (typeof module !== "undefined") {
	module.exports = {
		array: array,
		string: string
	};
}
