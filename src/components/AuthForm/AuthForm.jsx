import React from 'react'
import './AuthForm.scss'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { TERM_LINK } from 'share/constants'
import { handleFocus, handleBlur } from 'services/AuthForm'

import { useStore, actions } from 'store'

import { IoMdClose } from 'react-icons/io'
import { AiOutlineUser } from 'react-icons/ai'
import { BsKeyboard, BsInfoCircle } from 'react-icons/bs'
import { HiOutlineMail } from 'react-icons/hi'

const AuthForm = () => {
  const [state, dispatch] = useStore()
  const { lang, showLogin, showSignUp } = state

  const defineLang = (vie, eng) => {
    return lang === 'vi' ? vie : eng
  }

  const authSchema = {}

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur', reValidateMode: 'onBlur', resolver: yupResolver(authSchema) })

  const toggleShowLogin = () => {
    dispatch(actions.toggleShowLogin())
  }

  const toggleShowSignUp = () => {
    dispatch(actions.toggleShowSignUp())
  }

  const handleAuthFunc = (loginFunc, signUpFunc) => {
    return (showLogin && loginFunc) || (showSignUp && signUpFunc)
  }

  const onLoginSubmit = (data) => {
    console.log(data)
  }

  const onSignUpSubmit = (data) => {
    console.log(data)
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
          <div className='form-container'>
            <form onSubmit={handleSubmit(handleAuthFunc(onLoginSubmit, onSignUpSubmit))}>
              <div className='input-container username'>
                <div className='input-main'>
                  <AiOutlineUser className='input-icon' />
                  <input type='text' {...register('username')} placeholder={defineLang('Tên hiển thị', 'Username')} onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e)} />
                  {showSignUp && (
                    <div className='more-info username'>
                      <BsInfoCircle className='more-info-icon' />
                      <div className='more-info-description'>
                        <p>{defineLang('Bạn có thể sử dụng chữ cái, chữ số, gạch dưới và dấu chấm. Chiều dài tối đa 30 kí tự', 'You can use letters, numbers, underscores and dots. Length from 6-30 characters')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="input-container email">
                <div className="input-main">
                  <HiOutlineMail className='input-icon' />
                  <input type="email" {...register('email')} placeholder='Email' onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e)} />
                  {showSignUp && (
                    <div className='more-info email'>
                      <BsInfoCircle className='more-info-icon' />
                      <div className='more-info-description'>
                        <p>{defineLang('Điền vào Email bạn muốn sử dụng cho tài khoản này', 'Fill in the Email you want to use for this account')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
