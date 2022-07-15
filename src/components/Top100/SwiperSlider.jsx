import { useState, useRef } from 'react'
import { OptionModal } from 'components'
import { BsFillPlayCircleFill, BsLink45Deg } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'

import { useNavigate } from 'react-router-dom'
import { handleCopyBtn } from 'services/SwiperSlider'
import { createPlaylistUrl } from 'share/utilities'

import { useStore } from 'store'

const SwiperSlider = ({keyId, title, thumbnail}) => {
  const [state] = useStore()
  const { lang } = state
	const navigate = useNavigate()
	
  const [showMoreOptions, setShowMoreOptions] = useState(false)

  const playlistContainerRef = useRef(null)
  const moreDivRef = useRef(null)

  const toggleShowMore = () => {
    setShowMoreOptions(!showMoreOptions)
  }

  const handleMoreOptions = (e) => {
    e.stopPropagation()
		console.log({ ... [playlistContainerRef.current.getBoundingClientRect().y], }, window.pageYOffset)
    toggleShowMore()
  }

	const onNavigatePlaylist = (title, keyId) => {
		navigate(createPlaylistUrl(title, keyId))
	}

  const handleCopyClick = (e) => {
		handleCopyBtn(e, title , keyId, lang)
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
						<div title='Sao chép link' className='pl-more' ref={moreDivRef} onClick={(e) => handleMoreOptions(e)}>
							<IoMdMore />
						</div>
					</div>
				</div>
				<OptionModal showModal={showMoreOptions} positionRef={playlistContainerRef} parentRef={moreDivRef} toggleModal={toggleShowMore}>
          <div className='om-main'>
            <ul>
              <li onClick={(e) => handleCopyClick(e)}>
                <BsLink45Deg />
                <span>{lang === 'vi' ? 'Sao chép link' : 'Copy link'}</span>
              </li>
            </ul>
          </div>
        </OptionModal>
			</div>
	)
}

export default SwiperSlider
