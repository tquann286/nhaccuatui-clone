import React from 'react'
import { Link } from 'react-router-dom'

import MusicCard from './MusicCard'
import './MusicRanking.scss'

const MusicRanking = ({ ranking }) => {
	console.log(ranking)

	return (
		<div className='mr-container'>
			<Link to ='/' className='mr-title'>BXH Bài Hát</Link>
      <div className="mr-main">
        {ranking.map((rankItem, index) => (
          <MusicCard index={index} { ... rankItem } />
        ))}
      </div>
		</div>
	)
}

export default MusicRanking
