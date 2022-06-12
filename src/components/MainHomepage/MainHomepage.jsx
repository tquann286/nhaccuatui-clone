import React, { useState, useEffect } from 'react'

import './MainHomepage.scss'

import { getHome, getPlaylistDetail } from 'nhaccuatui-api-full'
import { ShowcaseSlider, Loading } from 'components'

const MainHomepage = () => {
	const [homeContent, setHomeContent] = useState({})
	// console.log(homeContent)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		try {
			getHome().then((data) => {
				setHomeContent(data)
				setIsLoading(false)
			})
			getPlaylistDetail("5g5PBUwBWvrj").then(data => console.log(data))
		} catch (error) {
			console.log(error)
		}
	}, [])

	if (isLoading)
		return (
			<div className='hp-main'>
				<div className='loading-container'>
					<Loading />
				</div>
			</div>
		)

	return (
		<div className='hp-main'>
			<ShowcaseSlider showcase={homeContent.showcase} />
		</div>
	)
}

export default MainHomepage
