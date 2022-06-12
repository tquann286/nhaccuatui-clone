import React from 'react'

import './ShowcaseSlider.scss'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

import { CustomPrevArrow, CustomNextArrow } from './CustomArrow/CustomArrow'

const ShowcaseSlider = ({ showcase }) => {
	console.log(showcase)

	const settings = {
		dots: true,
		className: 'center',
		infinite: true,
		slidesToShow: 1,
		autoplay: true,
		speed: 800,
		lazyLoad: true,
		autoplaySpeed: 3000,
		pauseOnHover: true,
		nextArrow: <CustomNextArrow />,
		prevArrow: <CustomPrevArrow />,
	}

	return (
		<div className='sc-container'>
			<Slider {...settings}>
				{showcase.map((sc) => {
					return (
						<div key={sc.key} title={sc.title} className='sc-img-container'>
							<img className='sc-img-slider' src={sc.imageUrl} alt={sc.title} />
						</div>
					)
				})}
			</Slider>
		</div>
	)
}

export default ShowcaseSlider
