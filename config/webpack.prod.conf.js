const commonConfig = require('./webpack.common.config')
const webpackMerge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const AssetsRelacePlugin = require('assets-replace-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const process = require('process')
const webpack = require('webpack')

const nodeModuleDir = path.resolve(process.cwd(), 'node_module')
const appDir = path.resolve(process.cwd(), 'app')
// const outputPath = path.resolve(process.cwd(), 'build')
const outputPath = path.resolve(process.cwd(), '../../statics/activity2020/activitygirlday2020/')
const assestPathName = 'assest'

const { routers } = require('../router.json')

const config = webpackMerge(commonConfig, {
  mode: 'production',
  output: {
    path: outputPath,
    chunkFilename: `${assestPathName}/[name].[chunkhash:5].js`,
    publicPath: '',
    filename: `${assestPathName}/[name].js`
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          compress: { drop_console: true },
          output: { comments: false }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    runtimeChunk: { name: () => { return 'manifest' } },
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        default: {
          name: 'globals',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({ __DEV__: 'false' }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: `${assestPathName}/[name].[chunkhash:5].css` }),
    new AssetsRelacePlugin([
      path.resolve(process.cwd(), '../../../remix/templates/activity2020/activitygirlday2020/index.html'),
    ]),
    new CopyPlugin([
      { from: path.resolve(process.cwd(), 'dll/dll.js'), to: path.join(outputPath, assestPathName) },
    ]),
    new InlineManifestWebpackPlugin('manifest')
  ],
  module: {
    rules: [
      {
        test: new RegExp(`^(?!.*\\.common).*\\.css`),
        use: [MiniCssExtractPlugin.loader, {
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        include: [appDir],
        exclude: [nodeModuleDir]
      },
      {
        test: new RegExp(`^(?!.*\\.common).*\\.(png|svg|jpg|gif)`),
        use: [{
          loader: 'url-loader',
          options: {
            limit: 2500,
            outputPath: assestPathName,
            // 和 JS / CSS 在统一路径下·
            publicPath: './'
          }
        }, {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 85
            },
            // optipng.enabled: false will disable optipng
            optipng: {
              enabled: true,
            },
            pngquant: {
              quality: [0.1, 0.2],
              speed: 4
            },
            gifsicle: {
              interlaced: false,
            },
            // the webp option will enable WEBP
            // webp: {
            //   quality: 75
            // }
          }
        }],
        include: [appDir],
        exclude: [nodeModuleDir]
      },
      {
        test: new RegExp(`^(.*\\.common).*\\.(png|svg|jpg|gif)`),
        use: [{
          loader: 'url-loader',
          options: {
            limit: 2500,
            outputPath: assestPathName,
            // 和 JS / CSS 在统一路径下·
            publicPath: assestPathName
          }
        }, {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65
            },
            // optipng.enabled: false will disable optipng
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: [0.1, 0.2],
              speed: 4
            },
            gifsicle: {
              interlaced: false,
            },
            // the webp option will enable WEBP
            // webp: {
            //   quality: 75
            // }
          }
        }],
        include: [appDir],
        exclude: [nodeModuleDir]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: assestPathName,
            // 和 JS / CSS 在统一路径下·
            publicPath: './'
          }
        }]
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
    filename: `${template}.html`,
    title: `${assestPathName}/dll.js`,
    template: tempSrc,
    inject: true,
    chunks: ['manifest', 'vendors', template]
  })
  config.entry[template] = [path.resolve(appDir, `./router/${template}/index.js`)]
  config.plugins.splice(-1, 0, plugin)
})

module.exports = config
