import { Link } from 'react-router-dom'
import { createTopicUrl } from 'share/utilities'

const SwiperSlider = ({ keyId, title, thumbURL, onNavigateTopic }) => {
	return (
		<div className='ht-container'>
			<Link to={createTopicUrl(title, keyId)}>
			<div
				className='ht-img-container border-0-05'
			>
				<img src={thumbURL} alt={title} />
				<div className='ht-blur-layer'></div>
			</div>
			</Link>
		</div>
	)
}

export default SwiperSlider
