A great foundation that enriches the TypeScript "create react app" project with best practices from eslint, prettier and stylelint. There is a "watch" mode on the npm start operation so you don't have to install formatting / linting plugins for your code editor.

# Motivation
We as developers strive to write the best software codes. This code contains as few bugs as possible and is easy to extend and maintain. It is good practice to adhere to certain guidelines for writing code in a software development project.

## Goals

- We write code that is legible and understandable. The code must be written in a recognizable agreed format, a.k.a code formatting best practices.

- It is important to eliminate as much error code as possible during development. We write code that is bug free and does what it is supposed to do, a.k.a code linting best practices.

Basically, the earlier and faster you can find and fix bugs in the development process, the better!

### Code formatting with Prettier
Prettier is an opinionated code formatter. If you never want to worry about code formatting again, install Prettier in your editor and it will take care of formatting for you. Prettier creates an abstract syntax tree from your code and uses it to write new code formatted according to a set of rules. That’s all it does.

### Code linting with Eslint
ESLint is the most popular JavaScript linter, a tool that analyzes code for errors, which can include stylistic errors but also coding errors that lead to bugs. While Prettier will do little to stop you making coding mistakes, ESLint can be a huge help in this regard.

In other words, use **Prettier for formatting** and **linters for catching bugs!**
Source: https://prettier.io/docs/en/comparison.html

## TypeScript Create React App
[Create React App](https://github.com/facebook/create-react-app) uses ESLint as a code linting tool. We can extend the config or override the linting rules as documented here: https://create-react-app.dev/docs/setting-up-your-editor/

It is good to emphasize that **Prettier is for formatting** and **linters are for catching bugs!**. The command `eslint --fix` is replaced by the Prettier command: `prettier --write`.

### The enhancements
1. Unfortunately, the npm start (ES)Lint terminal output is limited to eslint functionalities. In addition to the standard CRA project, a [StyleLint](https://stylelint.io/) terminal output has also been configured. To do this we need to extend the built-in Webpack configuration. We can easily do this with [CRACO](https://github.com/gsoft-inc/craco). 

**craco.config.js**

```
// eslint-disable-next-line @typescript-eslint/no-var-requires
const StylelintPlugin = require("stylelint-webpack-plugin");

module.exports = {
  webpack: {
    alias: {},
    plugins: [new StylelintPlugin()],
  },
};
```
2. We can choose to npm start the project with prettier auto-formatting feature enabled on file changes. In case you don't want to use a code editor or install a plugin.
```
 "start:auto:format": "npm-run-all -n -p prettier:watch start",
```
with no .prettierrc configured the default is: http://json.schemastore.org/prettierrc

3. ESLint by default does not take the TypeScript language in consideration. We added TypeScript parser and config to the .eslintrc.
```

{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    "react-app",
    "react-app/jest",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint"
  ]
}

```
4. Turns off all ESLint rules that are unnecessary or might conflict with Prettier. (https://github.com/prettier/eslint-config-prettier)
5. Turns off all StyleLint rules that are unnecessary or might conflict Prettier. (https://github.com/prettier/stylelint-config-prettier)
```
{
  "extends": [
    "stylelint-config-recommended",
    "stylelint-config-prettier"
  ]
}
```
