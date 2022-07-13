import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import noPlayer from 'images/default_player_v2.jpg'

import { getTrendingSong } from 'services/RightSidebar/NoPlayingSong'

const NoPlayingSong = ({ defineSong }) => {

  useEffect(() => {
    getTrendingSong().then((res) => {
      if (res) {
        setTrendingSong(res)
      }
    })
  }, [])
  return (
    <div className='rb-container'>
      <div className='rb-suggestion'>
        <div className='no-playing-song'>
          <div className='main'>
            <img src={noPlayer} alt={defineSong('Thưởng thức nhạc thôi nào!', 'Play music and enjoy')} />
            <p className='title'>{defineSong('Thưởng thức những giai điệu theo cách riêng của bạn', 'Enjoy the melody in your own way')}</p>
            <div className='play-now'>
              <Link to='/bai-hat/top-20/nhac-viet'>
                {defineSong('Nghe nào', 'Play now')}
              </Link>
            </div>
          </div>
        </div>
        <div className='suggest-song'></div>
      </div>
    </div>
  )
}

export default NoPlayingSong