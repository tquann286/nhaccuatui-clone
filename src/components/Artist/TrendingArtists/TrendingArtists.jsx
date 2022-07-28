import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './TrendingArtists.scss'

import { Sharing, SquareImg } from 'components'
import { createArtistUrl, getCurrentDay, handleCopyProxy } from 'share/utilities'
import { toastNotify } from 'share/toast'
import { getTopArtists } from 'services/Search/SearchContent'

const TrendingArtists = ({ defineLang }) => {
  const [trendArtists, setTrendArtists] = useState(null)
  console.log('trendArtists: ', trendArtists)

  useEffect(() => {
    const getTrendArtistsState = async () => {
      try {
        const trendArtists = await getTopArtists()

        setTrendArtists(trendArtists)
      } catch (error) {
        throw new Error(error)
      }
    }

    getTrendArtistsState()
  }, [])

  const handleCopyShare = () => {
    handleCopyProxy(defineLang, '/nghe-si')
  }

  const onShareWindowClose = () => {
    toastNotify(defineLang('Chia sẻ lên facebook thành công', 'Share to facebook successfully'), 'success')
  }

  const sharingProps = {
    defineLang,
    placement: 'bottom',
    handleCopyShare,
    onShareWindowClose,
    shareLink: '/nghe-si',
  }

  if (!trendArtists) return null

  const [top1] = trendArtists

  return (
    <div className='artists-trending-container bg-color-0-02'>
      <div className='artists-trending-title alcenter-jcbetween'>
        <div className='common-header alcenter color-0-5'>
          <div className='common-title color-0-88'>{defineLang('Nghệ Sỹ Trending', 'Trending Artists')}</div>
          <span className='ml-1-6'>{defineLang(`Cập nhật ngày: ${getCurrentDay()}`, `Updated date: ${getCurrentDay()}`)}</span>
        </div>
        <Sharing {...sharingProps} />
      </div>
      <div className='artists-trending-main'>
        <div className="artists-trending-top1">
          <Link to={createArtistUrl(top1.name, top1.shortLink)}>
            <SquareImg imageUrl={top1.imageUrl} title={top1.name} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TrendingArtists
