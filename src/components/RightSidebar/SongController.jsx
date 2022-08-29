import React, { useState } from 'react'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { handleRenderSpeakerIcon, volumnSlider } from 'services/RightSidebar/SongController'

const SongController = ({ volumn, setVolumn }) => {

  const handleChangeVolumn = (value) => {
    setVolumn(value)
  }

  const sliderProps = {
    ... volumnSlider,
    value: volumn,
    onChange: handleChangeVolumn
  }

  const handleClickSpeaker = () => {
    if (volumn === 0) {
      setVolumn(100)
    } else {
      setVolumn(0)
    }
  }

  return (
    <div className='w-[27.2rem] m-auto pt-8'>
      <div className='flex justify-between'>
        <div className='group relative w-38px rounded-bl-19px rounded-br-19px cursor-pointer'>
          <div className='z-8' onClick={handleClickSpeaker}>
            <i class={`fa-solid fa-volume-${handleRenderSpeakerIcon(volumn)} color-0-5 w-38px h-38px absolute z-10 bottom-0 rounded-bl-19px rounded-br-19px text-15px p-4`} />
          </div>
          <div className='absolute bottom-0 z-9 left-0 w-full pt-18px pb-36px bg-color-1 rounded-18px origin-bottom opacity-100 scale-0 bg-color-1 transition-all duration-300 invisible shadow-normal select-none group-hover:scale-100 group-hover:visible'>
            <Slider { ... sliderProps } />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SongController
