// webpack.config.js
const path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin');

// set auto html webpack plugin up
const _htmlPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
});

const _webpackConfig = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [{
        resource: {
          test: /\.js$/,
          include: [path.resolve(__dirname, 'src')]
        }
      }]
  },
  devtool: 'source-map',
  plugins: [_htmlPluginConfig]
};

module.exports = _webpackConfig;
