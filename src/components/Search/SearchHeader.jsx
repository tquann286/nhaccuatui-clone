import React, { useState } from 'react'

import { FiSearch } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io'

import { Swiper, SwiperSlide } from 'swiper/react'
import { trendArtSwiperProps } from 'services/Search/SearchHeader'
import 'swiper/scss'
import 'swiper/scss/autoplay'
import { Link } from 'react-router-dom'

const SearchHeader = ({ topArtists, defineLang }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isFocusSearchInput, setIsFocusSearchInput] = useState(false)
  
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const searchInputProps = {
    type: 'text',
    value: searchTerm,
    onChange: (e) => handleSearchTermChange(e),
    onFocus: () => setIsFocusSearchInput(true),
    onBlur: () => setIsFocusSearchInput(false),
    placeholder: defineLang('Tìm kiếm...', 'Search...'),
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
                    const { name, position, shortLink } = artist

                    return (
                      <SwiperSlide key={i}>
                        <div className='ta-slider-content'>
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
                    const { name, position, shortLink } = artist

                    return (
                      <Link key={i} to='/'>
                        <div className='ta-full-artists-item'>
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
                      </Link>
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
