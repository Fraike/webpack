const path = require('path')
const process = require('process')
const webpack = require('webpack')

const nodeModuleDir = path.resolve(process.cwd(), 'node_module')
const appDir = path.resolve(process.cwd(), 'app')
const entry = {
  'app':[path.resolve(appDir, 'app.js')]
}


module.exports = {
  entry,
  plugins: [
    new webpack.ProvidePlugin({ PropTypes: 'prop-types' }),
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require('../dll/dll.manifest.json')
    }),
    new webpack.DefinePlugin({ __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV || 'true')) })
  ],
  module: {
    rules: [{
      test: /\.(js)$/,
      use: ['babel-loader'],
      include: [appDir],
      exclude: [nodeModuleDir]
    }]
  },
}