const path = require('path')
const process = require('process')
const webpack = require('webpack')

const nodeModuleDir = path.resolve(process.cwd(), 'node_module')
const appDir = path.resolve(process.cwd(), 'app')

const config = {
  entry: {},
  output: {
    path: path.resolve(process.cwd(), 'build'),
    chunkFilename: '[name].[chunkhash:5].chunk.js',
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   React: 'react',
    //   ReactDom: 'react-dom',
    //   PropTypes: 'prop-types'
    // }),
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require('../dll/dll.manifest.json')
    }),
  ],
  module: {
    rules: [{
      test: /\.(js)$/,
      use: ['babel-loader'],
      include: [appDir],
      exclude: [nodeModuleDir]
    }]
  }
}

module.exports = config
