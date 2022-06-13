import React from 'react'
import { Link } from 'react-router-dom'

import './ShowcaseSlider.scss'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

import { settings } from 'services/ShowcaseSlider'
import { getPlaylistUrl } from 'share/utilities'

const ShowcaseSlider = ({ showcase = [] }) => {
	console.log(showcase)

	return (
		<div className='sc-container'>
			<Slider {...settings}>
				{showcase?.map((sc) => {
					return (
						<Link to={`/playlist/${getPlaylistUrl(sc.url)}`} key={sc.key} title={sc.title} className='sc-img-container'>
							<img className='sc-img-slider' src={sc.imageUrl} alt={sc.title} />
						</Link>
					)
				})}
			</Slider>
		</div>
	)
}

export default ShowcaseSlider
