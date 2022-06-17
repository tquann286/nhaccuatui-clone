import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import './NewRelease.scss'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

import { GoCalendar } from 'react-icons/go'
import { BsPlayCircleFill } from 'react-icons/bs'

import { covertTimestamp } from 'share/utilities'
import { createSongUrl, createArtistUrl, activeSlideSettings, thumbSlideSettings } from 'services/NewRelease'

const NewRelease = ({ newRelease: { song: newSong } }) => {
	const [slide, setSlide] = useState({
		activeSlide: null,
		thumbSlide: null
	})

	const activeSlideRef = useRef(null)
	const thumbSlideRef = useRef(null)

	useEffect(() => {
		setSlide({
			activeSlide: activeSlideRef.current,
			thumbSlide: thumbSlideRef.current
		})
	}, [])

	return (
		<div className='nr-container'>
			<div className='nr-title'>Mới phát hành</div>
			<div className='nr-main'>
				<div className='nr-active-slide'>
					<Slider {...activeSlideSettings} asNavFor={slide.thumbSlide} ref={activeSlideRef}>
						{newSong.map((song) => {
							const { key, artists, dateRelease, thumbnail, title } = song

							return (
								<div key={key} className='nr-active-container'>
									<Link
										to={createSongUrl(title, key)}
										className='nr-active-img'
										title={title}
									>
										<img src={thumbnail} alt={title} />
									</Link>
									<div className='nr-active-detail'>
										<Link to={createSongUrl(title, key)}>
											<h4>{title}</h4>
										</Link>
										<div className='nr-artist-container'>
											<div className='nr-artist-main'>
												<div className='nr-artist-img-container'>
													{artists.map((artist) => {
														const { artistId, imageUrl, name, shortLink } =
															artist

														return (
															<Link
																to={createArtistUrl(shortLink, artistId)}
																key={artistId}
																className='nr-artist-img'
															>
																<img src={imageUrl} alt={name} />
															</Link>
														)
													})}
												</div>

												<div className='nr-artist-name'>
													{artists.map((artist, index) => {
														const { artistId, name, shortLink } = artist

														return (
															<React.Fragment>
																<Link
																	to={createArtistUrl(shortLink, artistId)}
																	key={artistId}
																>
																	<span>{name}</span>
																</Link>
																{index + 1 === artists.length ? '' : ', '}
															</React.Fragment>
														)
													})}
												</div>
											</div>
										</div>
										<div className='nr-date-release'>
												<GoCalendar />
											<span>
												Ngày phát hành: {covertTimestamp(dateRelease)}
											</span>
										</div>
										<div className="line-throught"></div>
									</div>
								</div>
							)
						})}
					</Slider>
				</div>

			</div>
			<div className="nr-thumb-slider">
				<Slider { ... thumbSlideSettings } asNavFor={slide.activeSlide} ref={thumbSlideRef}>
					{newSong.map(song => {
						const { key, thumbnail, title } = song

						return (
							<Link key={key} to={createSongUrl(title, key)} className="nr-thumb-img" title={title}>
								<img src={thumbnail} alt={title} />
								<div className="blur">
									<BsPlayCircleFill />
								</div>
							</Link>
						)
					})}
				</Slider>
			</div>
		</div>
	)
}

export default NewRelease
