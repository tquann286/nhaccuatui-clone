import React from 'react'
import './AuthForm.scss'

import { Formik, Form, Field } from 'formik'
import { onSubmitLogin, validationAuthSchema } from 'services/AuthForm'
import * as Yup from 'yup'

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

  const initialAuthValues = handleAuthFunc({ email: '', password: '' }, { userName: '', email: '', password: '', confirmPassword: '' })

  const onSubmitSinUp = (values, alo) => {
    console.log(alo)
  }

  const authSchema = () => {
    const emailSchema = Yup.string().email(handleAuthFunc('Email không hợp lệ.', 'Invalid email.')).required(handleAuthFunc('Vui lòng điền vào trường này.', 'Email is required.')).trim(handleAuthFunc('Email không hợp lệ.', 'Invalid email'))
    const passwordSchema = Yup.string().required().trim(handleAuthFunc('Mật khẩu không hợp lệ.', 'Invalid password'))

    const loginSchema = Yup.object().shape({
      email: emailSchema,
      password: passwordSchema,
    })

    const signUpSchema = Yup.object().shape({
      userName: Yup.string().required(handleAuthFunc('Vui lòng điền vào trường này.', 'Username is required.')).max(50, handleAuthFunc('Tên người dùng phải ít hơn 50 ký tự.', 'Username is must less than 50 characters.')),
      email: emailSchema,
      password: passwordSchema,
      confirmPassword: Yup.string()
        .required()
        .trim(handleAuthFunc('Mật khẩu không hợp lệ.', 'Invalid password'))
        .oneOf([Yup.ref('password'), null], handleAuthFunc('Mật khẩu nhập lại không đúng.', 'Incorrect re-enter password.')),
    })

    return handleAuthFunc(loginSchema, signUpSchema)
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
            <Formik initialValues={initialAuthValues} validationSchema={validationAuthSchema()} onSubmit={handleAuthFunc(onSubmitLogin, onSubmitSinUp)}>
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
                return (
                  <Form>
                    {showSignUp && <Field type='text' name='userName' placeholder={lang === 'vi' ? 'Tên người dùng' : 'Username'} />}
                    <Field name='email' placeholder='Email' />
                    <Field type='password' name='password' placeholder={lang === 'vi' ? 'Nhập mật khẩu' : 'Password'} />
                    {showSignUp && <Field name='confirmPassword' placeholder={lang === 'vi' ? 'Nhập lại mật khẩu' : 'Re-enter Password'} />}
                    {showSignUp && (
                      <div className='auth-term'>
                        <label htmlFor='term'>
                          <input id='term' name='term' type='checkbox' />
                          {lang === 'vi' ? 'Tôi đã đọc và đồng ý với các' : 'I have read and agree to the'}
                        </label>
                        <a className='auth-term' href={TERM_LINK} target='_blank' rel='noopener'>
                          {lang === 'vi' ? 'Điều khoản' : 'Terms'}
                        </a>
                      </div>
                    )}
                    <button type='submit'>{lang === 'vi' ? handleAuthFunc('Đăng nhập', 'Đăng kí') : handleAuthFunc('Sign in', 'Sign up')}</button>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
