const webpack = require('webpack')

module.exports = {
  context: __dirname + "/src/app",
  entry: "./index.js",
  target: "node",

  module: {
    loaders: [
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
      {
        test: /\.s(a|c)ss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
      }
    ],
  },

  output: {
    filename: "bundle.js",
    path: __dirname + "/dist",
  },
}
