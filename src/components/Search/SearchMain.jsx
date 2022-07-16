import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Loading } from 'components'
import { createSearchUrl } from 'services/Search/SearchHeader'
import { handleNavSearch } from 'services/Search/Search'

const SearchMain = ({  defineLang, trendingKeywords, searchHistory, setSearchHistory }) => {
  const navigate = useNavigate()
  
  const onNavSearch = (name) => {
    if (name) {
      navigate(createSearchUrl(name))

      if (searchHistory.includes(name)) {
        setSearchHistory([ ... searchHistory.filter(search => search !== name), name ])
      } else {
        setSearchHistory([ ... searchHistory, name ])
      }
      handleNavSearch(defineLang, name, [ ... searchHistory, name ])
    }
  }
  
  if (!trendingKeywords) return <Loading />

  return (
    <div className='sm-container'>
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
    </div>
  )
}

export default SearchMain