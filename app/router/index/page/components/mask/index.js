import style from './index.css'
import React, { useState } from 'react'
const Mask = (state) => {
  const { mask, setMask, children } = state
  const renderContent = () => {
    if (children.length) {
      return (
        <div className={`${show ? style.big : style.small}`}>
          <div className={style.child}>
            {children[mask]}
          </div>
        </div>
      )
    } else {
      return (
        <div className={`${show ? style.big : style.small}`}>
          <div className={style.child}>
            {children}
          </div>
        </div>
      )
    }
  }
  const [show, setShow] = useState(true)
  const closeAnima = (e) => {
    if (e.animationName.indexOf('hide') !== -1) {
      setMask('')
      setShow(true)
    }
  }
  return (
    <div className={mask !== '' ? style.modal : style.none}>
      <div className={`${style.bg} ${show ? style.show : style.hide}`} onClick={() => { setShow(false) }} onAnimationEnd={(e) => { closeAnima(e) }}></div>
      {renderContent()}
    </div>
  )
}
export default Mask
