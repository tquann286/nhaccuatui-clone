import React, { useState, useEffect, useCallback } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import './SearchContent.scss'
import { SearchHeader, SearchMain, SearchResult, Footer } from 'components'

import { NotFound } from 'pages'

import { getTopArtists, getTrendingKeyword } from 'services/Search/SearchContent'
import { toastNotify } from 'share/toast'

import { useStore } from 'store'

const SearchContent = () => {
  const [state] = useStore()
  const { lang } = state

  const { search: searchLocation } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(null)
  
  const defineLang = useCallback((vie, eng) => (lang === 'vi' ? vie : eng), [lang])

  const [topArtists, setTopArtists] = useState(null)
  const [trendingKeywords, setTrendingKeywords] = useState(null)
  const [searchHistory, setSearchHistory] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [isFetchingFail, setIsFetchingFail] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const getSearchContent = async () => {
      try {
        const topArtists = await getTopArtists()
        const { listKeyValue } = await getTrendingKeyword()

        setTopArtists(topArtists)
        setTrendingKeywords(listKeyValue)
        setIsLoading(false)
      } catch (error) {
        setIsFetchingFail(true)
        setIsLoading(false)
        toastNotify(defineLang('Có lỗi khi lấy dữ liệu từ server.', 'A server error occurred while retrieving data.'), 'error')

        throw new Error(error)
      }
    }

    // Get local search history
    try {
      const searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
  
      if (searchHistory) {
        setSearchHistory(searchHistory)
      } else {
        localStorage.setItem('searchHistory', searchHistory)
      }
      
    } catch (error) {
      console.log(error)
    }

    getSearchContent()
  }, [defineLang])

  useEffect(() => {
    setSearchQuery(searchParams.get('q'))
  }, [searchLocation])

  const passedSearchProps = {
    defineLang,
    searchHistory,
    setSearchHistory,
    searchTerm,
    setSearchTerm,
    isLoading,
    setIsLoading,
  }

  if (isFetchingFail) return <NotFound />

  return (
    <div className='search-container'>
      <SearchHeader topArtists={topArtists} {...passedSearchProps} />
      {searchQuery ? (
        <SearchResult searchQuery={searchQuery} { ... passedSearchProps }  />
      ) : (
        <SearchMain trendingKeywords={trendingKeywords} {...passedSearchProps} />
      )}
      <Footer />
    </div>
  )
}

export default SearchContent
