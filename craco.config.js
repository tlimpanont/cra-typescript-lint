// eslint-disable-next-line @typescript-eslint/no-var-requires
const StylelintPlugin = require("stylelint-webpack-plugin");

module.exports = {
  webpack: {
    alias: {},
    plugins: [new StylelintPlugin()],
  },
};
