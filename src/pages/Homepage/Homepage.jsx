import React from 'react'
import './Homepage.scss'

import { LeftSidebar, RightSidebar } from 'components'
import { Outlet } from 'react-router-dom'

const Homepage = () => {
  return (
    <div className='hp-container'>
      <LeftSidebar />
      <Outlet />
      <RightSidebar />
    </div>
  )
}

export default Homepage
