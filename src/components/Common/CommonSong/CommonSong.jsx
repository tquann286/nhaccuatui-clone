import React from 'react'
import { Link } from 'react-router-dom'
import './CommonSong.scss'

import { createSongUrl } from 'share/utilities'
import { CommonArtist, SquareImg } from 'components'
import { IconButton } from '@mui/material'

import { BsHeadphones } from 'react-icons/bs'
import { formatNumber } from 'share'
import { IoMdMore } from 'react-icons/io'

const CommonSong = ({ artists, dateRelease, duration, keyId, thumbnail, title, songView }) => {
  return (
    <div className='common-song-container bg-color-0-02 w3-row'>
      <div className='cs-img-container w3-col border-0-05'>
        <SquareImg imageUrl={thumbnail} title={title} />
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
      <div className="cs-content w3-rest">
          <div className="cs-song-title color-0-88">
            <Link to={createSongUrl(title, keyId)}>{title}</Link>
          </div>
          <CommonArtist artists={artists} />
        </div>
    </div>
  )
}

export default CommonSong
