import React from 'react'
import './Explore.scss'

import { SongThumb, Footer } from 'components'
import m4u_image from 'images/m4u/m4u_v1.jpg'

import { auth } from 'config/firebase'

import { useStore } from 'store'
import { useLang } from 'hooks'

const Explore = () => {
  const [state, dispatch] = useStore()
  const { lang } = state

  return (
    <div className='explore-container'>
      <div className='explore-wrapper'>
        <div className='explore-content'>
          <div style={{ padding: '2.4rem 3.2rem 0' }}>
            <div className='explore-main'>
              <SongThumb width='24rem' shadowHeight='0.6rem' imageUrl={m4u_image} />
              <div className='explore-description'>
                <p className='title-playlist'>
                  <span>{useLang('Danh sách phát: ', 'Playlist: ')}</span>
                  Music 4U
                </p>
                <p className='description'>{useLang('Đăng nhập ngay để khám phá những ca khúc hay nhất được chọn lọc dành riêng cho bạn.', "Sign in now to discover the best songs selected just for you. Don't miss it out!")}</p>
                <div className='explore-btn'>
                  <p className='explore-btn-title'>{useLang('Đăng nhập ngay', 'Sign in now')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Explore
