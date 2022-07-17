import React from 'react'
import { useNavigate } from 'react-router-dom'

import { FaRegTrashAlt } from 'react-icons/fa'

import { Loading } from 'components'
import { createSearchUrl } from 'services/Search/SearchHeader'
import { handleNavSearch } from 'services/Search/Search'

const SearchMain = ({  defineLang, trendingKeywords, searchHistory, setSearchHistory, searchTerm,
  setSearchTerm }) => {
  const navigate = useNavigate()
  
  const onNavSearch = (name) => {
    if (name) {
      setSearchTerm(name)
      navigate(createSearchUrl(name))

      if (searchHistory[searchHistory.length - 1] !== name) {
        setSearchHistory([ ... searchHistory.filter(search => search !== name), name ])
        handleNavSearch(defineLang, name, [ ... searchHistory.filter(search => search !== name), name ])
      }
    }
  }
  
  const handleClearSearchItem = (index) => {
    const newSearchHistory = searchHistory.filter((search, i) => i !== index)
    setSearchHistory(newSearchHistory)
    localStorage.setItem('searchHistory', newSearchHistory)
  }

  const handleClearAllSearch = () => {
    setSearchHistory([])
    localStorage.removeItem('searchHistory')
  }
  
  if (!trendingKeywords) return <Loading />

  return (
    <div className='smain-container'>
      <div className="trend-keywords-container">
        <h1 className="tk-title">{defineLang('Top từ khóa', 'Top Keyword')}</h1>
        <div className="tk-main">
          {trendingKeywords.map(keyword => {
            const { order, title } = keyword

            return (
              <div key={order} className="tk-content" onClick={() => onNavSearch(title)}>
              <p className="tk-content-title">
                <span className="tk-position">#{order}</span>
                {title}
              </p>
            </div>
            )
          })}
        </div>
      </div>
      {searchHistory.length === 0 || (
        <div className="search-history-container">
          <h1 className="search-history-title">{defineLang('Lịch sử tìm kiếm', 'Search History')}</h1>
          <div className="sh-main-list">
            {searchHistory.map((search, i) => (
              <div key={i} className="sh-item">
              <p className="sh-search-term">{search}</p>
              <div className="sh-clear-item" onClick={() => handleClearSearchItem(i)}>
                <FaRegTrashAlt />
              </div>
            </div>
            ))}
          </div>
          <p className="sh-clear-all" onClick={handleClearAllSearch}>{defineLang('Xóa tất cả', 'Clear all')}</p>
        </div>
      )}
      
    </div>
  )
}

export default SearchMain