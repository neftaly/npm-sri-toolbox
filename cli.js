#!/usr/bin/env node
'use strict';

var fs = require('fs');
var sriToolbox = require('./main');
var fileName = process.argv.slice(2);
var code = fs.readFileSync(fileName[0]);
var integrity = sriToolbox.generate({
    algorithms: ["sha256", "sha512"]
}, code);
console.log(integrity);

