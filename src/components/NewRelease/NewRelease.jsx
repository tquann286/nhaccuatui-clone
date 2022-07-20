import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import './NewRelease.scss'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

import { GoCalendar } from 'react-icons/go'
import { BsPlayCircleFill } from 'react-icons/bs'

import { covertTimestamp, createArtistUrl, createSongUrl } from 'share/utilities'
import { activeSlideSettings, thumbSlideSettings } from 'services/NewRelease'

import { useStore } from 'store'

const NewRelease = ({ newRelease: { song: newSong } }) => {
  const [state] = useStore()
  const { lang } = state

  const [slide, setSlide] = useState({
    activeSlide: null,
    thumbSlide: null,
  })

  const activeSlideRef = useRef(null)
  const thumbSlideRef = useRef(null)

  useEffect(() => {
    setSlide({
      activeSlide: activeSlideRef.current,
      thumbSlide: thumbSlideRef.current,
    })
  }, [])

  return (
    <div className='nr-container'>
      <Link to='/' className='nr-title'>
        {lang === 'vi' ? 'Mới phát hành' : 'New Releases'}
      </Link>
      <div className='nr-main'>
        <div className='nr-active-slide bg-color-0-02'>
          <Slider {...activeSlideSettings} asNavFor={slide.thumbSlide} ref={activeSlideRef}>
            {newSong.map((song) => {
              const { key, artists, dateRelease, thumbnail, title } = song

              return (
                <div key={key} className='nr-active-container'>
                  <Link to={createSongUrl(title, key)} className='nr-active-img' title={title}>
                    <img src={thumbnail} alt={title} />
                  </Link>
                  <div className='nr-active-detail'>
                    <Link to={createSongUrl(title, key)}>
                      <h4 className='color-0-88'>{title}</h4>
                    </Link>
                    <div className='nr-artist-container'>
                      <div className='nr-artist-main'>
                        <div className='nr-artist-img-container'>
                          {artists.map((artist) => {
                            const { artistId, imageUrl, name, shortLink } = artist

                            return (
                              <Link to={createArtistUrl(name, shortLink, artistId)} key={artistId} className='nr-artist-img'>
                                <img src={imageUrl} />
                              </Link>
                            )
                          })}
                        </div>

                        <div className='nr-artist-name color-0-5'>
                          {artists.map((artist, index) => {
                            const { artistId, name, shortLink } = artist

                            return (
                              <React.Fragment key={artistId}>
                                <Link to={createArtistUrl(name, shortLink, artistId)} key={artistId}>
                                  <span>{name}</span>
                                </Link>
                                {index + 1 === artists.length ? '' : ', '}
                              </React.Fragment>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                    <div className='nr-date-release color-0-5'>
                      <GoCalendar />
                      <span>
                        {lang === 'vi' ? 'Ngày phát hành' : 'Released date'}: {covertTimestamp(dateRelease)}
                      </span>
                    </div>
                    <div className='line-throught'></div>
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
      </div>
      <div className='nr-thumb-slider'>
        <Slider {...thumbSlideSettings} asNavFor={slide.activeSlide} ref={thumbSlideRef}>
          {newSong.map((song) => {
            const { key, thumbnail, title } = song

            return (
              <Link key={key} to={createSongUrl(title, key)} className='nr-thumb-img' title={title}>
                <img src={thumbnail} alt={title} />
                <div className='blur'>
                  <BsPlayCircleFill />
                </div>
              </Link>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}

export default NewRelease
