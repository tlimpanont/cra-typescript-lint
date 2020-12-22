A great foundation that enriches the TypeScript "create react app" project with best practices from eslint, prettier and stylelint. There is a "watch" mode on the npm start operation so you don't have to install formatting / linting plugins for your code editor.

# Motivation
We as developers strive to write the best software codes. This code contains as few bugs as possible and is easy to extend and maintain. It is a good practice to adhere to certain guidelines for writing code in a software development project.

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

It is good to emphasize that **Prettier is for formatting** and **linters are for catching bugs!**. Please use `prettier --write` to auto-format your code based on the tylistic rules. `eslint --fix` should not be used to solve this. (https://eslint.org/docs/rules/#stylistic-issues) 

### The recommended enhancements
1. Unfortunately, the npm start (ES)Lint terminal output is limited to eslint functionalities. In addition to the standard CRA project, a [StyleLint](https://stylelint.io/) terminal output has also been configured. To do this we need to extend the built-in Webpack configuration. We can easily do this with [CRACO](https://github.com/gsoft-inc/craco). 

**craco.config.js**

```javascript
// eslint-disable-next-line @typescript-eslint/no-var-requires
const StylelintPlugin = require("stylelint-webpack-plugin");

module.exports = {
  webpack: {
    alias: {},
    plugins: [new StylelintPlugin()],
  },
};
```
2. ESLint by default does not take the TypeScript language in consideration. We added TypeScript parser and config to the .eslintrc.
```json

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
3. Turns off all ESLint rules that are unnecessary or might conflict with Prettier. (https://github.com/prettier/eslint-config-prettier)
4. Turns off all StyleLint rules that are unnecessary or might conflict Prettier. (https://github.com/prettier/stylelint-config-prettier)
```json
{
  "extends": [
    "stylelint-config-recommended",
    "stylelint-config-prettier"
  ]
}
```
5. Don't use `eslint --fix` to auto-fix your code without knowing what your're auto-fixing. It's better to manually fix the issues based on the recommendation you see in the lint output terminal. We should understand the issues and learn how to fix it.  In addition, most auto-fix `eslint --fix` issues are often stylistic which are already solved by prettier.

# The final recommendation
- Displaying Lint output in your editor by installing and enabling ESLint and StyLint plugins.
- Let your editor do the auto-format work by enabling the feature: **Format On Save**. Remember that the auto-format engine must be Prettier! Please install Prettier plugin for your editor. 
- Turns off all ESLint and StyleLint rules that are unnecessary or might conflict with Prettier.
- Creating a shareable lint and format config files for [ESLint](https://eslint.org/docs/developer-guide/shareable-configs), [Prettier](https://prettier.io/docs/en/configuration.html#sharing-configurations) and [StyleLint](https://stylelint.io/user-guide/configure#extends)

For Example:
- Eslint Config require('@theuybv/configs').eslint
- Prettier Config require('@theuybv/config').prettier
- StyleLint Config require('@theuybv/config').stylelint

### Optional enhancements
1. To format our staged code (not all the code in the source but only the one that has been `git add`ed) whenever we make a commit in git, use [pretty-quick](https://github.com/azz/pretty-quick) and [husky](https://github.com/azz/pretty-quick#pre-commit-hook) pre-commit hook
2. (Re)Check the code before pushing to the remote server. `"pre-push": "npm run stylelint && npm run eslint"`.

``` bash
npm i --save-dev husky pretty-quick
```
add this to your **package.json** file

```json
 "husky": {
    "hooks": {
      "pre-commit": "pretty-quick --staged",
      "pre-push": "npm run stylelint && npm run eslint"
    }
  }
```

Both two optional enhancements feels little bit redundant, but this would be a good option when you want to (re)check the code without the use of `npm start | npm start:auto:format` or Editor **Format On Save** feature. e.g. code change via terminal.

3. We can choose to npm start the project with prettier auto-formatting feature enabled on file changes. In case you don't want to use a code editor or install a plugin.
```bash
 "start:auto:format": "npm-run-all -n -p prettier:watch start",
```
with no .prettierrc configured the default is: http://json.schemastore.org/prettierrc
