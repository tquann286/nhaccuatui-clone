import React, { useState } from 'react'

import { Image, InputField } from 'components'
import no_user_img from 'images/default/default_user.jpg'
import { storage } from 'config/firebase'
import { ref } from 'firebase/storage'
import { toastNotify } from 'share/toast'

const UpdateUser = ({ defineLang, photoURL = '', displayName = '' }) => {
  const [tempAvatar, setTempAvatar] = useState(photoURL)
  const [tempUsername, setTempUsername] = useState(displayName)

  const handleTempImage = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          setTempAvatar(reader.result)
        }
      }
      reader.onerror = () => toastNotify(defineLang('Vui lòng chọn ảnh hợp lệ.', 'Please select a valid image.'))
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const usernameInputProps = {
    label: defineLang('Tên tài khoản', 'Username'),
    value: tempUsername,
    setValue: setTempUsername,
    placeholder: defineLang('Tên tài khoản', 'Username'),
  }

  return (
    <div>
      <div className='mt-28px text-22px font-bold color-0-88'>{defineLang('Cập Nhật Thông Tin', 'Update Profile')}</div>
      <div className='mt-24px'>
        <div className='update-user-field'>
          <p className='update-user-label'>{defineLang('Hình đại diện', 'Avatar')}:</p>
          <Image className='w-64px h-64px rounded-4px mr-17px' imageUrl={tempAvatar} backupImg={no_user_img} />
          <div>
            <input type='file' id='user-thumb' name='user-thumbnail' accept='image/*' className='hidden' onChange={handleTempImage} />
            <label htmlFor='user-thumb'>
              <div className='w-48 h-32px text-xs min-w-48 mt-4px mb-8px mr-8px rounded-4px normal-case py-6px px-8px flexCenter bg-color-0-05'>
                <span className='color-0-5 font-medium'>{defineLang('Chọn file', 'Choose file')}</span>
              </div>
            </label>
          </div>
        </div>
        <InputField { ... usernameInputProps } />
      </div>
    </div>
  )
}

export default UpdateUser
