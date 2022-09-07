import * as Yup from 'yup'
import { toastNotify } from 'share/toast'
import { REGEX_VIETNAMESE } from 'share/constants'

const arrOfInt = (first, last) => {
  const list = []
  for (let i = first; i <= last; i++) {
    list.push(i >= 10 ? i : `0${i}`)
  }

  return list
}

const dayArr = arrOfInt(1, 30)

const monthArr = arrOfInt(1, 12)

const yearArr = arrOfInt(1960, new Date().getFullYear())

export { dayArr, monthArr, yearArr }

export const genderArr = [
  { vi: 'Nam', en: 'Male' },
  { vi: 'Nữ', en: 'Female' },
  { vi: 'Khác', en: 'Other' },
]

export const changePassSchema = (defineLang) => {
  const oldPasswordSchema = Yup.string().required(defineLang('Vui lòng điền vào trường này.', 'Old password is required.')).trim(defineLang('Vui lòng không để các khoảng trống.', 'Invalid password'))

  const newPasswordSchema = Yup.string()
    .required(defineLang('Vui lòng điền vào trường này.', 'New password is required.'))
    .trim(defineLang('Vui lòng không để các khoảng trống.', 'Invalid password'))
    .min(6, defineLang('Mật khẩu chứa ít nhất 6 ký tự', 'Password must contain at least 6 characters'))
    .matches(REGEX_VIETNAMESE, defineLang('Vui lòng không sử dụng Tiếng Việt', 'Please do not use Vietnamese accented'))
    .notOneOf([Yup.ref('oldPassword'), null], defineLang('Mật khẩu mới phải khác mật khẩu cũ.', 'The new password must be different from an old one.'))

  const confirmNewPasswordSchema = Yup.string()
    .required(defineLang('Vui lòng điền vào trường này.', 'Re-enter password is required.'))
    .trim(defineLang('Vui lòng không để các khoảng trống.', 'Invalid password'))
    .oneOf([Yup.ref('newPassword'), null], defineLang('Mật khẩu nhập lại không đúng.', 'Incorrect re-enter password.'))

  const changePasswordSchema = Yup.object().shape({
    oldPassword: oldPasswordSchema,
    newPassword: newPasswordSchema,
    confirmNewPassword: confirmNewPasswordSchema,
  })

  return changePasswordSchema
}
