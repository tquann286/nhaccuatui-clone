import React, { useState, useEffect } from 'react'
import { Loading, SearchDetail, TopResult, SongResult } from 'components'
import { NotFound } from 'pages'
import notfoundImg from 'images/not_found.png'

import { getSearchResult, searchResultNavbar } from 'services/Search/SearchResult'
import { isEmpty } from 'lodash'

const SearchResult = ({ searchQuery, searchTerm, defineLang, isLoading, setIsLoading }) => {
  const [searchResult, setSearchResult] = useState(null)
  console.log('searchResult: ', searchResult)
  const [currentCate, setCurrentCate] = useState('all')

  useEffect(() => {
    const getSearchResultState = async () => {
      try {
        setIsLoading(true)
        const searchResult = await getSearchResult(searchQuery)

        setSearchResult(searchResult)
        setIsLoading(false)
      } catch (error) {
        throw new Error(error)
      }
    }

    getSearchResultState()
  }, [searchQuery])

  const isActiveCate = (cate) => currentCate === cate

  if (isLoading) return <Loading />

  if (searchResult) searchResult.status === 'error' && <NotFound />

  const commonProps = {
    searchQuery,
    searchTerm,
    defineLang,
  }

  if (searchResult) {
    const { recommend, search } = searchResult

    return (
      <div className='search-result-container'>
        <div className='sr-navbar'>
          <div className='sr-navbar-menu'>
            {searchResultNavbar.map((cate) => (
              <div key={cate.value} className='sr-nav-item color-0-88' onClick={() => setCurrentCate(cate.value)}>
                {defineLang(cate.title.vi, cate.title.en)}
                <div className={`sr-nav-active ${isActiveCate(cate.value) && 'is-active'}`}></div>
              </div>
            ))}
          </div>
        </div>
        <div className='sr-main'>
          {isEmpty(recommend) && isEmpty(search.song.song) && isEmpty(search.playlist.playlist) && isEmpty(search.video.video) ? (
            <div className='search-not-found'>
              <img src={notfoundImg} alt='Page not found' />
              <p className='notfound-title color-0-6'>{defineLang(`Không có kết quả nào cho ${searchTerm || searchQuery}. Hãy kiểm tra lại chính tả của từ khoá`, `No results for ${searchTerm || searchQuery}. Please check the spelling of keyword`)}</p>
            </div>
          ) : (
            <React.Fragment>
              {currentCate === 'all' && (
                <React.Fragment>
                  {isEmpty(recommend) || <TopResult {...recommend} defineLang={defineLang} />}
                  {isEmpty(search) || <SearchDetail {...search} defineLang={defineLang} />}
                </React.Fragment>
              )}
              {currentCate === 'song' && <React.Fragment>{isEmpty(search.song) || <SongResult {...commonProps} />}</React.Fragment>}
            </React.Fragment>
          )}
        </div>
      </div>
    )
  }
}

export default SearchResult
