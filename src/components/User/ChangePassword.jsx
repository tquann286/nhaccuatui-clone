import React from 'react'
import { CenterModal } from 'components'

const ChangePassword = ({ defineLang, isChangePass, toggleIsChangePass }) => {
  const centerModalProps = {
    modalName: defineLang('Đổi mật khẩu', 'Change password'),
    showModal: isChangePass,
    toggleModal: toggleIsChangePass,
  }

  return (
    <CenterModal {...centerModalProps}>
      <div>ChangePassword</div>
    </CenterModal>
  )
}

export default ChangePassword
