import React, { useState } from 'react'
import './Sharing.scss'

import { Tooltip, IconButton } from '@mui/material'
import { FiShare2 } from 'react-icons/fi'
import { CenterModal } from 'components'
import { FaFacebookF } from 'react-icons/fa'
import { BsLink45Deg } from 'react-icons/bs'
import { FacebookShareButton } from 'react-share'
import { PROXY } from 'share/constants'

const Sharing = ({ defineLang, placement, handleCopyShare, onShareWindowClose, shareLink }) => {
  const [showShare, setShowShare] = useState(false)

  const toggleShowShare = () => {
    setShowShare(!showShare)
  }

  const onCopyShare = () => {
    handleCopyShare()
    toggleShowShare()
  }

  const centerModalProps = {
    modalName: defineLang('Chia sẻ', 'Share'),
    showModal: showShare,
    toggleModal: toggleShowShare,
  }
  console.log(`${PROXY}${shareLink}`)
  const fbShareProps = {
    url: `${PROXY}${shareLink}`,
    onShareWindowClose,
  }

  return (
    <div className='sharing-container'>
      <Tooltip className='color-0-5' title={defineLang('Chia sẻ', 'Share')} arrow enterDelay={400} placement={placement}>
        <IconButton aria-label='share' size='large' onClick={toggleShowShare}>
          <FiShare2 />
        </IconButton>
      </Tooltip>
      <CenterModal {...centerModalProps}>
        <div className='sharing-modal-container'>
          <FacebookShareButton {...fbShareProps}>
            <div className='sharing-item fb'>
              <FaFacebookF />
              <span>Facebook</span>
            </div>
          </FacebookShareButton>
          <div className='sharing-item copy-link' onClick={onCopyShare}>
            <BsLink45Deg />
            <span>{defineLang('Sao chép link', 'Copy link')}</span>
          </div>
        </div>
      </CenterModal>
    </div>
  )
}

export default Sharing
