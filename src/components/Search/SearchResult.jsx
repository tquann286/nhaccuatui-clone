import React, { useState, useEffect } from 'react'

import { getSearchResult } from 'services/Search/SearchResult'

const SearchResult = ({ searchQuery, defineLang, isLoading }) => {
  const [searchResult, setSearchResult] = useState(null)
  console.log(searchResult)

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

  return <div>SearchResult</div>
}

export default SearchResult
