import React, { useState } from 'react'
import './AuthForm.scss'
import { LoadingV2 } from 'components'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { ToastContainer } from 'react-toastify'

import { TERM_LINK } from 'share/constants'
import { errorToastProps, successToastProps, successToastNotify } from 'share/toast'
import { handleFocus, handleBlur, authSchema, handleLoginError, handleSignUpError } from 'services/AuthForm'

import { useStore, actions } from 'store'

import { IoMdClose } from 'react-icons/io'
import { AiOutlineUser } from 'react-icons/ai'
import { BsKeyboard, BsInfoCircle } from 'react-icons/bs'
import { HiOutlineMail } from 'react-icons/hi'
import { IoWarningOutline } from 'react-icons/io5'

import { auth } from 'config/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { addUser } from 'services/firebase/firestore'

const AuthForm = () => {
  const [state, dispatch] = useStore()
  const { lang, showLogin, showSignUp } = state

  const [agreeTerm, setAgreeTerm] = useState(false || showLogin)
  const [isVerifying, setIsVerifying] = useState(false)

  const defineLang = (vie, eng) => {
    return lang === 'vi' ? vie : eng
  }

  const handleAuthFunc = (loginFunc, signUpFunc) => {
    return (showLogin && loginFunc) || (showSignUp && signUpFunc)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur', reValidateMode: 'onChange', resolver: yupResolver(authSchema(defineLang, handleAuthFunc)) })

  const toggleShowLogin = () => {
    dispatch(actions.toggleShowLogin())
  }

  const toggleShowSignUp = () => {
    dispatch(actions.toggleShowSignUp())
  }

  const onLoginSubmit = async ({ email, password }) => {
    try {
      setIsVerifying(true)

      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log(userCredential)
      successToastNotify(defineLang('Đăng nhập thành công.', 'Sign in successfully.'))

      setIsVerifying(false)
    } catch (error) {
      handleLoginError(error.code, defineLang)
      setIsVerifying(false)
    }
  }

  const onSignUpSubmit = async ({ username, email, password }) => {
    try {
      setIsVerifying(true)

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await addUser(username, email, userCredential.user.uid)

      successToastNotify(defineLang('Đăng ký thành công.', 'Sign up successfully.'))

      setIsVerifying(false)
    } catch (error) {
      handleSignUpError(error.code, defineLang)
      setIsVerifying(false)
    }
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
              {showSignUp && (
                <React.Fragment>
                  <div className='input-container username'>
                    <div className='input-main'>
                      <AiOutlineUser className='input-icon' />
                      <input type='text' {...register('username')} placeholder={defineLang('Tên hiển thị', 'Username')} onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e)} />
                      {showSignUp && (
                        <div className='more-info username'>
                          <BsInfoCircle className='more-info-icon' />
                          <div className='more-info-description'>
                            <p>{defineLang('Bạn có thể sử dụng chữ cái, chữ số, gạch dưới và dấu chấm. Chiều dài tối đa 30 kí tự', 'You can use letters, numbers, underscores and dots. Length from 30 characters')}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {errors.username && (
                    <p className='error'>
                      <IoWarningOutline /> {errors.username.message}
                    </p>
                  )}
                </React.Fragment>
              )}
              <div className='input-container email'>
                <div className='input-main'>
                  <HiOutlineMail className='input-icon' />
                  <input type='email' {...register('email')} placeholder='Email' onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e)} />
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
              {errors.email && (
                <p className='error'>
                  <IoWarningOutline /> {errors.email.message}
                </p>
              )}
              <div className='input-container password'>
                <div className='input-main'>
                  <BsKeyboard className='input-icon' />
                  <input type='password' {...register('password')} placeholder={defineLang('Mật khẩu', 'Password')} onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e)} />
                  {showSignUp && (
                    <div className='more-info password'>
                      <BsInfoCircle className='more-info-icon' />
                      <div className='more-info-description'>
                        <p>{defineLang('Chiều dài ít nhất 6 kí tự. Không sử dụng tiếng Việt có dấu', 'Length is must more than 6 characters. Do not use accented Vietnamese')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {errors.password && (
                <p className='error'>
                  <IoWarningOutline /> {errors.password.message}
                </p>
              )}
              {showSignUp && (
                <React.Fragment>
                  <div className='input-container confirmedPassword'>
                    <div className='input-main'>
                      <BsKeyboard className='input-icon' />
                      <input type='password' {...register('confirmedPassword')} placeholder={defineLang('Nhập lại mật khẩu', 'Re-enter Password')} onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e)} />
                      {showSignUp && (
                        <div className='more-info confirmedPassword'>
                          <BsInfoCircle className='more-info-icon' />
                          <div className='more-info-description'>
                            <p>{defineLang('Nhập lại mật khẩu giống như bên trên một lần nữa', 'Re-enter the same password as above again')}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {errors.confirmedPassword && (
                    <p className='error'>
                      <IoWarningOutline /> {errors.confirmedPassword.message}
                    </p>
                  )}
                </React.Fragment>
              )}
              {showSignUp && (
                <div className='term-container'>
                  <label className='container'>
                    {defineLang(`Tôi đã đọc và đồng ý với các `, `I have read and agree to the `)}
                    <input type='checkbox' checked={agreeTerm} onChange={() => setAgreeTerm(!agreeTerm)} />
                    <span className='checkmark'></span>
                  </label>
                  <a href={TERM_LINK} className='link-term' target='_blank' rel="noreferrer">
                    {defineLang('Điều khoản', 'Terms')}
                  </a>
                </div>
              )}
              <button type='submit' className={`submit-btn ${showSignUp && 'sign-up'} ${agreeTerm || 'disabled'} ${isVerifying && 'disabled'}`} disabled={!agreeTerm || isVerifying}>
                {isVerifying ? <LoadingV2 /> : handleAuthFunc(defineLang('Đăng nhập', 'Sign in'), defineLang('Đăng ký', 'Sign up'))}
              </button>
              <ToastContainer {...errorToastProps} />
              <ToastContainer {...successToastProps} />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
