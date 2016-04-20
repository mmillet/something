var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_PATH = path.join(__dirname, './src');
const DIST_PATH = path.join(__dirname, './dist');

module.exports = {
  entry: {
    simple: path.join(SRC_PATH, 'simple/index.js'),
    immutable: path.join(SRC_PATH, 'immutable/index.js'),
    calc: path.join(SRC_PATH, 'calc/index.js'),
    render: path.join(SRC_PATH, 'render/index.js')
  },
  output: {
    path: DIST_PATH,
    publicPath: '',
    filename: '[name].js',
    chunkFilename: `[name].js`
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /\.less$/, include: /src/, loader: 'style!css!less?outputStyle=expanded'},
      {test: /\.(png|gif|jpg|ico)$/, loader: 'url?limit=1024&name=img/[name].[ext]'},
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=1000&mimetype=application/font-woff&name=font/[name].[ext]'},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=1000&mimetype=application/font-woff&name=font/[name].[ext]'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=1000&mimetype=application/octet-stream&name=font/[name].[ext]'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=font/[name].[ext]'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=1000&mimetype=image/svg+xml&name=font/[name].[ext]'}
    ]
  },
  devServer: {
    hot: true,
    inline: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'simple.html',
      template: path.join(SRC_PATH, 'simple/index.html'),
      chunks: ['simple']
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'immutable.html',
      template: path.join(SRC_PATH, 'immutable/index.html'),
      chunks: ['immutable']
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'calc.html',
      template: path.join(SRC_PATH, 'calc/index.html'),
      chunks: ['calc']
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'render.html',
      template: path.join(SRC_PATH, 'render/index.html'),
      chunks: ['render']
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    })
  ]
}