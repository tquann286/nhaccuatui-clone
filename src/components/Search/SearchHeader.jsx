import React from 'react'

import { FiSearch } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io'

const SearchHeader = ({ topArtists }) => {
  

  return (
    <div className='sh-container'>
      <div className="search-input-container">
        <div className="search-btn-container">
          <FiSearch />
        </div>
        <div className="search-input-main">
          <div className="search-input-section">
            <input type="text" className='search-input-content'  />
            <div className="search-suggest-container"></div>
          </div>
          <div className="search-mask"></div>
          <div className="search-clear-btn">
            <IoMdClose />
          </div>
        </div>
      </div>
      {topArtists && (
        <div className="trending-artists-container">

        </div>
      )}
    </div>
  )
}

export default SearchHeader