import { useState } from 'react'

import { BsFillPlayCircleFill } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'

const SwiperSlider = ({keyId, title, thumbnail, onNavigatePlaylist}) => {
  const [showMoreOption, setShowMoreOption] = useState(false)

  const toggleShowMoreOption = () => {
    setShowMoreOption(!showMoreOption)
  }

  const handleMoreOption = (e) => {
    e.stopPropagation()
		toggleShowMoreOption()
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
						<div className='pl-more' onClick={(e) => handleMoreOption(e)}>
							<IoMdMore />
						</div>
					</div>
				</div>
				<div
					className='pl-title'
					title={title}
					onClick={() => onNavigatePlaylist(title, keyId)}
				>
					{title}
				</div>
			</div>
	)
}

export default SwiperSlider
