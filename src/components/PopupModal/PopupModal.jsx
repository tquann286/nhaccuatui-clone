import React, { useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import './PopupModal.scss'

const PopupModal = ({ showModal, modalPosition, toggleModal, children }) => {
  const modalRef = useRef(null)

  if (!showModal) return null

  return createPortal(
    <div className='overlay' onClick={toggleModal}>
      <div className='pm-container' ref={modalRef} style={modalPosition}>
        {children}
      </div>
    </div>,
    document.body
  )
}

export default PopupModal
