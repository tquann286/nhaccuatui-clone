import React from 'react'

import { Image } from 'components'
import no_user_img from 'images/default/default_user.jpg'

const UpdateUser = ({ defineLang, photoURL = '' }) => {
  return (
    <div>
      <div className='mt-28px text-22px font-bold color-0-88'>{defineLang('Cập Nhật Thông Tin', 'Update Profile')}</div>
      <div className='mt-24px'>
        <div className='update-user-field'>
          <p className='text-13px color-0-5 w-40 font-medium'>{defineLang('Hình đại diện', 'Avatar')}:</p>
          <Image className='w-64px h-64px rounded-4px mr-17px' imageUrl={photoURL} backupImg={no_user_img} />
          <div>
            <input type='file' id='user-thumb' name='user-thumbnail' accept='image/*' className='hidden' />
            <label htmlFor='user-thumb'>
              <div className='w-48 h-32px text-xs min-w-48 mt-4px mb-8px mr-8px rounded-4px normal-case py-6px px-8px flexCenter bg-color-0-05'>
                <span className='color-0-5 font-medium'>{defineLang('Chọn file', 'Choose file')}</span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateUser
