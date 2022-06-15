import React, { useState, useEffect } from 'react'

import './MainHomepage.scss'

import { getHome, getArtistDetail } from 'nhaccuatui-api-full'
import { Loading, ShowcaseSlider, TopicEvent, NewRelease } from 'components'

const MainHomepage = () => {
	const [homeContent, setHomeContent] = useState({})
	console.log(homeContent)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		try {
			getHome().then((data) => {
				setHomeContent(data)
				setIsLoading(false)
			})
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
	const {showcase, topicEvent, newRelease } = homeContent 	
	

	return (
		<div className='hp-main'>
			<ShowcaseSlider showcase={showcase} />
			<TopicEvent topicEvent={topicEvent} />
			<NewRelease newRelease={newRelease} />
		</div>
	)
}

export default MainHomepage
