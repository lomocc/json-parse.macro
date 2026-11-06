# json-parse.macro

## Usage

json-parse.macro is similar to JSON.parse:

```js
import JSONParse from "json-parse.macro";

const json1 = JSONParse('{"name1": "raw.macro1"}');
const json2 = JSONParse({name2: "raw.macro2"});
const json3 = JSONParse({x: 1, y: 2, z: 3});

      ↓ ↓ ↓ ↓ ↓ ↓

const json1 = JSON.parse('{"name1": "raw.macro1"}');
const json2 = JSON.parse('{"name2":"raw.macro2"}');
const json3 = JSON.parse('{"x":1,"y":2,"z":3}');

```

## Installation

In order to use json-parse.macro in your own project, you can use one of the following commands:

```
$ yarn add --dev json-parse.macro
$ npm install --save-dev json-parse.macro
```

## License

MIT
