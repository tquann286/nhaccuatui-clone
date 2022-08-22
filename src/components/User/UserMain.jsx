import React, { useState, useCallback, useEffect } from 'react'

import { SquareImg } from 'components'
import { useTitle } from 'hooks'
import { useStore } from 'store'
import { auth } from 'config/firebase'
import { getUserDetail } from 'services/firebase/firestore'
import { Button } from '@mui/material'

const UserMain = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, en) => state.lang === 'vi' ? vie : en, [state.lang])

  const { currentUser } = auth
  const { displayName, email, emailVerified, photoURL, uid } = currentUser
  
  const [userDetail, setUserDetail] = useState({})
  const { introduce, phoneNumber,  } = userDetail

  useEffect(() => {
    const getUserDetailData = async () => {
      const userDetail = await getUserDetail()

      setUserDetail(userDetail)
    }

    getUserDetailData()
  },[])

  useTitle(defineLang(`${displayName} | Thông tin cá nhân - NhacCuaTui Clone`, `${displayName} | Personal Information - NhacCuaTui Clone`))

  return (
    <div className='commonMainOutlet'>
      <div className="relative pt-24px px-32px">
        <div className="w3-row h-160px w-full">
          <div className='w3-col rounded-circle w-160px h160px'>
            <SquareImg imageUrl={photoURL} title={displayName} />
          </div>
          <div className="w3-rest pl-24px overflow-hidden">
            <div className="w-full h-28px text-13px leading-28px color-0-88 font-semibold">
              {displayName}
            </div>
            {introduce && (
              <div></div>
            )}
            <div className="w3-row mt-24px">
              <Button className='w-120px h-32px text-xs mr-8px rounded-4px bg-color-0-05 color-0-5 normal-case'>
                {defineLang('Cập nhật', 'Update')}
              </Button>
              <Button className='w-120px h-32px text-xs mr-8px rounded-4px bg-color-0-05 color-0-5 normal-case'>
                {defineLang('Đổi mật khẩu', 'Change password')}
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default UserMain