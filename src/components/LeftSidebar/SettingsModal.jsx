import React from 'react'

import { MdLanguage, MdWbSunny } from 'react-icons/md'
import { BiSupport } from 'react-icons/bi'
import { BsFillMoonStarsFill } from 'react-icons/bs'

const SettingsModal = ({ theme, dispatch }) => {
  return (
    <div className='sm-container'>
      <div className='sm-item sm-languages'>
        <MdLanguage className='sm-icon' />
        <span className='sm-title'>Ngôn ngữ</span>
      </div>
      <div className='sm-item sm-support'>
        <BiSupport className='sm-icon' />
        <span className='sm-title'>Hỗ trợ</span>
      </div>
      <div className='sm-item sm-themes'>
        {theme === 'light' ? <MdWbSunny className='sm-icon' /> : <BsFillMoonStarsFill className='sm-icon' />}
        <span className='sm-title'>Chủ đề</span>
      </div>
    </div>
  )
}

export default SettingsModal
