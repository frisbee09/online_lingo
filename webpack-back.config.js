const merge = require("webpack-merge");
const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const common = require("./webpack.common");
const devConfig = require("./webpack.dev.config");

/**
 * Development config for running the backend
 */
module.exports = merge(common, devConfig, {
  entry: { server: "./server/index.ts" },
  output: {
    path: path.resolve("./dist"),
    filename: "server.js",
  },
  watch: true,
  target: "node",
  externals: [nodeExternals()],
  plugins: [new NodemonPlugin()],
  devtool: "source-map",
});
