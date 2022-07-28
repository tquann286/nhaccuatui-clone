import React, { useCallback } from 'react'
import artist_share_fb from 'images/artist_share_fb.png'

import { TrendingArtists, Title, ShareImage, ErrorBoundary } from 'components'
import { useStore } from 'store'

const ArtistMain = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  return (
    <ErrorBoundary>
    <div className='artist-main-container commonMainOutlet'>
      <Title title={defineLang('Nghệ sĩ - Danh sách ca sĩ, nhóm nhạc mới hot nhất hiện nay', 'Artist - New singers and groups today')} />
      <ShareImage imageUrl={artist_share_fb} />
      <TrendingArtists defineLang={defineLang} />
    </div>
    </ErrorBoundary>
  )
}

export default ArtistMain
