import React from 'react'
import './Homepage.scss'

import { useLang } from 'hooks'
import { LeftSidebar, RightSidebar, Title } from 'components'
import { Outlet } from 'react-router-dom'

const Homepage = () => {
  return (
    <div className='hp-container'>
      <Title title={useLang('NhacCuaTui Clone - Nghe nhạc Mới, tải nhạc Hot chất lượng cao', 'NhacCuaTui Clone - Music for everyone')} />
      <LeftSidebar />
      <Outlet />
      <RightSidebar />
    </div>
  )
}

export default Homepage
