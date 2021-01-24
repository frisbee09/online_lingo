const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const common = require("./webpack.common");
const devConfig = require("./webpack.dev.config");

/**
 * Development config for running the frontend I can't remember if I solved the
 * issue of getting the backend to serve the bundle AND being able to hot reload
 * off the back of it
 *
 * Hence, we have a webserver for each
 */
module.exports = merge(common, devConfig, {
  entry: ["react-hot-loader/patch", "./client/index.tsx"],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve("./dist"),
    publicPath: "/",
    filename: "client.js",
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        include: /node_modules/,
        use: ["react-hot-loader/webpack"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "client", "index.html"),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "client", "content"),
    historyApiFallback: true,
    host: "0.0.0.0",
    public: "http://localhost:8080",
    hot: true,
    open: true,
    openPage: "",
    proxy: {
      "*": "http://[::1]:3000",
    },
  },
  devtool: "source-map",
});
