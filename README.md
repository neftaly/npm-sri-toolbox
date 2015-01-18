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

sriToolbox({ options }, data); //=> result
```

**Note:** this module supports [currying](http://fr.umio.us/favoring-curry/).
```javascript
var sriToolboxer = sriToolbox({ option });

sriToolboxer(data); //=> result
```

Options
-------
Key: type **name** *= default*  

* type **name** *= value*  
	Description







---

Example
-------
```javascript
element1.integrity = sri.generate.string(jquerySourceCode);

element2.integrity = sri.generate.string(
    jquerySourceCode,
    {
        algorithms: [
            "sha-256",
            "sha-512"
        ],
        authority: "code.jquery.com",
        delimiter: " \n",
        parameters: {
            "ct": "text/javascript"
        }
    },
    " \n"
);
```

API
---
### `generate`
Functions responsible for Subresource Integrity ni-URI generation  

---

#### `generate.array (`*required* `data, `*optional* `options)`
*Returns `["string"...]`.*  
Generate an array of ni-URI strings.  

#### `generate.string (`*required* `data, `*optional* `options)`
*Returns `"string..."`.*  
Generate a delimited string of ni-URI's.  

---

**data:**  
String to be hashed

**options:**
* **`algorithms:`** `["name"...]`  
    *Default: `["sha-256"]`*

    Array of [RFC6920](https://tools.ietf.org/html/rfc6920#section-3) Digest Algorithms  
    > Digest Algorithm:  The name of the digest algorithm, as specified in
    >     the IANA registry defined in [Section 9.4](https://tools.ietf.org/html/rfc6920#section-9.4).
    For example, `[ "sha-256", "sha-512" ]`

* **`authority:`** `"hostname"`  
    *Default: `""`*

    [RFC6920](https://tools.ietf.org/html/rfc692#section-3) Authority value  
    > Authority:  The optional authority component may assist applications
    >     in accessing the object named by an ni-URI.  There is no default
    >     value for the authority field.  (See Section 3.2.2 of [RFC3986]
    >     for details.)  While ni names with and without an authority differ
    >     syntactically from ni names with different authorities, all three
    >     refer to the same object if and only if the digest algorithm,
    >     length, and value are the same.

* **`delimiter:`** `"delimiter"`  
    *Default: `" "`*

    `generate.string` ni-URI delimiter.  

* **`parameters:`** `{ "name": "value" }`  
    *Default: `{ }`*

    Deserialized list of [RFC6920](https://tools.ietf.org/html/rfc6920#section-3) Query Parameters  
    For example, a content-type specifier: `{ "ct": "text/plain" }`  
