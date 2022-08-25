import React from 'react'

import { toastNotify } from 'share/toast'
import { sendEmailVerification } from 'firebase/auth'

const IsVerify = ({ defineLang, isVerify, currentUser = {} }) => {
  console.log('currentUser: ', currentUser)
  const handleVerify = () => {
    if (!isVerify) {
      sendEmailVerification(currentUser).then(() => {
        toastNotify(defineLang('Đã gửi email xác thực, vui lòng kiểm tra email của bạn', 'Email verification sent! Please check your email'))
      }).catch((error) => {
        console.log(error)
        toastNotify(defineLang('Gửi email xác thực không thành công', 'Failure to verify email, please try later'))
      })
    }
  }

  return (
    <div onClick={handleVerify} className={`w3-col flex items-center ml-16px text-13px text-main w-fit ${isVerify ? 'virified' : 'cursor-pointer'}`}>
      {isVerify ? defineLang('Đã xác thực', 'Verified') : defineLang('Chưa xác thực', 'Not verify')}
    </div>
  )
}

export default IsVerify
