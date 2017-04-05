import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = {
  cache: true,
  entry: {
    "main": "./src/js/main.js"
  },
  output: {
    libraryTarget: "var",
    filename: "[name].js"
  },
  externals: {},
  devtool: "#source-map",
  plugins: [
    new webpack.optimize.DedupePlugin, new webpack.optimize.AggressiveMergingPlugin, new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
      jquery: "jquery"
    }), new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  }
};
