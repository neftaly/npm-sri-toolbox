/*
	sri-toolbox-generate
*/

var R = require("ramda");
var serialize = require("rfc6920-toolbox").serialize;

var defaults = R.mixin({
	algorithms: ["sha-256"],
	authority: "",
	parameters: {},
	delimiter: " ",
	serialize: true
});


/*
	Functionality
*/

var array = R.curry(function (options, string) {
	return R.map(function (algorithm) { 
		return serialize({
			authority: options.authority,
			algorithm: algorithm,
			data: string,
			paramaters: options.parameters
		});
	}, options.algorithms);
});


var string = R.curry(function (options, string) {
	return array(options, string).join(options.delimiter);
});


var main = R.curry(function (options, string) {
	options = defaults(options);
	if (options.serialize) return string(options, string);
	return array(options, string);
});


/*
	Exports
*/

if (typeof module !== "undefined") {
	module.exports = main;
}
