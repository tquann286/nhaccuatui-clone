import React, { useState, useEffect } from 'react'
import { Loading } from 'components'
import { NotFound } from 'pages'

import { getSearchResult } from 'services/Search/SearchResult'

const SearchResult = ({ searchQuery, defineLang, isLoading, searchTerm }) => {
  const [searchResult, setSearchResult] = useState(null)
  console.log('searchTerm: ', searchTerm)
  console.log('searchQuery: ', searchQuery)
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

  if (isLoading) return <Loading />

  if (searchResult) searchResult.status === 'error' && <NotFound />

  return (
    <div className="search-result-container">

    </div>
  )
}

export default SearchResult
