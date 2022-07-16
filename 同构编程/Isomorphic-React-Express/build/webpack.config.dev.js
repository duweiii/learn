const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const clientConfig = require('./webpack.config.client.js');

module.exports = merge(clientConfig, {
  mode: 'development',
  devtool: '#source-map',
  devServer: {
      hot: true,
      port: 9996,
      host: '0.0.0.0',
      inline: true,
      clientLogLevel: 'error',
      index: 'index.html',
      publicPath: '/',
      historyApiFallback: true
  },
  plugins: [
      new HtmlWebpackPlugin({
          filename: 'index.html',
          template: `${config.dirs.root}/index.html`,
          inject: true
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
  ]
});