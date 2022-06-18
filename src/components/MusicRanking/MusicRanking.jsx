import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './MusicRanking.scss'

const MusicRanking = (ranking) => {
	console.log(ranking)

  // useEffect(() => {
    
  // }, [])

	return (
		<div className='mr-container'>
			<Link to ='/' className='mr-title'>BXH Bài Hát</Link>
      <div className="mr-main">
      
      </div>
		</div>
	)
}

export default MusicRanking
