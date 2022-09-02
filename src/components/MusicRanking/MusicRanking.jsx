import MusicCard from './MusicCard'
import './MusicRanking.scss'
import { Link } from 'react-router-dom'

import { useStore, actions } from 'store'
import { createTop20Url } from 'share/utilities'
import { useCallback } from 'react'

const MusicRanking = ({ ranking }) => {
  const [state, dispatch] = useStore()
  const { lang, curPlaylist } = state
  const defineLang = useCallback((vie, eng) => (lang === 'vi' ? vie : eng), [lang])

  const musicCardProps = {
    defineLang,
    actions,
    dispatch,
    curPlaylist,
  }

  return (
    <div className='mr-container'>
      <div className='mr-title'>
        <Link to={createTop20Url('nhac-viet')}>{defineLang('BXH bài hát', 'NCT Song Chart')}</Link>
      </div>
      <div className='mr-main'>{ranking.map((rankItem) => rankItem && <MusicCard {...rankItem} keyId={rankItem.key} {...musicCardProps} />)}</div>
    </div>
  )
}

export default MusicRanking
