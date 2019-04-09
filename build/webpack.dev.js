const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const baseConfig = require("./webpack.base.js");

const devConfig = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    hot: true,
    open: true,
    compress: false,
    historyApiFallback: true,
    clientLogLevel: "none"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: '\'autoprefixer-loader\'',
          }
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  }
};

module.exports = merge(baseConfig, devConfig);
