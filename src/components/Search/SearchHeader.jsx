import React, { useState, useEffect } from 'react'

import { FiSearch } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io'

const SearchHeader = ({ topArtists, defineLang }) => {
  const [searchInputValue, setSearchInputValue] = useState('')
  const [isFocusSearchInput, setIsFocusSearchInput] = useState(false)

  const handleSearchInputChange = (e) => {
    setSearchInputValue(e.target.value)
  }

  const searchInputProps = {
    type: 'text',
    value: searchInputValue,
    onChange: (e) => handleSearchInputChange(e),
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
            <div className='search-suggest-container'></div>
          </div>
          <div className='search-mask'></div>
          {searchInputValue && (
            <div className='search-clear-btn'>
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
