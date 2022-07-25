import React, { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const ModalAnimate = ({ children, animateProps, isVisible, keyId }) => {
  const [animationParent] = useAutoAnimate()

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div key={keyId} {...animateProps}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ModalAnimate
