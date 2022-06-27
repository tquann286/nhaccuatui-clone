import React, { useState, useEffect } from 'react'
import './MainHomepage.scss'

import { fetchHomeData } from 'services/HomeContent'

import { Loading, ShowcaseSlider, TopicEvent, NewRelease, MusicRanking, NewVideo, Song, HotTopic, Top100, Footer } from 'components'

const MainHomepage = () => {
	const [homeContent, setHomeContent] = useState({})
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		try {
			fetchHomeData().then((res) => {
				setHomeContent(res)
				setIsLoading(false)
			})
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

	const {showcase, topicEvent, newRelease, ranking, usukRanking, kpopRanking, video, song, topic, top100} = homeContent

	return (
		<div className='hp-main'>
			<ShowcaseSlider showcase={showcase} />
			<TopicEvent topicEvent={topicEvent} />
			<NewRelease newRelease={newRelease} />
			<MusicRanking ranking={[ranking, usukRanking, kpopRanking]} />
			<NewVideo videos={video} />
			<Song song={song} />
			<HotTopic hotTopic={topic} />
			<Top100 top100List={top100} />
			<Footer />
		</div>
	)
}

export default MainHomepage

