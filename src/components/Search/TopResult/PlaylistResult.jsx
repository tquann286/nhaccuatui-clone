import React from 'react'
import { useNavigate } from 'react-router-dom'

import { CommonArtist, ImageOverlay } from 'components'
import { SwiperSlide } from 'swiper/react'
import { createPlaylistUrl, handleCopyPlaylist } from 'share/utilities'

const PlaylistResult = ({ playlists, defineLang }) => {
  const navigate = useNavigate()

  console.log('playlists: ', playlists)
  if (!playlists) return null

  return (
    <React.Fragment>
      {playlists.map((playlist) => {
        const { artists, key, title, type, thumbnail } = playlist

        return (
          <SwiperSlide key={key}>
            <div className='tr-slider'>
              <div className='tr-thumb-container'>
                <div className='tr-thumb-main'>
                  <ImageOverlay key={key} imageUrl={thumbnail} title={title} handleNavigate={() => navigate(createPlaylistUrl(title, key))} copyLink handleCopyLink={(e) => handleCopyPlaylist(e, title , key, defineLang)} />
                </div>
              </div>
              <div className="tr-description">
                <div className="tr-decoration">#1</div>
                <div className="tr-main-title">{title}</div>
                <CommonArtist artists={artists} />
              </div>
            </div>
          </SwiperSlide>
        )
      })}
    </React.Fragment>
  )
}

export default PlaylistResult
