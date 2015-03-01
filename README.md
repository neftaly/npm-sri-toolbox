# sri-toolbox [![Build Status](https://travis-ci.org/neftaly/npm-sri-toolbox.svg?branch=master)](https://travis-ci.org/neftaly/npm-sri-toolbox) [![Coverage Status](https://coveralls.io/repos/neftaly/npm-sri-toolbox/badge.svg)](https://coveralls.io/r/neftaly/npm-sri-toolbox)

[Subresource Integrity](http://www.w3.org/TR/SRI/) tools.

**SemVer note:** As the SRI spec has not yet been finalized, minor releases < 1.0.0 will contain breaking changes.

Install
-------
```shell
npm install sri-toolbox
```

Usage
-----
```js
var sriToolbox = require("sri-toolbox");

var jquerySourceCode = file("jquery-1.10.2.min.js");

var integrity = sriToolbox.generate({
    type: "application/javascript",
    algorithms: ["sha256"],
}, jquerySourceCode);
//=> "type:application/javascript sha256-C6CB9UYIS9UJeqinPHWTHVqh/E1uhG5Twh+Y5qFQmYg="
```

You may also access the data used to build the integrity attribute, using the option "full":
```js
var integrityObject = sriToolbox.generate({
    full: true,
    type: "application/javascript; charset: utf8"
}, jquerySourceCode);
//=> object
```
```json
{
    "hashes": {
        "sha256": "C6CB9UYIS9UJeqinPHWTHVqh/E1uhG5Twh+Y5qFQmYg="
    },
    "type": "application/javascript",
    "integrity": "type:application/javascript sha256-C6CB9UYIS9UJeqinPHWTHVqh/E1uhG5Twh+Y5qFQmYg="
}
```

API
-------

### generate

Generate creates a Sub-resource Integrity attribute from a data string.

#### Options

Key: type **name** *= default*  

* array **algorithms** *= ["sha256"]*  
    List of hashing algorithms

* string **delimiter** *= " "*  
    Integrity attribute delimiter

* string **type** *= ""*  
    Content-type of file

* boolean **full** *= false*  
    Return a string if false, object if true. See example.
