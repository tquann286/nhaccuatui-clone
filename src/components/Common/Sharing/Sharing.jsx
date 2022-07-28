import React, { useState } from 'react'
import './Sharing.scss'

import { Tooltip, IconButton } from '@mui/material'
import { FiShare2 } from 'react-icons/fi'
import { CenterModal } from 'components'
import { FaFacebookF } from 'react-icons/fa'
import { BsLink45Deg } from 'react-icons/bs'

const Sharing = ({ defineLang, placement, handleCopyShare, handleShareFB }) => {
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

  return (
    <div className='sharing-container'>
      <Tooltip className='color-0-5' title={defineLang('Chia sẻ', 'Share')} arrow enterDelay={400} placement={placement}>
        <IconButton aria-label='share' size='large' onClick={toggleShowShare}>
          <FiShare2 />
        </IconButton>
      </Tooltip>
      <CenterModal {...centerModalProps}>
        <div className="sharing-modal-container">
          <div className="sharing-item fb" onClick={handleShareFB}>
            <FaFacebookF />
            <span>Facebook</span>
          </div>
          <div className="sharing-item copy-link" onClick={onCopyShare}>
            <BsLink45Deg />
            <span>{defineLang('Sao chép link', 'Copy link')}</span>
          </div>
        </div>
      </CenterModal>
    </div>
  )
}

export default Sharing
