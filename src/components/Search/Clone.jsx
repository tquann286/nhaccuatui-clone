import React from 'react'

const clone = () => {
  return (
    <SwiperSlide
      key={i}
      autoPlay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
    >
      <div className='ta-slider-content'>
        <p className='ta-artist-name'>
          <span className='ta-artist-position'>{position}.</span>
          {name}
        </p>
        <div className='ta-new-label'>
          <div className='ta-new-label-main'>
            <p className='ta-new-label-content'>New</p>
          </div>
        </div>
      </div>
    </SwiperSlide>
  )
}

export default clone
