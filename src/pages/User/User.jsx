import React from 'react'
import './User.scss'

import { auth } from 'config/firebase'
import { NoUserFound } from 'components'

const User = () => {

  if (!auth.currentUser) return <NoUserFound />

  return (
    <div className='user-main'>User</div>
  )
}

export default User