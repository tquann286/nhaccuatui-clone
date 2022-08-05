import React from 'react'
import { Outlet } from 'react-router-dom'

const Top100 = () => {
  return (
    <div className='top100-page-container'>
      <Outlet />
    </div>
  )
}

export default Top100