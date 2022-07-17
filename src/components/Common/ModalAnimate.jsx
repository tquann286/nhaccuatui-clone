import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ModalAnimate = ({ children, animateProps, isVisible, key }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div key={key} {...animateProps}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ModalAnimate
