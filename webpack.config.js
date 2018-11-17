const path = require('path')

const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const contextPath = path.resolve(__dirname, './src/app')
const outputPath = path.resolve(__dirname, './build')

const env = process.env.NODE_ENV || 'development'

const plugins = [
  new CopyWebpackPlugin([{ from: './static' }]),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(env)
  })

]

const appEntry = [
  'react-hot-loader/patch',
  'webpack-hot-middleware/client',
  '@babel/polyfill',
  './index.js'
]

module.exports = {
  mode: 'development',
  entry: {
    app: appEntry,
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name]-bundle.js',
    path: outputPath,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
    ]
  },
  context: contextPath,
  plugins,
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'src/app'),
      components: path.resolve(__dirname, 'src/app/components'),
      core: path.resolve(__dirname, 'src/app/core'),
      util: path.resolve(__dirname, 'src/app/util'),
    }
  }
}
