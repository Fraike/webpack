const autoprefixer = require('autoprefixer')
const adaptive = require('postcss-adaptive-rpx')
module.exports = {
  plugins: [
    autoprefixer(),
    adaptive({ remUnit: 75 })
  ]
}