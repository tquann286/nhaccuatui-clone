import React from 'react'

import { motion } from 'framer-motion'

import { MdLanguage, MdWbSunny } from 'react-icons/md'
import { BiSupport } from 'react-icons/bi'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import { MdArrowForwardIos } from 'react-icons/md'

const SettingsModal = ({ isShow, theme, dispatch }) => {
  return (
    <div className='sm-container'>
      <div className='sm-item sm-languages'>
        <MdLanguage className='sm-icon' />
        <span className='sm-title'>Ngôn ngữ</span>
        <MdArrowForwardIos className='ar-icon' />
        <div className='sm-sub-items sm-lang-items'>
          <div className='sm-sub-item sm-lang-vi'>
            <span className='sm-title'>Tiếng Việt</span>
          </div>
          <div className='sm-sub-item sm-lang-en'>
            <span className='sm-title'>Tiếng Anh</span>
          </div>
        </div>
      </div>
      <div className='sm-item sm-support'>
        <BiSupport className='sm-icon' />
        <span className='sm-title'>Hỗ trợ</span>
      </div>
      <div className='sm-item sm-themes'>
        {theme === 'light' ? <MdWbSunny className='sm-icon' /> : <BsFillMoonStarsFill className='sm-icon' />}
        <span className='sm-title'>Chủ đề</span>
        <MdArrowForwardIos className='ar-icon' />
        <div className='sm-sub-items sm-theme-items'>
          <div className='sm-sub-item sm-theme-light'>
            <span className='sm-title'>Nền sáng</span>
          </div>
          <div className='sm-sub-item sm-theme-dark'>
            <span className='sm-title'>Nền tối</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal
