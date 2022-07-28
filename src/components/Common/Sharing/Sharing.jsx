import React from 'react'
import './Sharing.scss'

import { Tooltip, IconButton } from '@mui/material'
import { FiShare2 } from 'react-icons/fi'

const Sharing = ({ defineLang, placement }) => {

  
  return (
    <div className='sharing-container'>
      <Tooltip className='color-0-5' title={defineLang('Chia sẻ', 'Share')} arrow enterDelay={400} placement={placement}>
        <IconButton aria-label='share' size='large'>
          <FiShare2 />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default Sharing
