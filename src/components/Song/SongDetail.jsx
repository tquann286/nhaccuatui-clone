import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { OptionModal } from 'components'

import { BsHeadphones, BsLink45Deg, BsMusicNote } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'
import { SiYoutubemusic } from 'react-icons/si'

import { createSongUrl, createArtistUrl, handleCopySong } from 'share/utilities'
import { createRandomSongView } from 'services/SongDetail'

const SongDetail = ({ artists, songId, thumbnail, title, lang }) => {
  const [songView, setSongView] = useState(0)
  const [showMoreOptions, setShowMoreOptions] = useState(false)

  const songContainerRef = useRef(null)
  const moreDivRef = useRef(null)

  const navigate = useNavigate()
  const defineLang = (vie, eng) => lang === 'vi' ? vie : eng

  useEffect(() => {
    setSongView(createRandomSongView())
  }, [])

  const toggleShowMore = () => {
    setShowMoreOptions(!showMoreOptions)
  }

  const handleMoreOptions = (e) => {
    e.stopPropagation()
    toggleShowMore()
  }

  const onCopyClick = (e) => {
    toggleShowMore()
    handleCopySong(e, defineLang, title, songId)
  }

  return (
    <React.Fragment>
      <div className='sd-container' ref={songContainerRef}>
        <div className={`sd-main ${showMoreOptions ? 'focus' : 'non-focus'}`}>
          <Link to={createSongUrl(title, songId)} className='sd-thumbnail' title={title}>
            <div className='sd-thumb-img' style={{ backgroundImage: `url(${thumbnail})` }}></div>
          </Link>
          <div className='sd-more'>
            <div className='sd-view-count'>
              <BsHeadphones />
              <div className='sc-view-number'>{songView}</div>
            </div>
            <div className='sd-more-options'>
              <div className='sd-three-dots' ref={moreDivRef} onClick={(e) => handleMoreOptions(e)}>
                <IoMdMore />
              </div>
            </div>
          </div>
          <div className='sd-song-details'>
            <div className='sd-song-title'>
              <Link to={createSongUrl(title, songId)}>{title}</Link>
            </div>
            <div className='sd-artists'>
              {artists.map((artist, i) => {
                const { artistId, name, shortLink } = artist

                return (
                  <React.Fragment key={artistId}>
                    <Link to={createArtistUrl(name, shortLink, artistId)}>
                      <span>{name}</span>
                    </Link>
                    {i + 1 === artists.length ? '' : ', '}
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <OptionModal showModal={showMoreOptions} positionRef={songContainerRef} parentRef={moreDivRef} toggleModal={toggleShowMore}>
        <div className='om-main'>
          <ul>
            <li>
              <SiYoutubemusic />
              <span>{lang === 'vi' ? 'Thêm vào chờ phát' : 'Add to queue'}</span>
            </li>
            <li onClick={(e) => onCopyClick(e)}>
              <BsLink45Deg />
              <span>{lang === 'vi' ? 'Sao chép link' : 'Copy link'}</span>
            </li>
            <li onClick={() => navigate(createSongUrl(title, songId))}>
              <BsMusicNote />
              <span>{lang === 'vi' ? 'Đi đến bài hát' : 'Go to song'}</span>
            </li>
          </ul>
        </div>
      </OptionModal>
    </React.Fragment>
  )
}

export default SongDetail
