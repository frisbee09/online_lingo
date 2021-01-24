const webpack = require("webpack");
const { merge } = require("webpack-merge");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackPluginServe: Serve } = require("webpack-plugin-serve");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

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
  entry: ["./client/index.tsx", "webpack-plugin-serve/client"],
  output: {
    path: path.resolve("./dist/public"),
    publicPath: "/",
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: ["react-refresh/babel"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "client", "index.html"),
    }),
    new Serve({
      host: "127.0.0.1",
      port: 8080,
      compress: true,
      historyFallback: {
        disableDotRule: true,
        verbose: true,
        rewrites: [
          {
            from: "/wps/",
            to: (context) => context.parsedUrl.pathname,
          },
          {
            from: /.js/,
            to: (context) => context.parsedUrl.pathname,
          },
        ],
      },
      open: {
        url: "http://localhost:8080",
      },
      static: [
        path.join(__dirname, "dist", "public"),
        path.join(__dirname, "client", "content"),
      ],
    }),
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockIntegration: "wps",
      },
    }),
  ],
  watch: true,
  // devServer: {
  //   contentBase: path.resolve(__dirname, "client", "content"),
  //   historyApiFallback: true,
  //   host: "0.0.0.0",
  //   public: "http://localhost:8080",
  //   hot: true,
  //   open: true,
  //   openPage: "",
  //   proxy: {
  //     "*": "http://[::1]:3000",
  //   },
  // },
  devtool: "source-map",
});
