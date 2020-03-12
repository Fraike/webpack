const commonConfig = require('./webpack.common.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const process = require('process')

const nodeModuleDir = path.resolve(process.cwd(), 'node_module')
const appDir = path.resolve(process.cwd(), 'app')
const ip = require('ip')
const port = 8087
const host = ip.address()

const { routers } = require('../router.json')

const config = webpackMerge(commonConfig, {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(process.cwd(), 'dll'),
    // contentBase: path.join(__dirname, 'build'),
    compress: true,
    open: true,
    openPage: 'index',
    clientLogLevel: 'none',
    port,
    host,
    historyApiFallback: true,
    proxy: {
      '/v1': {
        target: 'https://test1.yuanbobo.com',
        changeOrigin: true
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({ __DEV__: 'true' }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: new RegExp(`^(?!.*\\.common).*\\.css`),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[local]--[hash:base64:5]'
              }
            }
          }, 'postcss-loader'],
        include: [appDir],
        exclude: [nodeModuleDir]
      },
      {
        test: new RegExp(`^(.*\\.common).*\\.css`),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        include: [appDir],
        exclude: [nodeModuleDir]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 2500 }
        }],
        include: [appDir],
        exclude: [nodeModuleDir]
      },
      {
        test:/\.(ttf|eot|woff|woff2)$/,
        use:['file-loader']
      }
    ]
  }
})
routers.map((item) => {
  const {
    name,
    template
  } = item
  const tempSrc = path.resolve(appDir, `./router/${template}/index.html`)
  const plugin = new HtmlWebpackPlugin({
    filename: `${template}`,
    title: '/dll.js',
    template: tempSrc,
    inject: true,
    chunks: [template]
  })
  config.entry[template] = [path.resolve(appDir, `./router/${template}/index.js`)]
  config.plugins.push(plugin)
})

module.exports = config
