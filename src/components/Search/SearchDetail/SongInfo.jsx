import React from 'react'

const SongInfo = ({ defineLang }) => {
  return (
    <div className='song-info-container'>
      <div className="si-title common-title">{defineLang('Bài hát', 'Song')}</div>
    </div>
  )
}

export default SongInfo