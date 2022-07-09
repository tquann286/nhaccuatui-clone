import * as Yup from 'yup'

export const onSubmitLogin = (hihi) => {
  console.log(hihi)
  setTimeout(() => {
    alert(JSON.stringify(hihi.values, null, 2));
    hihi.setSubmitting(false);
  }, 400);
}

export const validationAuthSchema = (handleAuthFunc) => {
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
    confirmPassword: Yup.string().required().trim(handleAuthFunc('Mật khẩu không hợp lệ.', 'Invalid password')).oneOf([Yup.ref('password'), null], handleAuthFunc('Mật khẩu nhập lại không đúng.', 'Incorrect re-enter password.'))
  })

  return handleAuthFunc(loginSchema, signUpSchema)
}

export const handleFocus = (e) => {
  e.target.parentElement.classList.add('focus')
}

export const handleBlur = (e) => {
  e.target.parentElement.classList.remove('focus')
}

export const authSchema = (defineLang, handleAuthFunc) => {
  const emailSchema = Yup.string().email(defineLang('Email không hợp lệ.', 'Invalid email.')).required(defineLang('Vui lòng điền vào trường này.', 'Email is required.')).trim(defineLang('Email không hợp lệ.', 'Invalid email'))

  const passwordSchema = Yup.string().required(defineLang('Vui lòng điền vào trường này.', 'Username is required.')).trim(defineLang('Mật khẩu không hợp lệ.', 'Invalid password')).min(6, defineLang('Mật khẩu chứa ít nhất 6 ký tự', 'Password must contain at least 6 characters'))

  const usernameSchema = Yup.string().required(defineLang('Vui lòng điền vào trường này.', 'Username is required.')).max(24, defineLang('Tên người dùng phải ít hơn 24 ký tự.', 'Username is must less than 24 characters.'))

  const confirmedPasswordSchema = Yup.string().required(defineLang('Vui lòng điền vào trường này.', 'Re-enter password is required.')).trim(defineLang('Mật khẩu không hợp lệ.', 'Invalid password')).oneOf([Yup.ref('password'), null], defineLang('Mật khẩu nhập lại không đúng.', 'Incorrect re-enter password.'))

  const loginSchema = Yup.object().shape({
    email: emailSchema,
    password: passwordSchema,
  })

  const signUpSchema = Yup.object().shape({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmedPassword: confirmedPasswordSchema
  })

  return handleAuthFunc(loginSchema, signUpSchema)
}