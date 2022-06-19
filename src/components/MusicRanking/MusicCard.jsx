import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { cloneDeep } from 'lodash'
import { BsPlayCircleFill } from 'react-icons/bs'

const MusicCard = ({ index, keyId, region, song, bgImage }) => {
	const [topThreeSong, setTopThreeSong] = useState([])
	console.log(topThreeSong)
	const [activeSong, setActiveSong] = useState({})

	useEffect(() => {
		if (song) {
			const topSong = cloneDeep(song)
			setTopThreeSong(topSong.slice(0, 3))
			setActiveSong(topSong[0])
		}
	}, [])

	const detectZ = (index) => {
		if (index === 0) {
			return 3
		} else if (index === 1) {
			return 2
		} else {
			return 1
		}
	}

	const handleChangeActiveSong = (index) => {
		setActiveSong(topThreeSong[index])
	}

	return (
		<div className='ma-container'>
			<div
				className='ma-bg-img'
				style={{ backgroundImage: `url(${bgImage})` }}
			></div>
			<div className='ma-title'>{region}</div>
			<div className='ma-t3-img'>
				{topThreeSong.map((song, index) => {
					const { artists, position, songKey, thumbnail, title } = song

					return (
						<div
							key={songKey}
							className='ma-thumb-container'
							style={{
								backgroundImage: `url(${thumbnail})`,
								zIndex: detectZ(index),
							}}
							onMouseEnter={() => {
								handleChangeActiveSong(index)
							}}
						>
							<div className='ma-thumb-icon'>
								<BsPlayCircleFill />
							</div>
							<div className='ma-blur'></div>
						</div>
					)
				})}
			</div>
			<div className='ma-active-title'>{activeSong.title}</div>
			<div className='ma-active-artists'>
				{activeSong.artists?.map((artist, index) => {
					const { artistId, name, shortLink } = artist

					return (
						<React.Fragment key={artistId}>
							<Link to='/' className='ma-active-artist-name'>
								<span>{name}</span>
							</Link>
							{index + 1 === activeSong.artists.length ? '' : ', '}
						</React.Fragment>
					)
				})}
			</div>
		</div>
	)
}

export default MusicCard
