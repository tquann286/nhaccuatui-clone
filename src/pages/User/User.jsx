import React from 'react'
import { Outlet } from 'react-router-dom'
import './User.scss'

import { auth } from 'config/firebase'
import { NoUserFound, Title } from 'components'
import { useLang } from 'hooks'

const User = () => {

  if (!auth.currentUser) return <NoUserFound />

  return (
    <div className='user-container'>
      <Outlet />
    </div>
  )
}

export default User