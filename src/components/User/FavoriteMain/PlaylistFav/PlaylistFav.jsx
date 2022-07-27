import React from 'react'
import './PlaylistFav.scss'

const PlaylistFav = ({ defineLang, currentUser }) => {
  console.log('currentUser: ', currentUser)


  return (
    <div className='playlist-fav-container'>
      <div className="playlist-fav-title alcenter-jcbetween">
        <div className="playlist-fav-title-content common-title color-0-88">{defineLang('Danh sách phát', 'Playlist')}</div>
        <div className="clear-all clickable small-common color-0-6">{defineLang('Xóa tất cả', 'Clear all')}</div>
      </div>
    </div>
  )
}

export default PlaylistFav
