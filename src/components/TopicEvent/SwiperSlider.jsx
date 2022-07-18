import { useState, useRef } from 'react'
import { OptionModal } from 'components'
import { BsFillPlayCircleFill, BsLink45Deg } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'

import { handleCopyPlaylist } from 'share/utilities'

const SwiperSlider = ({keyId, title, thumbnail, onNavigatePlaylist, lang}) => {
  const [showMoreOptions, setShowMoreOptions] = useState(false)
	const defineLang = (vie, eng) => lang === 'vi' ? vie : eng

  const playlistContainerRef = useRef(null)
  const moreDivRef = useRef(null)

  const toggleShowMore = () => {
    setShowMoreOptions(!showMoreOptions)
  }

  const handleMoreOptions = (e) => {
    e.stopPropagation()
    toggleShowMore()
  }

  const handleCopyClick = (e) => {
		handleCopyPlaylist(e, title , keyId, defineLang)
    toggleShowMore()
  }

	return (
			<div className='pl-container'>
				<div
					className='pl-img-container'
					onClick={() => onNavigatePlaylist(title, keyId)}
				>
					<img src={thumbnail} alt={title} />
					<div className='pl-extensions' ref={playlistContainerRef}>
						<div className='pl-play-btn'>
							<BsFillPlayCircleFill />
						</div>
						<div title={defineLang('Thêm', 'More')} className='pl-more' onClick={(e) => handleMoreOptions(e)} ref={moreDivRef}>
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
				<OptionModal showModal={showMoreOptions} positionRef={playlistContainerRef} parentRef={moreDivRef} toggleModal={toggleShowMore}>
          <div className='om-main'>
            <ul>
              <li onClick={(e) => handleCopyClick(e)}>
                <BsLink45Deg />
                <span>{defineLang('Sao chép link', 'Copy link')}</span>
              </li>
            </ul>
          </div>
        </OptionModal>
			</div>
	)
}

export default SwiperSlider
