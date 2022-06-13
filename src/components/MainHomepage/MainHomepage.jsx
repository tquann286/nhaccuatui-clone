import React, { useState, useEffect } from 'react'

import './MainHomepage.scss'

import { getHome } from 'nhaccuatui-api-full'
import { Loading, ShowcaseSlider, TopicEvent } from 'components'

const MainHomepage = () => {
	const [homeContent, setHomeContent] = useState({})
	console.log('homeContent: ', homeContent)
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

	return (
		<div className='hp-main'>
			<ShowcaseSlider showcase={homeContent.showcase} />
			<TopicEvent topicEvent={homeContent.topicEvent} />
		</div>
	)
}

export default MainHomepage
