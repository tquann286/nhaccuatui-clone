import React from 'react'
import './LoginForm.scss'

import { useStore, actions } from 'store'

import { IoMdClose } from 'react-icons/io'

const LoginForm = () => {
  const [state, dispatch] = useStore()
  const { lang, showLogin } = state

  

  const toggleShowLogin = () => {
    dispatch(actions.toggleShowLogin())
  }

  return (
    <div className='lf-container' onClick={(e) => e.stopPropagation()}>
      <div className='lf-main'>
        <div className="lf-header">
          <h4>{lang === 'vi' ? 'Đăng nhập' : 'Sign in'}</h4>
          <button className='close-btn' onClick={toggleShowLogin}>
            <IoMdClose />
          </button>
        </div>
        <div className="lf-content"></div>
      </div>
    </div>
  )
}

export default LoginForm