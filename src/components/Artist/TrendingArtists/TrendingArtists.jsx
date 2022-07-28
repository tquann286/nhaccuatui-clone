import React from 'react'
import './TrendingArtists.scss'

const TrendingArtists = ({ defineLang }) => {
  return (
    <div className="artists-trending-container bg-color-0-02">
      <div className="artists-trending-title alcenter-jcbetween">
        <div className='common-header alcenter color-0-5'>
          <div className="common-title color-0-88">
            {defineLang('Nghệ Sỹ Trending', 'Trending Artists')}
          </div>
          <span>{defineLang('Cập nhật ngày: 29/06/2022', 'Updated date: 29/06/2022')}</span>
        </div>
      </div>
    </div>
  )
}

export default TrendingArtists