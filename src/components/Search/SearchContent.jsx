import React, { useState, useEffect } from 'react'
import './SearchContent.scss'
import { SearchHeader } from 'components'

import { NotFound } from 'pages'

import { getTopArtists, getTrendingKeyword } from 'services/Search/SearchContent'
import { toastNotify } from 'share/toast'

import { useStore, actions } from 'store'
import { Loading } from 'components'

const SearchContent = () => {
  const [state, dispatch] = useStore()
  const { lang } = state

  const defineLang = (vie, eng) => (lang === 'vi' ? vie : eng)

  const [topArtists, setTopArtists] = useState(null)
  const [trendingKeywords, setTrendingKeywords] = useState(null)

  const [isLoading, setIsLoading] = useState(true)
  const [isFetchingFail, setIsFetchingFail] = useState(false)

  useEffect(() => {
    const getSearchContent = async () => {
      try {
        const topArtists = await getTopArtists()
        const trendingKeywords = await getTrendingKeyword()

        setTopArtists(topArtists)
        setTrendingKeywords(trendingKeywords)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
        setIsFetchingFail(true)
        toastNotify(defineLang('Có lỗi khi lấy dữ liệu từ server.', 'A server error occurred while retrieving data.'), 'error')
      }
    }

    getSearchContent()
  }, [])

  if (isFetchingFail) return <NotFound />

  if (isLoading) {
    return (
      <div className='search-container'>
        <Loading />
      </div>
    )
  }

  return (
    <div className='search-container'>
      <SearchHeader topArtists={topArtists} defineLang={defineLang} />
    </div>
  )
}

export default SearchContent
