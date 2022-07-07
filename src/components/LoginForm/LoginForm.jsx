import React from 'react'
import './LoginForm.scss'


import { Formik } from 'formik'
import { validateLogin, onSubmitLogin } from 'services/LoginForm'

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
        <div className="lf-content">
          <div className="lf-login-form">
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

export default LoginForm