import React, { useState, useEffect } from 'react'
import './MainHomepage.scss'
import { getHome } from 'nhaccuatui-api-full'
import { ShowcaseSlider } from 'components'

const MainHomepage = () => {
	const [homeContent, setHomeContent] = useState({})
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		try {
			getHome().then(data => {
				setHomeContent(data)
				setIsLoading(false)
			})
			
		} catch (error) {
			console.log(error)
		}
	}, [])

	if (isLoading) return (
		<div className="hp-main">
			<h4>Loading...</h4>
		</div>
	)

	return (
		<div className='hp-main'>
			<ShowcaseSlider showcase={homeContent.showcase} />
		</div>
	)
}

export default MainHomepage
