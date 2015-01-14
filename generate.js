/*
	sri-toolbox.generate
*/
"use strict";

var serialize = require("rfc6920-toolbox").serialize;


/*
	Functionality
*/

var array = function (string, options) {
	// Defaults
	options = { 
		algorithms: options.algorithms || ["sha-256"],
		authority: options.authority || "",
		parameters: options.parameters || {}
	}; // TODO: Mixin
	return options.algorithms.slice(0) // Array clone
		.map(function (algorithm) { 
			return serialize({
				authority: options.authority,
				algorithm: algorithm,
				data: string,
				paramaters: options.parameters
			});
		});
};


var string = function (string, options) {
	// Defaults
	options.delimiter = options.delimiter || " "; // TODO: Mixin
	return array(options).join(options.delimiter);
};


/*
	Exports
*/

if (typeof module !== "undefined") {
	module.exports = {
		array: array,
		string: string
	};
}
