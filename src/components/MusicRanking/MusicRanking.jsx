import React from 'react'
import { Link } from 'react-router-dom'
import './MusicRanking.scss'

const MusicRanking = ({ ranking }) => {
	console.log(ranking)

	return (
		<div className='mr-container'>
			<Link to ='/' className='mr-title'>BXH Bài Hát</Link>
      <div className="mr-main">
        <div className="mr-card-container">
          <div className="mr-card-bg-img"></div>
        </div>
        <div className="mr-card-container">
        
        </div>
        <div className="mr-card-container">
        
        </div>
      </div>
		</div>
	)
}

export default MusicRanking
