import React, { useState, useEffect } from 'react'
import './RightSidebar.scss'
import noPlayer from 'images/default_player.jpg'

import { useStore, actions } from 'store'

import { getPlayingSong } from 'services/RightSidebar'

const RightSidebar = () => {
  const [state, dispatch] = useStore()
  const { lang, lastPlayedSongId } = state
	const [playingSong, setPlayingSong] = useState(null)

  useEffect(() => {
		if (lastPlayedSongId) {
			getPlayingSong(lastPlayedSongId).then(res => {
				setPlayingSong(res)
			})
		}
	}, [])

	const defineSong = (vie, eng) => {
		return lang === 'vi' ? vie : eng
	}

	if (!playingSong) return (
		<div className='rb-container'>
			<div className="rb-suggestion">
				<div className="no-playing-song">
					<div className="main">
						<img src={noPlayer} alt={defineSong('Thưởng thức nhạc thôi nào!', 'Play music and enjoy')}/>
						<p className='title'>{defineSong('Thưởng thức những giai điệu theo cách riêng của bạn', 'Enjoy the melody in your own way')}</p>
						<div className="play-now">{defineSong('Nghe nào', 'Play now')}</div>
					</div>
				</div>
				<div className="suggest-song"></div>
			</div>
		</div>
	)

  return (
		<div className='rb-container'>
		
		</div>
	)
}

export default RightSidebar
