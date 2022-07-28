import React from 'react'
import './TrendingArtists.scss'

import { Sharing } from 'components'
import { handleCopyProxy } from 'share/utilities'

const TrendingArtists = ({ defineLang }) => {
  const handleCopyShare = () => {
    handleCopyProxy(defineLang, '/nghe-si')
  }

  const onShareWindowClose = (a) => {
    console.log(a)
  }

  const sharingProps = {
    defineLang,
    placement: 'bottom',
    handleCopyShare,
    onShareWindowClose,
    shareLink: '/nghe-si',
  }

  return (
    <div className='artists-trending-container bg-color-0-02'>
      <div className='artists-trending-title alcenter-jcbetween'>
        <div className='common-header alcenter color-0-5'>
          <div className='common-title color-0-88'>{defineLang('Nghệ Sỹ Trending', 'Trending Artists')}</div>
          <span className='ml-1-6'>{defineLang('Cập nhật ngày: 29/06/2022', 'Updated date: 29/06/2022')}</span>
        </div>
        <Sharing {...sharingProps} />
      </div>
    </div>
  )
}

export default TrendingArtists
