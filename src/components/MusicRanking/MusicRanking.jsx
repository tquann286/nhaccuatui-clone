import React from 'react'
import { Link } from 'react-router-dom'

import MusicCard from './MusicCard'
import './MusicRanking.scss'

const MusicRanking = ({ ranking }) => {
	// console.log(ranking)

	return (
		<div className='mr-container'>
			<Link to ='/' className='mr-title'>BXH bài hát</Link>
      <div className="mr-main">
        {ranking.map((rankItem, index) => (
          <MusicCard index={index} { ... rankItem } keyId={rankItem.key} />
        ))}
      </div>
		</div>
	)
}

export default MusicRanking
