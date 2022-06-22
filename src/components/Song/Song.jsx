import React from 'react'
import './Song.scss'
import { Link } from 'react-router-dom'

const Song = () => {
	return (
		<div className='so-container'>
			<div className='so-title'>
				<Link to='kham-pha/moi-hot'>Bài hát</Link>
			</div>
		</div>
	)
}

export default Song
