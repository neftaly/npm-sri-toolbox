4/*
	sri-toolbox-generate
*/

var R = require("ramda");
var rfc6920Toolbox = require("rfc6920-toolbox");

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

var array = R.curry(function (options, dataString) {
	return R.map(function (algorithm) { 
		return rfc6920Toolbox.serialize({
			authority: options.authority,
			algorithm: algorithm,
			digest: rfc6920Toolbox.digest(algorithm, dataString),
			parameters: options.parameters
		});
	}, options.algorithms);
});


var string = R.curry(function (options, dataString) {
	return array(options, dataString).join(options.delimiter);
});


var main = R.curry(function (options, dataString) {
	options = defaults(options);
	if (options.serialize) return string(options, dataString);
	return array(options, string);
});


/*
	Exports
*/

if (typeof module !== "undefined") {
	module.exports = main;
}
