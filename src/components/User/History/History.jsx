import React, { useState, useCallback } from 'react'

import { CateCommon, Container, SongHistory, PlaylistHistory, VideoHistory } from 'components'
import { useStore } from 'store'
import { auth } from 'config/firebase'
import { historyCate } from 'services/User/History'

const History = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  const [curCate, setCurCate] = useState(historyCate[0].value)

  const handleCateChange = (e, newCate) => {
    setCurCate(newCate)
  }

  const cateCommonProps = {
    defineLang,
    curCate,
    handleCateChange,
    categories: historyCate,
  }

  const cateHistoryProps = {
    defineLang,
    currentUser: auth.currentUser,
  }

  return (
    <div className='commonMainOutlet'>
      <Container>
        <CateCommon {...cateCommonProps} />
        <div className='pt-44px px-32px'>
          {curCate === 'song' && <SongHistory {...cateHistoryProps} />}
          {curCate === 'playlist' && <PlaylistHistory {...cateHistoryProps} />}
          {curCate === 'video' && <VideoHistory {...cateHistoryProps} />}
        </div>
      </Container>
    </div>
  )
}

export default History
