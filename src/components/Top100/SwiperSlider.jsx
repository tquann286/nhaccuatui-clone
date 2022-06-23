import { BsFillPlayCircleFill } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'

import { handleCopyBtn } from 'services/SwiperSlider'

import { useNavigate } from 'react-router-dom'
import { createPlaylistUrl } from 'share/utilities'

const SwiperSlider = ({keyId, title, thumbnail}) => {
	const navigate = useNavigate()

	const onNavigatePlaylist = (title, keyId) => {
		navigate(createPlaylistUrl(title, keyId))
	}

	return (
			<div className='pl-container'>
				<div
					className='pl-img-container'
					onClick={() => onNavigatePlaylist(title, keyId)}
				>
					<img src={thumbnail} alt={title} />
					<div className='pl-extensions'>
						<div className='pl-play-btn'>
							<BsFillPlayCircleFill />
						</div>
						<div title='Sao chép link' className='pl-more' onClick={(e) => handleCopyBtn(e, title, keyId)}>
							<IoMdMore />
						</div>
					</div>
				</div>
			</div>
	)
}

export default SwiperSlider
