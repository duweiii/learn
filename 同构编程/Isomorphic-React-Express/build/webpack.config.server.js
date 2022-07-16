const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const basicConfig = require('./webpack.config.basic.js');

const clientStatFile = path.resolve(config.dirs.dist,'./static/stat.json');
const chunks = JSON.parse(fs.readFileSync(clientStatFile,'utf-8')).assetsByChunkName;
const defineMap = {};
for(const chunkname in chunks){
  chunks[chunkname].forEach(file=>{
    const ext = path.extname(file).replace('.','');
    if(!defineMap[ext]){
      defineMap[ext] = [];
    }
    defineMap[ext].push(`/static/${file}`);
  });
}
module.exports = merge(basicConfig, {
  target: 'node',
  entry: {
    server: path.resolve(config.dirs.source,'./server/index.js')
  },
  output: {
    filename: '[name].js',
    path: config.dirs.dist
  },
  externals: nodeExternals(),
  plugins: [
    new CopyWebpackPlugin([{
      from: `${config.dirs.source}/server/views/`,
      to: `${config.dirs.dist}/views/`,
      ignore: ['.*']
    }]),
    new webpack.DefinePlugin({
      'assets': JSON.stringify(defineMap)
    })
  ]
});