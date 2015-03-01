/*
    sri-toolbox-generate
*/

/*jslint node:true regexp:true */
"use strict";

var crypto = require("crypto"),
    url = require("url"),

    defaults = function (options) {
        return {
            algorithms: options.algorithms || ["sha256"],
            delimiter: options.delimiter || " ",
            type: options.type,
            full: options.full || false
        };
    },


/*
    Functionality
*/

    // Generate hash
    digest = function (algorithm, data) {
        return crypto
            .createHash(algorithm)
            .update(data)
            .digest("base64");
    },

    // Format content-type
    type = function (options) {
        if (!options.type) {
            return undefined;
        }

        // Cut string at whitespace, then remove any non-whitelisted chars.
        return options.type.replace(/(\s.*)|[^\w\/\!\#\$\&\-\^\+\.]/g, "");
    },

    // Generate list of hashes
    hashes = function (options, data) {
        var hashes = {};
        options.algorithms.forEach(function (algorithm) {
            hashes[algorithm] = digest(algorithm, data);
        });
        return hashes;
    },

    // Build an integrity string
    integrity = function (options, sri) {
        var output = "";

        // Content-type
        output += (sri.type) ? "type:" + sri.type + options.delimiter : "";

        // Hash list
        output += Object.keys(sri.hashes).map(function (algorithm) {
            return algorithm + "-" + sri.hashes[algorithm];
        }).join(options.delimiter);

        return output;
    },

    main = function (options, data) {
        // Defaults
        options = defaults(options);

        var sri = {
            hashes: hashes(options, data),
            type: type(options),
            integrity: undefined
        };
        sri.integrity = integrity(options, sri);

        return (options.full) ? sri : sri.integrity;
    };


/*
    Exports
*/

module.exports = main;
