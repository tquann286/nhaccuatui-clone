import React from 'react'
import './AuthForm.scss'

import { Formik } from 'formik'
import { validateLogin, onSubmitLogin } from 'services/AuthForm'

import { useStore, actions } from 'store'

import { IoMdClose } from 'react-icons/io'

const AuthForm = () => {
  const [state, dispatch] = useStore()
  const { lang, showLogin, showSignUp } = state

  const handleAuthFunc = (loginFunc, signUpFunc) => {
    return (showLogin && loginFunc) || (showSignUp && signUpFunc)
  }

  const toggleShowLogin = () => {
    dispatch(actions.toggleShowLogin())
  }

  const toggleShowSignUp = () => {
    dispatch(actions.toggleShowSignUp())
  }
  
  return (
    <div className='af-container' onClick={(e) => e.stopPropagation()}>
      <div className='af-main'>
        <div className="af-header">
          <h4>{lang === 'vi' ? handleAuthFunc('Đăng nhập', 'Đăng ký') : handleAuthFunc('Sign in', 'Sign up')}</h4>
          <button className='close-btn' onClick={handleAuthFunc(toggleShowLogin, toggleShowSignUp)}>
            <IoMdClose />
          </button>
        </div>
        <div className="af-content">
          <div className="af-login-form">
            <Formik initialValues={{ email: '', password: '' }} validate={validateLogin} onSubmit={onSubmitLogin}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => {
              
              return
            }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm