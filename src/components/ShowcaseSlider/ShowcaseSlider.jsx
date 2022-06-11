import React from 'react'

import './ShowcaseSlider.scss'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

const ShowcaseSlider = ({ showcase }) => {
	console.log(showcase)

	const settings = {
		dots: true,
		className: 'center',
		centerMode: true,
		infinite: true,
		slidesToShow: 1,
		centerPadding: '60px',
		// autoplay: true,
		speed: 1000,
		lazyLoad: true,
		autoplaySpeed: 3000,
		pauseOnHover: true,
    focusOnSelect: true,
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
