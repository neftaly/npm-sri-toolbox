# subresource-integrity
[Subresource Integrity](http://www.w3.org/TR/SRI/) toolbox.

Install
-------
```shell
npm install subresource-integrity
```

Example
-------
```javascript
element1.integrity = sri.generate.string(jquerySourceCode);

element2.integrity = sri.generate.string(
	jquerySourceCode,
	{
		algorithms: { 
			"sha-256": "SHA256", 
			"sha-512": "SHA512" 
		},
		authority: "code.jquery.com",
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

#### `generate.array (`*required*`data, `*optional*`options)`
*Returns `[string...]`.*  
Generate an array of ni-URI strings.  

**data:**  
String to be processed  

**options:**
* **`algorithms:`** `{ "client algo name": "server algo name" }`  
    *Default: `{ "sha-256": "SHA256" }`*

    A list of desired hash functions, organized by priority.  
    For example, `{ "sha-256": "SHA256", "sha-512": "SHA512" }`.
    * `"client algo name"` refers to a browser message digest algorithm.
    * `"server algo name"` refers to an OpenSSL message digest algorithm.  
            To list OpenSSL message digest algorithms:  
            `# openssl list-message-digest-algorithms`  

* **`authority:`** `"hostname"`  
    *Default: `""`*

    [RFC6920](https://tools.ietf.org/html/rfc6920) Authority value  
    > Authority:  The optional authority component may assist applications
    >     in accessing the object named by an ni-URI.  There is no default
    >     value for the authority field.  (See Section 3.2.2 of [RFC3986]
    >     for details.)  While ni names with and without an authority differ
    >     syntactically from ni names with different authorities, all three
    >     refer to the same object if and only if the digest algorithm,
    >     length, and value are the same.

* **`parameters:`** `{ "name": "value" }`  
    *Default: `{ }`*

    URI parameters, to be appended to each ni-URI.  
    For example, a content-type specifier: `{ "ct": "text/plain" }`  


#### `generate.string (`*required*`data, `*optional*`options, `*optional*`delimiter)`
*Returns `"ni-URI"`.*  
Generate a delimited string of ni-URI's.  

**Facade for `generate.array`**, with an additional `delimiter` parameter.  

**delimiter:**  
*Default: `" "`*  
String inserted between ni-URI's  

