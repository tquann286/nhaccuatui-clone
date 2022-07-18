import React, { useState, useEffect } from 'react'
import { Loading, TopResult } from 'components'
import { NotFound } from 'pages'

import { getSearchResult, searchResultNavbar } from 'services/Search/SearchResult'

const SearchResult = ({ searchQuery, defineLang, isLoading, searchTerm }) => {
  const [searchResult, setSearchResult] = useState(null)
  const [currentCate, setCurrentCate] = useState('all')

  console.log('searchResult: ', searchResult)

  useEffect(() => {
    const getSearchResultState = async () => {
      try {
        const searchResult = await getSearchResult(searchQuery)

        setSearchResult(searchResult)
      } catch (error) {
        throw new Error(error)
      }
    }

    getSearchResultState()
  }, [searchQuery])

  const isActiveCate = (cate) => currentCate === cate

  if (isLoading) return <Loading />

  if (searchResult) searchResult.status === 'error' && <NotFound />

  if (searchResult) {
    const { recommend, search } = searchResult

    return (
      <div className='search-result-container'>
        <div className='sr-navbar'>
          <div className='sr-navbar-menu'>
            {searchResultNavbar.map((cate) => (
              <div key={cate.value} className='sr-nav-item' onClick={() => setCurrentCate(cate.value)}>
                {defineLang(cate.title.vi, cate.title.en)}
                <div className={`sr-nav-active ${isActiveCate(cate.value) && 'is-active'}`}></div>
              </div>
            ))}
          </div>
        </div>
        <div className='sr-main'>{currentCate === 'all' && (
          <TopResult { ... recommend } defineLang={defineLang} />
        )}</div>
      </div>
    )
  }
}

export default SearchResult
