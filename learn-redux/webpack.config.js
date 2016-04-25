var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_PATH = path.join(__dirname, './src');
const DIST_PATH = path.join(__dirname, './dist');

const getHtmlFilesPlugins = (htmlFiles) => {
  return htmlFiles.map((item) => {
    return new HtmlWebpackPlugin({
      inject: true,
      filename: item.filename,
      template: path.join(SRC_PATH, item.path),
      chunks: item.chunks
    })
  })
}

module.exports = {
  entry: {
    simple: path.join(SRC_PATH, 'simple/index.js'),
    immutable: path.join(SRC_PATH, 'immutable/index.js'),
    calc: path.join(SRC_PATH, 'calc/index.js'),
    render: path.join(SRC_PATH, 'render/index.js'),
    renderRedux: path.join(SRC_PATH, 'render/index-redux.js'),
    reselect: path.join(SRC_PATH, 'reselect/index.js'),
    middleware: path.join(SRC_PATH, 'middleware/index.js'),
    middlewareThunk: path.join(SRC_PATH, 'middleware/thunk.js'),
    middlewarePromise: path.join(SRC_PATH, 'middleware/promise.js')
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
  plugins: getHtmlFilesPlugins([
    {
      filename: 'simple.html',
      path: 'simple/index.html',
      chunks: ['simple']
    },
    {
      filename: 'immutable.html',
      path: 'immutable/index.html',
      chunks: ['immutable']
    },
    {
      filename: 'calc.html',
      path: 'calc/index.html',
      chunks: ['calc']
    },
    {
      filename: 'render.html',
      path: 'render/index.html',
      chunks: ['render']
    },
    {
      filename: 'renderRedux.html',
      path: 'render/index.html',
      chunks: ['renderRedux']
    },
    {
      filename: 'reselect.html',
      path: 'reselect/index.html',
      chunks: ['reselect']
    },
    {
      filename: 'middleware.html',
      path: 'middleware/index.html',
      chunks: ['middleware']
    },
    {
      filename: 'middlewareThunk.html',
      path: 'middleware/thunk.html',
      chunks: ['middlewareThunk']
    },
    {
      filename: 'middlewarePromise.html',
      path: 'middleware/promise.html',
      chunks: ['middlewarePromise']
    },
    {
      filename: 'index.html',
      path: 'index.html',
      chunks: []
    },
  ]).concat([
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    })
  ])
}