import React, { useState, useEffect } from 'react'
import './SearchContent.scss'
import { SearchHeader, SearchMain } from 'components'

import { NotFound } from 'pages'

import { getTopArtists, getTrendingKeyword } from 'services/Search/SearchContent'
import { toastNotify } from 'share/toast'

import { useStore, actions } from 'store'

const SearchContent = () => {
  const [state, dispatch] = useStore()
  const { lang } = state

  const defineLang = (vie, eng) => (lang === 'vi' ? vie : eng)

  const [topArtists, setTopArtists] = useState(null)
  const [trendingKeywords, setTrendingKeywords] = useState(null)

  const [isFetchingFail, setIsFetchingFail] = useState(false)
  const [searchHistory, setSearchHistory] = useState(null)

  useEffect(() => {
    const getSearchContent = async () => {
      try {
        const topArtists = await getTopArtists()
        const { listKeyValue } = await getTrendingKeyword()

        setTopArtists(topArtists)
        setTrendingKeywords(listKeyValue)
      } catch (error) {
        setIsFetchingFail(true)
        toastNotify(defineLang('Có lỗi khi lấy dữ liệu từ server.', 'A server error occurred while retrieving data.'), 'error')

        throw new Error(error)
      }
    }

    // Get local search history
    const searchHistory = localStorage.getItem('searchHistory')

    if (searchHistory) {
      setSearchHistory(searchHistory)
    }

    getSearchContent()
  }, [])

  const passedSearchProps = {
    defineLang,
    searchHistory,
    setSearchHistory,
  }

  if (isFetchingFail) return <NotFound />

  return (
    <div className='search-container'>
      <SearchHeader topArtists={topArtists} { ... passedSearchProps } />
      <SearchMain trendingKeywords={trendingKeywords} { ... passedSearchProps } />
    </div>
  )
}

export default SearchContent
