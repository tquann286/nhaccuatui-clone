import React, { useState } from 'react'
import { CenterModal } from 'components'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toastNotify } from 'share/toast'
import { handleFocusInput, handleBlurInput } from 'share/utilities'
import { useStore, actions } from 'store'
import { BsKeyboard, BsInfoCircle } from 'react-icons/bs'
import { IoWarningOutline } from 'react-icons/io5'
import { changePassSchema } from 'services/User/UpdateUser'
import LoadingV2 from './../Loading/LoadingV2'

const ChangePassword = ({ defineLang, isChangePass, toggleIsChangePass }) => {
  const [isVerifying, setIsVerifying] = useState(false)

  const onChangePassword = async ({ oldPassword, newPassword, confirmNewPassword }) => {
    console.log('oldPassword: ', oldPassword)
    console.log('newPassword: ', newPassword)
    console.log('confirmNewPassword: ', confirmNewPassword)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur', reValidateMode: 'onChange', resolver: yupResolver(changePassSchema(defineLang)) })
  
  const centerModalProps = {
    modalName: defineLang('Đổi mật khẩu', 'Change password'),
    showModal: isChangePass,
    toggleModal: toggleIsChangePass,
  }

  return (
    <CenterModal {...centerModalProps}>
      <div className='af-content !mt-0'>
        <div className='form-container !my-36px'>
          <form onSubmit={handleSubmit(onChangePassword)}>
            <div className='input-container password'>
              <div className='input-main border-0-05'>
                <BsKeyboard className='input-icon border-0-05 color-0-5' />
                <input className='color-0-5 bg-color-0-01' type='password' {...register('oldPassword')} placeholder={defineLang('Mật khẩu hiện tại', 'Current password')} onFocus={(e) => handleFocusInput(e)} onBlur={(e) => handleBlurInput(e)} />
              </div>
            </div>
            {errors.oldPassword && (
              <p className='error'>
                <IoWarningOutline /> {errors.oldPassword.message}
              </p>
            )}
            <div className='input-container password'>
              <div className='input-main border-0-05'>
                <BsKeyboard className='input-icon border-0-05 color-0-5' />
                <input className='color-0-5 bg-color-0-01' type='password' {...register('newPassword')} placeholder={defineLang('Mật khẩu mới', 'New password')} onFocus={(e) => handleFocusInput(e)} onBlur={(e) => handleBlurInput(e)} />
              </div>
            </div>
            {errors.newPassword && (
              <p className='error'>
                <IoWarningOutline /> {errors.newPassword.message}
              </p>
            )}
            <div className='input-container confirmedPassword'>
              <div className='input-main border-0-05'>
                <BsKeyboard className='input-icon border-0-05 color-0-5' />
                <input className='color-0-5 bg-color-0-01' type='password' {...register('confirmNewPassword')} placeholder={defineLang('Nhập lại mật khẩu mới', 'Re-enter new password')} onFocus={(e) => handleFocusInput(e)} onBlur={(e) => handleBlurInput(e)} />
                <div className='more-info confirmedPassword'>
                  <BsInfoCircle className='more-info-icon color-0-2' />
                  <div className='more-info-description'>
                    <p>{defineLang('Nhập lại mật khẩu mới trên một lần nữa', 'Re-enter new password as above again')}</p>
                  </div>
                </div>
              </div>
            </div>
            {errors.confirmNewPassword && (
              <p className='error'>
                <IoWarningOutline /> {errors.confirmNewPassword.message}
              </p>
            )}
            <button type='submit' className={`submit-btn ${isVerifying && 'disabled'}`} disabled={isVerifying}>
              {isVerifying ? <LoadingV2 /> : defineLang('Lưu', 'Save')}
            </button>
          </form>
        </div>
      </div>
    </CenterModal>
  )
}

export default ChangePassword
