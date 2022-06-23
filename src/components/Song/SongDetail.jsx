import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { PROXY } from 'share/constants'
import useOnClickOutside from 'hooks/useOnClickOutside'

import { BsHeadphones, BsLink45Deg, BsMusicNote } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'
import { SiYoutubemusic } from 'react-icons/si'

import { createSongUrl, createArtistUrl, toastConfig, copyNotify } from 'share/utilities'
import { animationConfig, createRandomSongView } from 'services/SongDetail'
import { Animated } from 'react-animated-css'
import { ToastContainer } from 'react-toastify'

const SongDetail = ({ artists, songId, thumbnail, title }) => {
	const [songView, setSongView] = useState(0)
	const [showMoreOptions, setShowMoreOptions] = useState(false)
	const [showMorePosition, setShowMorePosition] = useState({
		transform: `translate(${0}px, ${0}px)`,
	})

  const songContainerRef = useRef(null)
	const moreDivRef = useRef(null)
	const moreOptionsRef = useRef(null)

	const navigate = useNavigate()

	useEffect(() => {
		if (songContainerRef) {
			const { right } = songContainerRef.current.getBoundingClientRect()
			const top = songContainerRef.current.offsetTop
			setShowMorePosition({
				transform: `translate(${right}px, ${top}px)`,
			})
		}
	}, [showMoreOptions])

	useEffect(() => {
		setSongView(createRandomSongView())
	}, [])

	const toggleShowMore = () => {
		setShowMoreOptions(!showMoreOptions)
	}

	const handleMoreOptions = (e) => {
		e.stopPropagation()
		toggleShowMore()
	}

	const handleCopyClick = (e) => {
		e.stopPropagation()

		const songLink = `${PROXY}/${createSongUrl(title, songId)}`

		navigator.clipboard.writeText(songLink)
		toggleShowMore()
		copyNotify()
	}

	useOnClickOutside(moreOptionsRef, moreDivRef, () => setShowMoreOptions(false))

	return (
		<React.Fragment>
			<div className='sd-container' ref={songContainerRef}>
				<div className={`sd-main ${showMoreOptions ? 'focus' : 'non-focus'}`}>
					<Link
						to={createSongUrl(title, songId)}
						className='sd-thumbnail'
						title={title}
					>
						<div
							className='sd-thumb-img'
							style={{ backgroundImage: `url(${thumbnail})` }}
						></div>
					</Link>
					<div className='sd-more'>
						<div className='sd-view-count'>
							<BsHeadphones />
							<div className='sc-view-number'>{songView}</div>
						</div>
						<div className='sd-more-options'>
							<div className='sd-three-dots'  ref={moreDivRef} 
							onClick={(e) => handleMoreOptions(e)}>
								<IoMdMore />
							</div>
						</div>
					</div>
					<div className='sd-song-details'>
						<div className='sd-song-title'>
							<Link to={createSongUrl(title, songId)}>{title}</Link>
						</div>
						<div className='sd-artists'>
							{artists.map((artist, i) => {
								const { artistId, name, shortLink } = artist

								return (
									<React.Fragment key={artistId}>
										<Link to={createArtistUrl(name, shortLink, artistId)}>
											<span>{name}</span>
										</Link>
										{i + 1 === artists.length ? '' : ', '}
									</React.Fragment>
								)
							})}
						</div>
					</div>
				</div>
			</div>
      <Animated {...animationConfig} isVisible={showMoreOptions}>
				<div
					className='so-more-options-box'
					style={showMorePosition}
					ref={moreOptionsRef}
				>
					<ul>
					<li>
							<SiYoutubemusic />
							<span>Thêm vào chờ phát</span>
						</li>
						<li onClick={(e) => handleCopyClick(e)}>
							<BsLink45Deg />
							<span>Sao chép link</span>
						</li>
						<li onClick={() => navigate(createSongUrl(title, songId))}>
							<BsMusicNote />
							<span>Đi đến bài hát</span>
						</li>
					</ul>
				</div>
			</Animated>
			<ToastContainer {...toastConfig} />
		</React.Fragment>
	)
}

export default SongDetail
