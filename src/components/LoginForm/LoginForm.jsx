import React from 'react'
import './LoginForm.scss'

import { useStore, actions } from 'store'

const LoginForm = () => {
  const [state, dispatch] = useStore()
  const { theme, lang, showLogin } = state

  return (
    <div className='lf-container' onClick={(e) => e.stopPropagation()}>
      <div className='lf-main'>
        
      </div>
    </div>
  )
}

export default LoginForm
