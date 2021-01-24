const path = require("path");

const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * Deployment config. Exports both the front AND back webpack configs
 */

const sharedConfig = merge(common, {
  mode: "production",
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
    publicPath: "/",
  },
});

const serverConfig = merge(sharedConfig, {
  target: "node",
  entry: { server: "./server/index.ts" },
  output: {
    path: path.join(__dirname, "dist", "server"),
  },
  // externals: [nodeExternals()],
  plugins: [new CleanWebpackPlugin()],
  node: {
    __dirname: false,
    __filename: false,
  },
});

const clientConfig = merge(sharedConfig, {
  entry: { client: "./client/index.tsx" },
  output: {
    path: __dirname + "/dist/public",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "client", "index.html"),
    }),
  ],
});

module.exports = [serverConfig, clientConfig];
