import React from 'react'
import './User.scss'

import { auth } from 'config/firebase'
import { NoUserFound, Title } from 'components'
import { useLang } from 'hooks'

const User = () => {

  if (!auth.currentUser) return <NoUserFound />

  return (
    <div className='user-container'>
      
    </div>
  )
}

export default User