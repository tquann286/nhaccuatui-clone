import React from 'react'
import './AuthForm.scss'

import { TERM_LINK } from 'share/constants'

import { useStore, actions } from 'store'

import { IoMdClose } from 'react-icons/io'

const AuthForm = () => {
  const [state, dispatch] = useStore()
  const { lang, showLogin, showSignUp } = state

  const toggleShowLogin = () => {
    dispatch(actions.toggleShowLogin())
  }

  const toggleShowSignUp = () => {
    dispatch(actions.toggleShowSignUp())
  }

  const handleAuthFunc = (loginFunc, signUpFunc) => {
    return (showLogin && loginFunc) || (showSignUp && signUpFunc)
  }

  return (
    <div className='af-container' onClick={(e) => e.stopPropagation()}>
      <div className='af-main'>
        <div className='af-header'>
          <h4>{lang === 'vi' ? handleAuthFunc('Đăng nhập', 'Đăng ký') : handleAuthFunc('Sign in', 'Sign up')}</h4>
          <button className='close-btn' onClick={handleAuthFunc(toggleShowLogin, toggleShowSignUp)}>
            <IoMdClose />
          </button>
        </div>
        <div className='af-content'>
          <div className='af-login-form'>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
