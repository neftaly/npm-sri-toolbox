/*
	sri-toolbox
*/

var R = require("ramda");

var generate = require("./generate");


/*
	Functionality
*/



/*
	Exports
*/

if (typeof module !== "undefined") {
	module.exports = {
		generate: generate
	};
}
