import React from 'react'

import MusicCard from './MusicCard'
import './MusicRanking.scss'
import { Link } from 'react-router-dom'

import { useStore } from 'store'

const MusicRanking = ({ ranking }) => {
  const [state] = useStore()
  const { lang } = state

	return (
		<div className='mr-container'>
			<div className='mr-title'>
        <Link to='/bang-xep-hang/top-20&q=nhac-viet'>{lang === 'vi' ? 'BXH bài hát' : 'NCT Song Chart'}</Link>
      </div>
      <div className="mr-main">
        {ranking.map((rankItem) => rankItem && (
          <MusicCard { ... rankItem } keyId={rankItem.key} lang={lang} />
        ))}
      </div>
		</div>
	)
}

export default MusicRanking
