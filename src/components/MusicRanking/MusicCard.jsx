import React, { useState, useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
import { cloneDeep } from 'lodash'
import { BsPlayCircleFill } from 'react-icons/bs'

import { detectZ } from 'services/MusicCard'
import { createSongUrl, createArtistUrl, createTop20Url } from 'share/utilities'

const MusicCard = ({ keyId, region, song, bgImage, category, lang }) => {
	const [topThreeSong, setTopThreeSong] = useState([])
	const [activeSong, setActiveSong] = useState({})

	const { position, title, songKey, artists } = activeSong
	
	useEffect(() => {
		if (song) {
			const topSong = cloneDeep(song)
			setTopThreeSong(topSong.slice(0, 3))
			setActiveSong(topSong[0])
		}
	}, [])

	const handleChangeActiveSong = (index) => {
		setActiveSong(topThreeSong[index])
	}

	return (
		<div className='ma-container'>
			<div
				className='ma-bg-img'
				style={{ backgroundImage: `url(${bgImage})` }}
			></div>
			<div className='ma-title'>{lang === 'vi' ? region.vi : region.en}</div>
			<div className='ma-t3-img'>
				{topThreeSong.map((song, index) => {
					const { songKey, thumbnail, title } = song

					return (
						<Link
							key={songKey}
							to={createSongUrl(title, songKey)}
							className='ma-thumb-container'
							style={{
								backgroundImage: `url(${thumbnail})`,
								zIndex: detectZ(index),
							}}
							onMouseEnter={() => {
								handleChangeActiveSong(index)
							}}
							title={title}
						>
							<div className='ma-thumb-icon flex items-center justify-center'>
								<BsPlayCircleFill />
							</div>
							<div className='ma-blur'></div>
						</Link>
					)
				})}
			</div>
			<div className='ma-active-position color-0-05'>#{position}</div>
			<div className='ma-active-title'>
				<Link to={createSongUrl(title, songKey)}>{title}</Link>
			</div>

			{artists && (
				<div className='ma-active-artists color-0-5'>
					{artists.map((artist, index) => {
						const { artistId, name, shortLink } = artist

						return (
							<React.Fragment key={artistId}>
								<Link to={createArtistUrl(name, shortLink)} className='ma-active-artist-name'>
									<span>{name}</span>
								</Link>
								{index + 1 === artists.length ? '' : ', '}
							</React.Fragment>
						)
					})}
				</div>
			)}
			<div className='ma-watch-all border-0-1 color-0-5'>
				<Link to={createTop20Url(category)}>{lang === 'vi' ? 'Xem tất cả' : 'Full Chart'}</Link>
			</div>
		</div>
	)
}

export default memo(MusicCard)
