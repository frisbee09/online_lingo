const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  plugins: [new CleanWebpackPlugin()],
};
