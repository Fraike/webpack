import 'babel-polyfill'
import 'whatwg-fetch'
import React from 'react'
import { render } from 'react-dom'

import './index.css'
import Main from './page'
import '../../utils/resize'

import './common/index.common.css'

window.onload = function () {
  render(<Main />, document.getElementById('main'))
}
