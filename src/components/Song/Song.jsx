import React from 'react'
import './Song.scss'
import { Link } from 'react-router-dom'
import SongDetail from './SongDetail'

const Song = ({ song: songList }) => {
	console.log(songList)

	return (
		<div className='so-container'>
			<div className='so-title'>
				<Link to='kham-pha/moi-hot'>Bài hát</Link>
			</div>
			<div
				style={{
					margin: '16px 32px 0px',
				}}
			>
				<div className='so-main'>
					{songList.map((song) => (
						<SongDetail {...song} songId={song.key} />
					))}
				</div>
			</div>
		</div>
	)
}

export default Song
