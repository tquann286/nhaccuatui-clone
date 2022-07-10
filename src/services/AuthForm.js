import * as Yup from 'yup'
import { REGEX_VIETNAMESE, REGEX_EMAIL } from 'share/constants'

export const handleFocus = (e) => {
  e.target.parentElement.classList.add('focus')
}

export const handleBlur = (e) => {
  e.target.parentElement.classList.remove('focus')
}

export const authSchema = (defineLang, handleAuthFunc) => {
  const emailSchema = Yup.string().required(defineLang('Vui lòng điền vào trường này.', 'Email is required.')).matches(REGEX_EMAIL, defineLang('Email không hợp lệ.', 'Invalid email.')).trim(defineLang('Email không hợp lệ.', 'Invalid email'))

  const passwordSchema = Yup.string().required(defineLang('Vui lòng điền vào trường này.', 'Password is required.')).trim(defineLang('Mật khẩu không hợp lệ.', 'Invalid password')).min(6, defineLang('Mật khẩu chứa ít nhất 6 ký tự', 'Password must contain at least 6 characters')).matches(REGEX_VIETNAMESE, defineLang('Vui lòng không sử dụng Tiếng Việt', 'Please do not use Vietnamese accented'))

  const usernameSchema = Yup.string().required(defineLang('Vui lòng điền vào trường này.', 'Username is required.')).max(30, defineLang('Tên người dùng phải ít hơn 30 ký tự.', 'Username is must less than 30 characters.'))

  const confirmedPasswordSchema = Yup.string()
    .required(defineLang('Vui lòng điền vào trường này.', 'Re-enter password is required.'))
    .trim(defineLang('Mật khẩu không hợp lệ.', 'Invalid password'))
    .oneOf([Yup.ref('password'), null], defineLang('Mật khẩu nhập lại không đúng.', 'Incorrect re-enter password.'))

  const loginSchema = Yup.object().shape({
    email: emailSchema,
    password: passwordSchema,
  })

  const signUpSchema = Yup.object().shape({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmedPassword: confirmedPasswordSchema,
  })

  return handleAuthFunc(loginSchema, signUpSchema)
}
