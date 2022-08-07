import React from 'react'
import { Outlet } from 'react-router-dom'

const Chart = () => {
  return (
    <div className='topic-page-container'>
      <Outlet />
    </div>
  )
}

export default Chart