import React from 'react'
import './Song.scss'
import { Link } from 'react-router-dom'
import SongDetail from './SongDetail'

import { useStore } from 'store'

const Song = ({ song: songList }) => {
  const [state] = useStore()
  const { lang } = state

	return (
		<div className='so-container'>
			<div className='so-title'>
				<Link to='kham-pha/moi-hot'>{lang === 'vi' ? 'Bài hát' : 'Song'}</Link>
			</div>
			<div
				style={{
					margin: '16px 32px 0px',
				}}
			>
				<div className='so-main'>
					{songList.map((song) => (
						<SongDetail {...song} songId={song.key} lang={lang} />
					))}
				</div>
			</div>
		</div>
	)
}

export default Song
