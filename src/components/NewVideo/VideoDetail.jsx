import React, { useState, useEffect, useRef, memo } from 'react'

import { BsLink45Deg, BsPlayCircleFill } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'
import { SiApplemusic } from 'react-icons/si'

import { isEmpty } from 'lodash'
import { Animated } from 'react-animated-css'

import useOnClickOutside from 'hooks/useOnClickOutside'
import {
	animationConfig,
	handleVideoLink,
	toastConfig,
} from 'services/VideoDetail'
import { PROXY } from 'share/constants'
import { createArtistUrl } from 'share/utilities'

import { ToastContainer } from 'react-toastify'
import { notify } from 'services/VideoDetail'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'

const VideoDetail = ({
	keyId,
	artists,
	duration,
	thumbnail,
	title,
	height,
	refMapping,
}) => {
	const [showMoreOptions, setShowMoreOptions] = useState(false)
	const [showMorePosition, setShowMorePosition] = useState({
		transform: `translate(${0}px, ${0}px)`,
	})
	const videoRef = useRef(null)
	const moreOptionsRef = useRef(null)

	useEffect(() => {
		if (videoRef) {
			const { right } = videoRef.current.getBoundingClientRect()
			const top = videoRef.current.offsetTop
			setShowMorePosition({
				transform: `translate(${right}px, ${top}px)`,
			})
		}
	}, [showMoreOptions])

	const toggleShowMore = () => {
		setShowMoreOptions(!showMoreOptions)
	}

	const handleMoreOptions = (e) => {
		e.stopPropagation()
		toggleShowMore()
	}

	const handleCopyClick = (e) => {
		e.stopPropagation()

		const videoLink = `${PROXY}/${handleVideoLink(keyId, title, artists)}`

		navigator.clipboard.writeText(videoLink)
		toggleShowMore()
		notify()
	}

	useOnClickOutside(moreOptionsRef, () => setShowMoreOptions(false))

	return (
		<React.Fragment>
			<div className='vd-container' ref={videoRef}>
				<div className='vd-video' title={title} style={{ height }}>
					<img className='vd-img' src={thumbnail} alt={title} />
					<div className='vd-duration'>{duration}</div>
					<div className='vd-blur-layer'>
						<div className='vd-play-icon'>
							<BsPlayCircleFill />
						</div>
						<div
							title='Thêm'
							className='vd-more-options'
							onClick={(e) => handleMoreOptions(e)}
						>
							<IoMdMore />
						</div>
					</div>
				</div>
				<div className="vd-title">
					<Link to={handleVideoLink(keyId, title, artists)}>{title}</Link>
				</div>
				<div className="vd-artists">
					{artists.map((artist, i) => {
						const { artistId, name, shortLink } = artist

						return (
							<React.Fragment>
								<Link to={createArtistUrl(shortLink, artistId)}><span>{name}</span></Link>
								{i + 1 === artists.length ? '' : ', '}
							</React.Fragment>
						)
					})}
				</div>
			</div>
			<Animated {...animationConfig} isVisible={showMoreOptions}>
				<div
					className='vd-more-options-box'
					style={showMorePosition}
					ref={moreOptionsRef}
				>
					<ul>
						{!isEmpty(refMapping) && (
							<li>
								<SiApplemusic />
								<span>Nghe audio</span>
							</li>
						)}
						<li onClick={(e) => handleCopyClick(e)}>
							<BsLink45Deg />
							<span>Sao chép link</span>
						</li>
					</ul>
				</div>
			</Animated>
			<ToastContainer {...toastConfig} />
		</React.Fragment>
	)
}

export default memo(VideoDetail)
