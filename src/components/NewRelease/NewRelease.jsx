import React, { useState } from 'react'
import './NewRelease.scss'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'

const NewRelease = ({ newRelease: { song: newSong } }) => {
	console.log(newSong)

	const settings = {
		fade: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		autoplay: false,
	}

	return (
		<div className='nr-container'>
			<div className='nr-title'>Mới phát hành</div>
			<div className='nr-main'>
				<div className='nr-active-slide'>
					<Slider {...settings}>
						{newSong.map((song) => {
							const { key, artists, dateRelease, thumbnail, title } = song

							return (
								<div key={key} className='nr-active-container'>
									<Link to={`bai-hat/${title}`} className='nr-active-img' title={title}>
										<img src={thumbnail} alt={title} />
									</Link>
									<div className='nr-active-detail'>
										<Link to={`bai-hat/${title}`} >
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
															to={`/${shortLink}`}
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
															<Link to={`/${shortLink}`} key={artistId}>
																<span>{name}</span>
																{index + 1 === artists.length ? '' : ', '}
															</Link>
														)
													})}
												</div>
											</div>
										</div>
									</div>
								</div>
							)
						})}
					</Slider>
				</div>
			</div>
		</div>
	)
}

export default NewRelease
