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
    "correct usage": `
      import JSONParse from '../macro';

      const json1 = JSONParse('{"name1": "raw.macro1"}');
      const json2 = JSONParse({name2: "raw.macro2"});
      const json3 = JSONParse({x: 1, y: 2, z: 3});
    `,
  },
});
