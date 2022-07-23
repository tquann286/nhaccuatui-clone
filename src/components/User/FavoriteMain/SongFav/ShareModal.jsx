import React from 'react'
import './ShareModal.scss'

import { motion, AnimatePresence } from 'framer-motion'
import { IoMdClose } from 'react-icons/io'

const ShareModal = ({ defineLang, toggleShareModal }) => {
  return (
    <div className='share-modal-container bg-color-1'>
      <div className='share-modal-header color-0-5 border-0-05'>
        <h4 className='color-0-88'>{defineLang('Chia sẻ', 'Share')}</h4>
        <button className='close-btn' onClick={toggleShareModal}>
          <IoMdClose className='color-0-5' />
        </button>
      </div>
    </div>
  )
}

export default ShareModal
