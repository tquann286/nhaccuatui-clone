import React, { useState, useEffect } from 'react'

import './MainHomepage.scss'

import { getHome, getChart } from 'nhaccuatui-api-full'
import {
	Loading,
	ShowcaseSlider,
	TopicEvent,
	NewRelease,
	MusicRanking,
} from 'components'

const MainHomepage = () => {
	const [homeContent, setHomeContent] = useState({})
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		try {
			const fetchHomeData = async () => {
				const homeData = await getHome()
				const { ranking: usukRanking } = await getChart({ category: 'au-my' })
				const { ranking: kpopRanking } = await getChart({ category: 'nhac-han' })

				setHomeContent({ ...homeData, usukRanking, kpopRanking })
				setIsLoading(false)
			}

			fetchHomeData()
		} catch (error) {
			console.log(error)
		}
	}, [])

	if (isLoading) {
		return (
			<div className='hp-main'>
				<div className='loading-container'>
					<Loading />
				</div>
			</div>
		)
	}

	const {
		showcase,
		topicEvent,
		newRelease,
		ranking,
		usukRanking,
		kpopRanking,
	} = homeContent

	return (
		<div className='hp-main'>
			<ShowcaseSlider showcase={showcase} />
			<TopicEvent topicEvent={topicEvent} />
			<NewRelease newRelease={newRelease} />
			<MusicRanking ranking={{ ranking, usukRanking, kpopRanking }} />
		</div>
	)
}

export default MainHomepage
