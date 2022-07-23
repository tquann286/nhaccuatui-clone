import React from 'react'
import './NoUserFound.scss'

import { useLang } from 'hooks'
import { Title } from 'components'

const NoUserFound = () => {
  return (
    <div className='no-user-found'>
      <Title title={useLang('Không tìm thấy người dùng', 'No user found')} />
      NoUserFound
    </div>
  )
}

export default NoUserFound
