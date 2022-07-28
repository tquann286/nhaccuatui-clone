import React, { useCallback } from 'react'

import { TrendingArtists, Title } from 'components'
import { useStore } from 'store'

const ArtistMain = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => state.lang === 'vi' ? vie : eng, [state.lang])

  return (
    <div className='artist-main-container commonMainOutlet'>
      <Title title={defineLang('Nghệ sĩ - Danh sách ca sĩ, nhóm nhạc mới hot nhất hiện nay', 'Artist - New singers and groups today')} />
      <TrendingArtists defineLang={defineLang} />
    </div>
  )
}

export default ArtistMain