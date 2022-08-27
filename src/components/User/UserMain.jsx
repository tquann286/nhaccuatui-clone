import React, { useState, useCallback, useEffect } from 'react'

import { LineBreak, SquareImg, InfoField, IsVerify, Container, UpdateUser } from 'components'
import { useTitle } from 'hooks'
import { useStore } from 'store'
import { auth } from 'config/firebase'
import { getUserDetail } from 'services/firebase/firestore'
import { Button } from '@mui/material'
import { isEmpty } from 'lodash'

const UserMain = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, en) => (state.lang === 'vi' ? vie : en), [state.lang])

  const { currentUser } = auth
  const { displayName = '', email = '', emailVerified = false, photoURL = '', uid = '' } = currentUser

  const [userDetail, setUserDetail] = useState({})
  const { introduce = '', phoneNumber = '', birthday = 0, gender = {}, address = '', city = '' } = userDetail

  useEffect(() => {
    const getUserDetailData = async () => {
      const userDetail = await getUserDetail()

      setUserDetail(userDetail)
    }

    getUserDetailData()
  }, [])

  useTitle(defineLang(`${displayName} | Thông tin cá nhân - NhacCuaTui Clone`, `${displayName} | Personal Information - NhacCuaTui Clone`))

  const isVerifyProps = {
    defineLang,
    isVerify: emailVerified,
    currentUser,
  }

  const [isUpdateUser, setIsUpdateUser] = useState(false)

  const updateUserProps = {
    defineLang,
    ...currentUser,
    ...userDetail,
  }

  console.log('updateUserProps: ', updateUserProps)

  return (
    <div className='commonMainOutlet'>
      <Container>
        <div className='relative pt-24px px-32px'>
          {isUpdateUser ? (
            <UpdateUser { ... updateUserProps } />
          ) : (
            <div>
              <div className='w3-row h-160px w-full'>
                <div className='w3-col rounded-circle w-160px h160px'>
                  <SquareImg imageUrl={photoURL} title={displayName} />
                </div>
                <div className='w3-rest pl-24px overflow-hidden'>
                  <div className='w-full h-28px text-13px leading-28px color-0-88 font-semibold'>{displayName}</div>
                  <div className='w3-row mt-24px'>
                    <Button className='w-120px h-32px text-xs mr-8px rounded-4px bg-color-0-05 color-0-5 normal-case' onClick={() => setIsUpdateUser(true)}>{defineLang('Cập nhật', 'Update')}</Button>
                    <Button className='w-120px h-32px text-xs mr-8px rounded-4px bg-color-0-05 color-0-5 normal-case'>{defineLang('Đổi mật khẩu', 'Change password')}</Button>
                  </div>
                </div>
              </div>
              <LineBreak styles='mt-24px' />
              <div className='mt-28px text-22px font-bold color-0-88'>{defineLang('Thông tin cá nhân', 'Profile')}</div>
              <InfoField title={defineLang('Tên đăng nhập', 'User name')} value={displayName} styles='mt-16px' />
              <InfoField title='Email' value={email} extraComp={<IsVerify {...isVerifyProps} />} />
              <InfoField title={defineLang('Sinh nhật', 'Birthday')} value={birthday ? new Date(birthday).toLocaleDateString() : defineLang('Chưa cập nhật', 'Not Update')} />
              <InfoField title={defineLang('Giới tính', 'Gender')} value={isEmpty(gender) ? defineLang('Chưa cập nhật', 'Not Update') : defineLang(gender.vi, gender.en)} />
              <InfoField title={defineLang('Địa chỉ', 'Address')} value={address || defineLang('Chưa cập nhật', 'Not Update')} />
              <InfoField title={defineLang('Địa chỉ', 'Address')} value={address || defineLang('Chưa cập nhật', 'Not Update')} />
              <InfoField title={defineLang('Thành phố', 'City')} value={city || defineLang('Chưa cập nhật', 'Not Update')} />
              <InfoField title={defineLang('Số điện thoại', 'Phone number')} value={phoneNumber || defineLang('Chưa cập nhật', 'Not Update')} />
              <InfoField title={defineLang('Giới thiệu', 'Introduce')} value={introduce || defineLang('Chưa cập nhật', 'Not Update')} />
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default UserMain
