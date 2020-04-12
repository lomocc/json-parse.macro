const path = require("path");
const pluginTester = require("babel-plugin-tester");
const plugin = require("babel-plugin-macros");
const prettier = require("prettier");

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: {
    filename: __filename,
  },
  formatResult(result) {
    return prettier.format(result, { trailingComma: "es5" });
  },
  tests: {
    "no usage": `import JSONParse from '../macro'`,
    "correct usage function": `
      import JSONParse from '../macro';

      const json1 = JSONParse('{"name1": "raw.macro"}');
      const json2 = JSONParse({name2: "raw.macro"});
      const json3 = JSONParse({x: 1, y: 2, z: 3});
      
    `,
    "correct usage tag": `
      import JSONParse from '../macro';

      const json4 = JSONParse\`{"name4": "raw.macro"}\`;
      const json5 = JSONParse\`{"x": 1, "y": 2, "z": 3}\`;
    `,
  },
});
