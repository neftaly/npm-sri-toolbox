# sri-toolbox [![Build Status](https://travis-ci.org/neftaly/npm-sri-toolbox.svg?branch=master)](https://travis-ci.org/neftaly/npm-sri-toolbox)

[Subresource Integrity](http://www.w3.org/TR/SRI/) tools.

Install
-------
```shell
npm install sri-toolbox
```

Usage
-----
```javascript
var sriToolbox = require("sri-toolbox");

var jquerySourceCode = file("jquery-1.10.2.min.js");

var integrity = sriToolbox.generate({
    type: "application/javascript",
    algorithms: ["sha256"],
}, jquerySourceCode);
//=> "type:application/javascript sha256-C6CB9UYIS9UJeqinPHWTHVqh/E1uhG5Twh+Y5qFQmYg="
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
