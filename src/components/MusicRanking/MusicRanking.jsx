import React from 'react'

import MusicCard from './MusicCard'
import './MusicRanking.scss'
import { Link } from 'react-router-dom'

const MusicRanking = ({ ranking }) => {

	return (
		<div className='mr-container'>
			<div className='mr-title'>
        <Link to='/bang-xep-hang/top-20&q=nhac-viet'>BXH bài hát</Link>
      </div>
      <div className="mr-main">
        {ranking.map((rankItem) => (
          <MusicCard { ... rankItem } keyId={rankItem.key} />
        ))}
      </div>
		</div>
	)
}

export default MusicRanking
