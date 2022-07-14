import React, { useState, useEffect } from 'react'
import './Search.scss'

import { NotFound } from 'pages'

import { getTopArtists } from 'services/Search/Search'
import { toastNotify } from 'share/toast'

import { useStore, actions } from 'store'

const Search = () => {
  const [state, dispatch] = useStore()
  const { lang } = state

  const defineLang = (vie, eng) => lang === 'vi' ? vie : eng

  const [topArtists, setTopArtists] = useState(null)
  console.log('topArtists: ', topArtists)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getTopArtists()
      .then((res) => {
        setTopArtists(res)
        setIsLoading(false)

      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
        toastNotify(defineLang('Có lỗi khi lấy dữ liệu từ server.', 'A server error occurred while retrieving data.'), 'error')

        return <NotFound />
      })
  }, [])

  return <div className='search-container'>Search</div>
}

export default Search
