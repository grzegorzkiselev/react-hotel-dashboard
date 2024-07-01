
  // extends: [
  //   "eslint:recommended",
  //   "plugin:@typescript-eslint/recommended",
  //   "plugin:react-hooks/recommended",
  // ],
const reactRefresh = require("react-refresh");
const typescriptParser = require("@typescript-eslint/parser");
const { configs: eslint } = require("@eslint/js");
const { configs } = require("typescript-eslint");
// const { reactHooks } = require("react-hooks");

module.exports = [
  eslint.recommended,
  typescriptEslint.recommended,
  {
    languageOptions: {
      parser: typescriptParser,
    },
    files: ["**/*.ts", "**/*.js"],
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      "arrow-body-style": ["off", "as-needed"],
      "brace-style": ["warn", "1tbs"],
      "class-methods-use-this": ["warn"],
      "consistent-return": ["warn"],
      "comma-dangle": ["error", {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "only-multiline",
        "exports": "only-multiline",
        "functions": "only-multiline",
      }],
      "curly": ["error", "all"],
      "eqeqeq": ["warn", "smart"],
      "func-names": ["warn"],
      "indent": ["error", 2],
      "max-classes-per-file": ["off"],
      "max-len":
        [
          "off",
          80,
          {
            ignoreComments: true,
            ignoreTrailingComments: true,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
          },
        ],
      "no-alert": ["warn"],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-await-in-loop": ["warn"],
      "no-debugger": ["warn"],
      "no-multi-assign": ["off"],
      "no-param-reassign": ["error", { props: false }],
      "no-plusplus": ["warn"],
      "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
      "no-return-assign": ["error", "except-parens"],
      "no-return-await": ["warn"],
      "no-shadow":
        [
          "off",
          {
            hoist: "all",
            allow: ["resolve", "reject", "done", "next", "err", "error"],
          },
        ],
      "no-trailing-spaces": ["error"],
      "no-underscore-dangle": ["off"],
      "no-unused-expressions":
        [
          "warn",
          {
            allowTaggedTemplates: true,
            allowShortCircuit: true,
            allowTernary: true,
          },
        ],
      "no-unused-vars":
        [
          "warn",
          {
            ignoreRestSiblings: true,
            argsIgnorePattern: "res|next|^err|^_",
            varsIgnorePattern: "^_",
          },
        ],
      "no-use-before-define": ["warn"],
      "no-var": ["warn"],
      "prefer-const": ["error", { destructuring: "all" }],
      "prefer-destructuring": ["off"],
      "semi": ["error", "always"],
      "space-before-function-paren": ["off"],
      "vars-on-top": ["warn"],
      "quotes": ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],
      // "react-refresh/only-export-components": [
      //   "warn",
      //   { allowConstantExport: true },
      // ],
      "react/prop-types": ["off"],
  },
}];
