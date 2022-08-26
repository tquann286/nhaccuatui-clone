import React from 'react'

import { ResultTitle } from 'components'

const ArtistSong = ({ defineLang, pageIndex, setPageIndex, sort, setSort, song = {} }) => {
  const { song: songs = [], total = 0 } = song

  const resultTitleProps = {
    defineLang,
    title: defineLang('Bài hát', 'Song'),
    total,
  }

  return (
    <div className='pt-16 px-32px'>
      <div className='flex items-center justify-between'>
        <ResultTitle {...resultTitleProps} />
        
      </div>
    </div>
  )
}

export default ArtistSong
