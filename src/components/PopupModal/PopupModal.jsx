import React from 'react'
import { createPortal } from 'react-dom';
import { motion } from "framer-motion"
import './PopupModal.scss'

const PopupModal = ({ showModal, showMorePosition, children }) => {
  if (!showModal) return null;

  return createPortal(
    <div className='pm-container' style={showMorePosition}>
      {children}
    </div>,
    document.body
  );
}

export default PopupModal