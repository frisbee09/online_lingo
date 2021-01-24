const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const circular = require("circular-dependency-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin({ terserOptions: { mangle: false } })], // mangle false else mysql blows up with "PROTOCOL_INCORRECT_PACKET_SEQUENCE"
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [new circular()],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
};
