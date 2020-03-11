import style from './index.css'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { ScrollView, Toast, Swiper, Mask } from './components'
import { useInterval, useFetch } from '../../../utils/userHook'
import { goLive, goIndex, goCharge } from '../../../utils/goto'
import { getQueryString } from '../../../utils/tool'

const Main = () => {

  return (
    <React.Fragment>
      <div className={style.scroll}>

      </div>

      <Toast />
    </React.Fragment>
  )
}
export default Main
