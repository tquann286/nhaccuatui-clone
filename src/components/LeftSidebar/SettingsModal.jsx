import React from 'react'

import { onClickSupport } from 'services/SettingsModal'

import { MdLanguage, MdWbSunny } from 'react-icons/md'
import { BiSupport } from 'react-icons/bi'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import { MdArrowForwardIos } from 'react-icons/md'

import { actions } from 'store'

const SettingsModal = ({ isShow, theme, dispatch }) => {

  const onChangeViLang = () => {
    dispatch(actions.changeViLang())
  }

  const onChangeEnLang = () => {
    dispatch(actions.changeEnLang())
  }

  const onChangeLightTheme = () => {
    dispatch(actions.changeLightTheme())
  }

  const onChangeDarkTheme = () => {
    dispatch(actions.changeDarkTheme())
  }

  return (
    <div className='sm-container'>
      <div className='sm-item sm-languages'>
        <MdLanguage className='sm-icon' />
        <span className='sm-title'>Ngôn ngữ</span>
        <MdArrowForwardIos className='ar-icon' />
        <div className='sm-sub-items sm-lang-items'>
          <div className='sm-sub-item sm-lang-vi' onClick={onChangeViLang}>
            <span className='sm-title'>Tiếng Việt</span>
          </div>
          <div className='sm-sub-item sm-lang-en' onClick={onChangeEnLang}>
            <span className='sm-title'>Tiếng Anh</span>
          </div>
        </div>
      </div>
      <div className='sm-item sm-support' onClick={onClickSupport}>
        <BiSupport className='sm-icon' />
        <span className='sm-title'>Hỗ trợ</span>
      </div>
      <div className='sm-item sm-themes'>
        {theme === 'light' ? <MdWbSunny className='sm-icon' /> : <BsFillMoonStarsFill className='sm-icon' />}
        <span className='sm-title'>Chủ đề</span>
        <MdArrowForwardIos className='ar-icon' />
        <div className='sm-sub-items sm-theme-items'>
          <div className='sm-sub-item sm-theme-light' onClick={onChangeLightTheme}>
            <span className='sm-title'>Nền sáng</span>
          </div>
          <div className='sm-sub-item sm-theme-dark' onClick={onChangeDarkTheme}>
            <span className='sm-title'>Nền tối</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal
