import { ImageOverlay } from 'components'
import React from 'react'
import { SwiperSlide } from 'swiper/react'

const PlaylistResult = ({ playlists }) => {
  console.log('playlists: ', playlists)
  if (!playlists) return null

  return (
    <React.Fragment>
      {playlists.map((playlist) => {
        const { artists, key, title, type, thumbnail } = playlist
        
        const handleCopyLink = () => {}

        return (
          <SwiperSlide key={key}>
            <div className='tr-slider'>
              <div className='tr-thumb-container'>
                <div className='tr-thumb-main'>
                  <ImageOverlay key={key} imageUrl={thumbnail} title={title} copyLink handleCopyLink={handleCopyLink} />
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
