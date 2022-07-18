import React, { useState, useEffect } from 'react'
import { Loading } from 'components'

import { getSearchResult } from 'services/Search/SearchResult'

const SearchResult = ({ searchQuery, defineLang, isLoading, searchTerm }) => {
  const [searchResult, setSearchResult] = useState(null)
  console.log('searchResult: ', searchResult)
  
  useEffect(() => {
    const getSearchResultState = async () => {
      try {
        console.log(searchQuery)
        const searchResult = await getSearchResult(searchTerm)

        setSearchResult(searchResult)
      } catch (error) {
        throw new Error(error)
      }
    }

    getSearchResultState()
  }, [searchQuery])

  if (isLoading) return <Loading />

  return (
    <div className="search-result-container">

    </div>
  )
}

export default SearchResult
