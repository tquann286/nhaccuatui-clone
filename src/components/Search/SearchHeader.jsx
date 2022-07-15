import React, { useState } from 'react'

import { FiSearch } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io'

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
              <div className="search-suggest-main">
                {/* We are working on implementing the feature */}
              </div>
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
      {topArtists && <div className='trending-artists-container'></div>}
    </div>
  )
}

export default SearchHeader
