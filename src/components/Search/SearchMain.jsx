import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ModalAnimate, OptionModal } from 'components'

import { FaRegTrashAlt } from 'react-icons/fa'
import { BsLink45Deg, BsMusicNote, BsPlayCircleFill } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'
import { SiYoutubemusic } from 'react-icons/si'

import { Loading } from 'components'
import { createSearchUrl } from 'services/Search/SearchHeader'
import { handleNavSearch } from 'services/Search/Search'
import { getMaybeHit } from 'services/Search/SearchMain'
import { covertTimestamp, createArtistUrl, createSongUrl, handleCopySong } from 'share/utilities'
import { GoCalendar } from 'react-icons/go'
import { basicModal } from 'share/animation'

const SearchMain = ({ defineLang, trendingKeywords, searchHistory, setSearchHistory, setSearchTerm, isLoading }) => {
  const navigate = useNavigate()

  const [maybeHit, setMaybeHit] = useState(null)
  const [showMoreOptions, setShowMoreOptions] = useState(false)

  const songContainerRef = useRef(null)
  const moreDivRef = useRef(null)

  const toggleShowMore = () => {
    setShowMoreOptions(!showMoreOptions)
  }

  const handleMoreOptions = (e) => {
    e.stopPropagation()
    toggleShowMore()
  }

  const onCopyClick = (e, title, songId) => {
    toggleShowMore()
    handleCopySong(e, defineLang, title, songId)
  }

  useEffect(() => {
    const getMaybeHitState = async () => {
      try {
        const maybeHit = await getMaybeHit()

        setMaybeHit(maybeHit)
      } catch (error) {
        throw new Error(error)
      }
    }

    getMaybeHitState()
  }, [])

  const onNavSearch = (name) => {
    if (name) {
      setSearchTerm(name)
      navigate(createSearchUrl(name))

      if (searchHistory[searchHistory.length - 1] !== name) {
        setSearchHistory([...searchHistory.filter((search) => search !== name), name])
        handleNavSearch(defineLang, name, [...searchHistory.filter((search) => search !== name), name])
      }
    }
  }

  const handleClearSearchItem = (e, index) => {
    e.stopPropagation()
    const newSearchHistory = searchHistory.filter((search, i) => i !== index)
    setSearchHistory(newSearchHistory)
    localStorage.setItem('searchHistory', newSearchHistory)
  }

  const handleClearAllSearch = () => {
    setSearchHistory([])
    localStorage.removeItem('searchHistory')
  }

  if (isLoading) return <Loading />

  return (
    <div className='smain-container'>
      <div className='trend-keywords-container'>
        <h1 className='tk-title common-title color-0-88'>{defineLang('Top từ khóa', 'Top Keyword')}</h1>
        <div className='tk-main'>
          {trendingKeywords.map((keyword) => {
            const { order, title } = keyword

            return (
              <div key={order} className='tk-content color-0-5' onClick={() => onNavSearch(title)}>
                <p className='tk-content-title color-0-5'>
                  <span className='tk-position'>#{order}</span>
                  {title}
                </p>
              </div>
            )
          })}
        </div>
      </div>
      {searchHistory.length === 0 || (
        <div className='search-history-container'>
          <h1 className='search-history-title common-title color-0-88'>{defineLang('Lịch sử tìm kiếm', 'Search History')}</h1>
          <div className='sh-main-list'>
            {searchHistory.map((search, i) => (
              <div key={i} className='sh-item' onClick={() => onNavSearch(search)}>
                <p className='sh-search-term color-0-5'>{search}</p>
                <div className='sh-clear-item' onClick={(e) => handleClearSearchItem(e, i)}>
                  <FaRegTrashAlt className='color-0-5' />
                </div>
              </div>
            ))}
          </div>
          <p className='sh-clear-all color-0-5' onClick={handleClearAllSearch}>
            {defineLang('Xóa tất cả', 'Clear all')}
          </p>
        </div>
      )}
      {maybeHit && (
        <div className='maybe-hit-container'>
          <div className='maybe-hit-title'>
            <div className='maybe-hit-lead common-title color-0-88'>{defineLang('Có thể hot', 'Maybe Hit')}</div>
          </div>
          <div className='maybe-hit-wrapper'>
            <div className='maybe-hit-main'>
              <div className='maybe-hit-thumb'>
                <div className='speacial-tag'>{defineLang('Đặc biệt', 'Special')}</div>
                <div className='maybe-hit-img-wrapper'>
                  <div className='maybe-hit-img-main'>
                    <img src={maybeHit.thumbnail} alt={maybeHit.title} title={maybeHit.title} />
                    <OptionModal showModal={showMoreOptions} positionRef={songContainerRef} parentRef={moreDivRef} toggleModal={toggleShowMore}>
                      <ModalAnimate animateProps={basicModal} isVisible={showMoreOptions} key={maybeHit.key}>
                        <div className='om-main'>
                          <ul>
                            <li>
                              <SiYoutubemusic className='color-0-5' />
                              <span>{defineLang('Thêm vào chờ phát', 'Add to queue')}</span>
                            </li>
                            <li onClick={(e) => onCopyClick(e, maybeHit.title, maybeHit.key)}>
                              <BsLink45Deg className='color-0-5' />
                              <span>{defineLang('Sao chép link', 'Copy link')}</span>
                            </li>
                            <li onClick={() => navigate(`/${createSongUrl(maybeHit.title, maybeHit.key)}`)}>
                              <BsMusicNote className='color-0-5' />
                              <span>{defineLang('Đi đến bài hát', 'Go to song')}</span>
                            </li>
                          </ul>
                        </div>
                      </ModalAnimate>
                    </OptionModal>
                    <div className='maybe-hit-img-overlay' ref={songContainerRef}>
                      <div className='maybe-hit-icon'>
                        <BsPlayCircleFill />
                      </div>
                      <div className='maybe-hit-more-options' ref={moreDivRef} onClick={(e) => handleMoreOptions(e)}>
                        <IoMdMore />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='maybe-hit-description'>
                <div className='maybe-hit-desc-title color-0-88'>
                  <span className='color-0-5'>{defineLang('Bài hát: ', 'Song: ')}</span>
                  <Link to={`/${createSongUrl(maybeHit.title, maybeHit.key)}`}>{maybeHit.title}</Link>
                </div>
                <div className='maybe-hit-artist-container'>
                  <div className='maybe-hit-artist-main'>
                    <div className='maybe-hit-artist-img-container'>
                      {maybeHit.artists.map((artist) => {
                        const { artistId, imageUrl, name, shortLink } = artist

                        return (
                          <Link to={`/${createArtistUrl(name, shortLink, artistId)}`} key={artistId} className='maybe-hit-artist-img'>
                            <img src={imageUrl} alt='' />
                          </Link>
                        )
                      })}
                    </div>
                    <div className='maybe-hit-artist-name color-0-5'>
                      {maybeHit.artists.map((artist, index) => {
                        const { artistId, name, shortLink } = artist

                        return (
                          <React.Fragment key={artistId}>
                            <Link to={`/${createArtistUrl(name, shortLink, artistId)}`} key={artistId}>
                              <span>{name}</span>
                            </Link>
                            {index + 1 === maybeHit.artists.length ? '' : ', '}
                          </React.Fragment>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className='maybe-hit-date-release color-0-5'>
                  <GoCalendar />
                  <span>
                    {defineLang('Ngày phát hành', 'Released date')}: {covertTimestamp(maybeHit.dateRelease)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchMain
