import React from 'react'
import './TopicEvent.scss'

import { getTopicEventTitle } from 'services/TopicEvent'

const TopicEvent = ({ topicEvent = [] }) => {

	return (
		<div className='te-container'>
			{topicEvent.map((topic) => {
				const { vieTitle } = getTopicEventTitle(topic.groupName)
				return (
					<div key={vieTitle} className='tp-container'>
						<div className='tp-title'>{vieTitle}</div>
						<div className='tp-main'>
							
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default TopicEvent
