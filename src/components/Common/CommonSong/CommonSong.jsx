import React from 'react'
import './CommonSong.scss'

import { SquareImg } from 'components'
import { BsHeadphones } from 'react-icons/bs'
import { formatNumber } from 'share'
import { IoMdMore } from 'react-icons/io'
import { IconButton } from '@mui/material'

const CommonSong = ({ artists, dateRelease, duration, key, thumbnail, title, songView }) => {
  return (
    <div className='common-song-container bg-color-0-02 w3-row'>
      <div className='cs-img-container w3-col border-0-05'>
        <SquareImg imageUrl={thumbnail} />
      </div>
      <div className='cs-extend w3-col w3-right'>
        <div className='cs-view-count w3-row'>
          <div className='cs-head-phone w3-col color-0-5'>
            <BsHeadphones />
          </div>
          <div className='cs-view-count-content w3-col color-0-5'>{formatNumber(songView)}</div>
        </div>
        <div className='cs-more-options'>
          <IconButton className='cs-more-btn' size='large'>
            <div className='cs-more-icon color-0-5'>
              <IoMdMore />
            </div>
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default CommonSong
