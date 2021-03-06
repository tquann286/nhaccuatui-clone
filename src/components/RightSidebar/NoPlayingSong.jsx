import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import noPlayer from 'images/default/default_player_v2.jpg'

import { getTrendingSong } from 'services/RightSidebar/NoPlayingSong'
import { createArtistUrl, createPlaylistUrl, createSongUrl, createTop20Url, createVideoUrl } from 'share/utilities'

const MainContainer = ({ defineSong, children }) => (
  <div className='rb-container'>
    <div className='rb-suggestion border-0-05'>
      <div className='no-playing-song'>
        <div className='main'>
          <img src={noPlayer} alt={defineSong('Thưởng thức nhạc thôi nào!', 'Play music and enjoy')} />
          <p className='title color-0-88'>{defineSong('Thưởng thức những giai điệu theo cách riêng của bạn', 'Enjoy the melody in your own way')}</p>
          <div className='play-now border-0-1 color-0-5'>
            <Link to={createTop20Url('nhac-viet')}>{defineSong('Nghe nào', 'Play now')}</Link>
          </div>
        </div>
      </div>
      {children}
    </div>
  </div>
)

const NoPlayingSong = ({ defineSong }) => {
  const [trendingSong, setTrendingSong] = useState(null)

  useEffect(() => {
    getTrendingSong().then((res) => {
      if (res) {
        setTrendingSong(res)
      }
    })
  }, [])

  if (trendingSong) {
    const { artists, key, thumbnail, title, type } = trendingSong

    const getTrendingLink = () => {
      switch (type) {
        case 'SONG':
          return createSongUrl(title, key)
        case 'PLAYLIST':
          return createPlaylistUrl(title, key)
        case 'VIDEO':
          return createVideoUrl(title, key, artists)
        default:
          break
      }
    }
    
    return (
      <MainContainer defineSong={defineSong}>
        {trendingSong && (
          <div className='suggest-song'>
            <div className='suggest-song-main border-0-1'>
              <div className='suggest-trending-thumb'>
                <Link to={getTrendingLink()}>
                  <img src={thumbnail} alt='thumb' title={title} />
                </Link>
              </div>
              <div className='suggest-trending-info'>
                <p className='suggest-lead-title color-0-5'>{defineSong('Đang được nghe nhiều nhất', 'Top pick these days')}</p>
                <Link className='suggest-title color-0-88' to={getTrendingLink()}>
                  {title}
                </Link>
                <h5 className='suggest-artist color-0-5'>
                  {artists.map((artist, index) => {
                    const { artistId, name, shortLink } = artist

                    return (
                      <React.Fragment key={artistId}>
                        <Link to={createArtistUrl(name, shortLink)}>
                          <span className='suggest-artist-name'>{name}</span>
                        </Link>
                        {index + 1 !== artists.length && ', '}
                      </React.Fragment>
                    )
                  })}
                </h5>
              </div>
            </div>
          </div>
        )}
      </MainContainer>
    )
  }

  return <MainContainer defineSong={defineSong} />
}

export default NoPlayingSong
