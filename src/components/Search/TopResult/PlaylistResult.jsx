import React from 'react'

import { ImageOverlay } from 'components'
import { SwiperSlide } from 'swiper/react'
import { handleCopyPlaylist } from 'share/utilities'

const PlaylistResult = ({ playlists, defineLang }) => {
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
                  <ImageOverlay key={key} imageUrl={thumbnail} title={title} copyLink handleCopyLink={(e) => handleCopyPlaylist(e, title , key, defineLang)} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        )
      })}
    </React.Fragment>
  )
}

export default PlaylistResult
