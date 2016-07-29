var debug = process.env.NODE_ENV !== "production"; //tämä config
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public/js/');
var APP_DIR = path.resolve(__dirname, 'public/components/');

console.log("BUILD_DIR");
console.log(BUILD_DIR);
console.log("APP_DIR");
console.log(APP_DIR);

module.exports = {
  devtool: debug ? "inline-sourcemap" : null,
  entry: APP_DIR + '/App.js',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      }
    ]
  },
  output: {
    path: BUILD_DIR,
    filename: "scripts.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};  