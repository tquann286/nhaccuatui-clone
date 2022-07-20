import React from 'react'
import './CommonSong.scss'

import { SquareImg } from 'components'

const CommonSong = ({ artists, dateRelease, duration, key, thumbnail, title }) => {

  return (
    <div className="common-song-container bg-color-0-02 w3-row">
      <div className="cs-img-container w3-col border-0-05">
        <SquareImg imageUrl={thumbnail} />
      </div>
    </div>
  )
}

export default CommonSong