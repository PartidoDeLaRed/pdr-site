# NJStream

Newline delimited JSON streaming made easy

## Installation
      $ npm install njstream

## Examples

### Simple usage
```js
var NJStream = require('njstream');
var njstream = new NJStream();

njstream.on('parsed', function(json_data){
  console.log(json_data);
});

for(var i = 0; i < 100000; i++){
  stream.write(JSON.stringify({"foo": "bar"}) + '\r\n');
}
```

### Using superagent
```js
var request = require('superagent')
  , NJStream = require('njstream');

var njstream = new NJStream();

njstream.on('parsed', function(json_data){
  console.log(json_data);
});

request
.get('http://your.server/')
.pipe(njstream);

```

### Passing it to an http request
```js
var http = require('http')
  , NJStream = require('njstream');

var njstream = new NJStream();

njstream.on('parsed', function(json_data){
  console.log(json_data);
});

var request = http.get('your.domain.io/json_delimited_data/');

request.on('response', function(res){
  res.pipe(njstream);
});
```
