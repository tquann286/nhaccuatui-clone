import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { handleNavSearch } from 'services/Search/Search'

import { FiSearch } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io'

import { Swiper, SwiperSlide } from 'swiper/react'
import { createSearchUrl, trendArtSwiperProps } from 'services/Search/SearchHeader'
import 'swiper/scss'
import 'swiper/scss/autoplay'

const SearchHeader = ({ topArtists, defineLang, searchHistory, setSearchHistory, searchTerm, setSearchTerm }) => {
  const navigate = useNavigate()

  const [isFocusSearchInput, setIsFocusSearchInput] = useState(false)

  const searchInputProps = {
    type: 'text',
    value: searchTerm,
    onChange: (e) => setSearchTerm(e.target.value),
    onFocus: () => setIsFocusSearchInput(true),
    onBlur: () => setIsFocusSearchInput(false),
    placeholder: defineLang('Tìm kiếm...', 'Search...'),
  }

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

  return (
    <div className='sh-container'>
      <div className={`search-input-container ${isFocusSearchInput && 'focus'}`}>
        <div className='search-btn-container'>
          <FiSearch />
        </div>
        <div className='search-input-main'>
          <div className='search-input-section'>
            <input className='search-input-content' {...searchInputProps} />
            <div className='search-suggest-container'>
              <div className='search-suggest-main'>{/* We are working on implementing the feature */}</div>
            </div>
          </div>
          <div className='mask-overlay'></div>
          {searchTerm && (
            <div className='search-clear-btn' onClick={() => setSearchTerm('')}>
              <IoMdClose />
            </div>
          )}
        </div>
      </div>
      {topArtists && (
        <div className='trending-artists-container'>
          <div className='ta-main'>
            <div className='ta-wrapper'>
              <div className='ta-active-artists'>
                <Swiper {...trendArtSwiperProps}>
                  {topArtists.map((artist, i) => {
                    const { name, position } = artist

                    return (
                      <SwiperSlide key={i}>
                        <div className='ta-slider-content' onClick={() => onNavSearch(name)}>
                          <p className='ta-artist-name'>
                            <span className='ta-artist-position'>{position}.</span>
                            {name}
                          </p>
                          <div className='ta-new-label'>
                            <div className='ta-new-label-main'>
                              <p className='ta-new-label-content'>New</p>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </div>
              <div className='ta-full-artists-main'>
                <div className='ta-full-artists-content'>
                  <p className='ta-lead-title'>{defineLang('Nghệ sĩ Trending', 'Trending Artists')}</p>
                  {topArtists.map((artist, i) => {
                    const { name, position } = artist

                    return (
                      <div key={i} className='ta-full-artists-item' onClick={() => onNavSearch(name)}>
                        <p className='ta-full-artists-name'>
                          <span className='ta-full-artists-position'>{position}.</span>
                          {name}
                        </p>
                        <div className='ta-new-label'>
                          <div className='ta-new-label-main'>
                            <p className='ta-new-label-content'>New</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchHeader
