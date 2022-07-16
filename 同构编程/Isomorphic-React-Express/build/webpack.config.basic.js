const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: config.dirs.source,
  mode: 'production',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: [/node_modules/],
      use: 'babel-loader'
    },{
      test: /\.css$/,
      exclude: [/node_modules/],
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '/'
        },
      },'css-loader']
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css'
    })
  ],
  resolve: {
    extensions: ['.js','.jsx'],
    alias: {
      'isomorphic': path.resolve(config.dirs.source,'./isomorphic')
    }
  }
}