import { useState, useRef } from 'react'
import { OptionModal } from 'components'
import { BsFillPlayCircleFill, BsLink45Deg } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'

import { useNavigate } from 'react-router-dom'
import { createPlaylistUrl, handleCopyPlaylist } from 'share/utilities'

import { useStore } from 'store'

const SwiperSlider = ({keyId, title, thumbnail}) => {
  const [state] = useStore()
  const defineLang = (vie, eng) => state.lang === 'vi' ? vie : eng

	const navigate = useNavigate()
	
  const [showMoreOptions, setShowMoreOptions] = useState(false)

  const playlistContainerRef = useRef(null)
  const moreDivRef = useRef(null)

  const toggleShowMore = () => {
    setShowMoreOptions(!showMoreOptions)
  }

  const handleMoreOptions = (e) => {
    e.stopPropagation()
    toggleShowMore()
  }

	const onNavigatePlaylist = (title, keyId) => {
		navigate(createPlaylistUrl(title, keyId))
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
					<img src={thumbnail} alt={title}/>
					<div className='pl-extensions' ref={playlistContainerRef}>
						<div className='pl-play-btn'>
							<BsFillPlayCircleFill />
						</div>
						<div title={defineLang('Thêm', 'More')} className='pl-more' ref={moreDivRef} onClick={(e) => handleMoreOptions(e)}>
							<IoMdMore />
						</div>
					</div>
				</div>
				<OptionModal showModal={showMoreOptions} positionRef={playlistContainerRef} parentRef={moreDivRef} toggleModal={toggleShowMore}>
          <div className='om-main bg-dark-color-1'>
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
