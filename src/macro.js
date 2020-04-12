const { createMacro, MacroError } = require("babel-plugin-macros");

export default createMacro(rawMacros);

function rawMacros({ state, babel, references: { default: referencePaths } }) {
  referencePaths.forEach(referencePath => {
    if (referencePath.parentPath.type === "CallExpression") {
      asFunction(referencePath, state, babel);
      // value = parentPath.node.arguments[0].value;
    } else if (referencePath.parentPath.type === "TaggedTemplateExpression") {
      asTag(referencePath, state, babel);
      // const string = quasiPath.parentPath.get("quasi").evaluate().value;
      // value = parentPath.node.quasi.quasis[0].value.cooked;
    }
  });
}
function asTag(referencePath, { file: { opts: fileOpts } }, babel) {
  const expressions = referencePath.parentPath.get("quasi").get("expressions");
  if (expressions && expressions.length) {
    const { line } = referencePath.parentPath.node.loc.start;
    throw new MacroError(
      `Invalid input given to json-parse.macro at line ${line}`,
    );
  }

  const string = referencePath.parentPath.get("quasi").evaluate().value;
  referencePath.parentPath.replaceWith(
    getReplacement({
      string,
      fileOpts,
      babel,
    }),
  );
}

function asFunction(referencePath, { file: { opts: fileOpts } }, babel) {
  const string = referencePath.parentPath.get("arguments")[0].evaluate().value;
  referencePath.parentPath.replaceWith(
    getReplacement({
      string,
      fileOpts,
      babel,
    }),
  );
}
function getReplacement({ string, fileOpts, args, babel }) {
  // const variableDeclarationNode = babel.template(`var x = ${string}`, {
  //   preserveComments: true,
  //   placeholderPattern: false,
  //   ...fileOpts.parserOpts,
  //   sourceType: "module",
  // })();
  let stringified =
    typeof string === "string" ? string : JSON.stringify(string);
  console.log("string", stringified);

  // return variableDeclarationNode.declarations[0].init;
  return babel.template(`JSON.parse('${stringified}')`, {
    preserveComments: true,
    placeholderPattern: false,
    ...fileOpts.parserOpts,
    sourceType: "module",
  })();
}
