import React from 'react'

import MusicCard from './MusicCard'
import './MusicRanking.scss'

const MusicRanking = ({ ranking }) => {

	return (
		<div className='mr-container'>
			<div className='mr-title'>BXH bài hát</div>
      <div className="mr-main">
        {ranking.map((rankItem) => (
          <MusicCard { ... rankItem } keyId={rankItem.key} />
        ))}
      </div>
		</div>
	)
}

export default MusicRanking
