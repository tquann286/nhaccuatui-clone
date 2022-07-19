import React from 'react'
import { Link } from 'react-router-dom'
import './Explore.scss'

import { SongThumb, Footer, Title } from 'components'
import m4u_image from 'images/m4u/m4u_v1.jpg'

import { auth } from 'config/firebase'
import { useStore } from 'store'

const Explore = () => {
  const [state] = useStore()
  const { lang } = state

  const defineLang = (vie, eng) => lang === 'vi' ? vie : eng

  return (
    <div className='explore-container'>
      <Title title={defineLang('Giai điệu âm nhạc dành riêng cho bạn - NhacCuaTui', 'Music melody just for you - NhacCuaTui')} />
      <div className='explore-wrapper'>
        <div className='explore-content'>
          <div style={{ padding: '2.4rem 3.2rem 0' }}>
            <div className='explore-main'>
              <SongThumb width='24rem' shadowHeight='0.6rem' imageUrl={m4u_image} />
              <div className='explore-description'>
                <p className='title-playlist color-0-88'>
                  <span>{defineLang('Danh sách phát: ', 'Playlist: ')}</span>
                  Music 4U
                </p>
                <p className='description'>{auth.currentUser ? defineLang('Dữ liệu nghe nhạc của bạn chưa đủ để sử dụng tính năng này, tiếp tục nghe nhạc để chúng tôi có thể hiểu bạn nhiều hơn.', 'Your data is not enough to use this feature. Listen more the get the music that matches your interest!') : defineLang('Đăng nhập ngay để khám phá những ca khúc hay nhất được chọn lọc dành riêng cho bạn.', "Sign in now to discover the best songs selected just for you. Don't miss it out!")}</p>
                <div className='explore-btn'>
                  <p className='explore-btn-title'>{auth.currentUser ? <Link to='/bai-hat/top-20/nhac-viet'>{defineLang('Nghe nhạc', 'Listen music')}</Link> : defineLang('Đăng nhập ngay', 'Sign in now')}</p>
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
