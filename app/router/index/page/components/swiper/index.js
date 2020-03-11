import React, { useEffect } from 'react'

const SwiperItem = (state) => {
    useEffect(() => {
        new window.Swiper('.swiper-content', {
            loop: true,
            observeParents: true,
            observer: true,
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: false,
            }
        })
    }, [])
    const renderChildren = () => {
        let swiperDom
        if (state.children.length) {
            swiperDom = state.children.map((c, i) => {
                return (
                    <div className="swiper-slide" key={i}>
                        {c}
                    </div>
                )
            })
        } else {
            return (
                <div className="swiper-slide">
                    {state.children}
                </div>
            )
        }
        return swiperDom
    }
    return (
        <div className="swiper-container swiper-content" style={{ height: '100%' }} >
            <div className="swiper-wrapper">
                {renderChildren()}
            </div>
        </div>
    )
}
export default SwiperItem