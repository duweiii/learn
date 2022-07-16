const path = require('path');
const merge = require('webpack-merge');
const config = require('./config');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const basicConfig = require('./webpack.config.basic.js');
const { StatsWriterPlugin } = require("webpack-stats-plugin")

module.exports = merge(basicConfig, {
  target: 'web',
  entry: {
    index: path.resolve(config.dirs.source,'./client/index.js')
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.join(config.dirs.dist, './static'),
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new StatsWriterPlugin({
      filename:'stat.json'
    })
  ]
});