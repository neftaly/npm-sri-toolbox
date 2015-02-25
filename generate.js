/*
    sri-toolbox-generate
*/

/*jslint node: true */
"use strict";

var crypto = require("crypto"),
    url = require("url"),

    defaults = function (options) {
        return {
            algorithms: options.algorithms || ["sha256"],
            delimiter: options.delimiter || " ",
            type: options.type,
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

    // Build content-type string
    type = function (options) {
        if (!options.type) {
            return "";
        }

        return "type:" +
            // Break at whitespace. Remove any unexpected chars.
            options.type.replace(/(\s.*)|[^\w\/\-]/g, "") +
            options.delimiter;
    },

    // Generate SRI-formatted hash string
    hashes = function (options, data) {
        return options.algorithms
            .map(function (algorithm) {
                return algorithm + "-" + digest(algorithm, data);
            })
            .join(options.delimiter);
    },

    main = function (options, data) {
        // Defaults
        options = defaults(options);
        return type(options) + hashes(options, data);
    };


/*
    Exports
*/

if (module !== undefined) {
    module.exports = main;
}
