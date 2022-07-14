import React, { useState, useEffect } from 'react'
import './SearchContent.scss'

import { NotFound } from 'pages'

import { getTopArtists } from 'services/Search/SearchContent'
import { toastNotify } from 'share/toast'

import { useStore, actions } from 'store'
import { Loading } from 'components'

const SearchContent = () => {
  const [state, dispatch] = useStore()
  const { lang } = state

  const defineLang = (vie, eng) => lang === 'vi' ? vie : eng

  const [topArtists, setTopArtists] = useState(null)
  console.log('topArtists: ', topArtists)

  const [isLoading, setIsLoading] = useState(true)
  const [isFetchingFail, setIsFetchingFail] = useState(false)

  useEffect(() => {
    getTopArtists()
      .then((res) => {
        setTopArtists(res)
        setIsLoading(false)

        
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
        setIsFetchingFail(true)
        toastNotify(defineLang('Có lỗi khi lấy dữ liệu từ server.', 'A server error occurred while retrieving data.'), 'error')
      })
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
    <div className='search-container'>SearchContent</div>
  )
}

export default SearchContent