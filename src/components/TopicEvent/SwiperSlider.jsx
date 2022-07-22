import { useState, useRef } from 'react'
import { ExtendModal, ModalAnimate, OptionModal } from 'components'
import { BsFillPlayCircleFill, BsLink45Deg } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'

import { handleCopyPlaylist } from 'share/utilities'
import { basicModal } from 'share/animation'
import { handleAddToFavPlaylist } from 'share/addToFav'

const SwiperSlider = ({ keyId, title, thumbnail, onNavigatePlaylist, lang, type = 'PLAYLIST' }) => {
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const defineLang = (vie, eng) => (lang === 'vi' ? vie : eng)

  const positionRef = useRef(null)
  const moreDivRef = useRef(null)

  const toggleShowMore = () => {
    setShowMoreOptions(!showMoreOptions)
  }

  const handleMoreOptions = (e) => {
    e.stopPropagation()
    toggleShowMore()
  }

  const onCopyLink = (e) => {
    e.stopPropagation()
    handleCopyPlaylist(e, title, keyId, defineLang)
    toggleShowMore()
  }

  const handleAddToFav = (e) => {
    e.stopPropagation()
    handleAddToFavPlaylist({ keyId, thumbnail, title, type }, defineLang)
    toggleShowMore()
  }

  const optionModalProps = {
    showModal: showMoreOptions,
    positionRef,
    parentRef: moreDivRef,
    toggleModal: toggleShowMore,
  }

  const modalAnimateProps = {
    animateProps: basicModal,
    isVisible: showMoreOptions,
    keyId,
  }

  const extendModalProps = {
    addToFav: true,
    handleAddToFav: (e) => handleAddToFav(e),
    copyLink: true,
    handleCopyLink: (e) => onCopyLink(e),
  }

  return (
    <div className='pl-container'>
      <div className='pl-img-container border-0-05' onClick={() => onNavigatePlaylist(title, keyId)}>
        <img src={thumbnail} alt={title} />
        <div className='pl-extensions' ref={positionRef}>
          <div className='pl-play-btn'>
            <BsFillPlayCircleFill />
          </div>
          <div title={defineLang('Thêm', 'More')} className='pl-more' onClick={(e) => handleMoreOptions(e)} ref={moreDivRef}>
            <IoMdMore />
          </div>
        </div>
      </div>
      <div className='pl-title' title={title} onClick={() => onNavigatePlaylist(title, keyId)}>
        {title}
      </div>
      <OptionModal {...optionModalProps}>
        <ModalAnimate {...modalAnimateProps}>
          <ExtendModal {...extendModalProps} />
        </ModalAnimate>
      </OptionModal>
    </div>
  )
}

export default SwiperSlider
