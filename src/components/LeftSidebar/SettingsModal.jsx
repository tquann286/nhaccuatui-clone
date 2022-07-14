import React from 'react'

import { onClickSupport } from 'services/SettingsModal'

import { MdLanguage, MdWbSunny } from 'react-icons/md'
import { BiSupport } from 'react-icons/bi'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import { MdArrowForwardIos } from 'react-icons/md'
import { AiOutlineLogout } from 'react-icons/ai'

import { actions } from 'store'

import { signOut } from 'firebase/auth'
import { auth } from 'config/firebase'
import { toastNotify } from 'share/toast'

const SettingsModal = ({ user, theme, lang, dispatch }) => {

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

  const onLogout = () => {
    signOut(auth)
    toastNotify(lang === 'vi' ? 'Đăng xuất thành công.' : 'Logout successfully.')
  }

  return (
    <div className='sm-container'>
      <div className='sm-item sm-languages'>
        <MdLanguage className='sm-icon' />
        <span className='sm-title'>{lang === 'vi' ? 'Ngôn ngữ' : 'Language'}</span>
        <MdArrowForwardIos className='ar-icon' />
        <div className='sm-sub-items sm-lang-items'>
          <div className='sm-sub-item sm-lang-vi' onClick={onChangeViLang}>
            <span className='sm-title'>{lang === 'vi' ? 'Tiếng Việt' : 'Vietnamese'}</span>
          </div>
          <div className='sm-sub-item sm-lang-en' onClick={onChangeEnLang}>
            <span className='sm-title'>{lang === 'vi' ? 'Tiếng Anh' : 'English'}</span>
          </div>
        </div>
      </div>
      <div className='sm-item sm-support' onClick={onClickSupport}>
        <BiSupport className='sm-icon' />
        <span className='sm-title'>{lang === 'vi' ? 'Hỗ trợ' : 'Support'}</span>
      </div>
      <div className='sm-item sm-themes'>
        {theme === 'light' ? <MdWbSunny className='sm-icon' /> : <BsFillMoonStarsFill className='sm-icon' />}
        <span className='sm-title'>{lang === 'vi' ? 'Chủ đề' : 'Theme'}</span>
        <MdArrowForwardIos className='ar-icon' />
        <div className='sm-sub-items sm-theme-items'>
          <div className='sm-sub-item sm-theme-light' onClick={onChangeLightTheme}>
            <span className='sm-title'>{lang === 'vi' ? 'Nền sáng' : 'Light mode'}</span>
          </div>
          <div className='sm-sub-item sm-theme-dark' onClick={onChangeDarkTheme}>
            <span className='sm-title'>{lang === 'vi' ? 'Nền tối' : 'Dark mode'}</span>
          </div>
        </div>
      </div>
      {user && (
        <div className='sm-item sm-logout' onClick={onLogout}>
          <AiOutlineLogout className='sm-icon' />
          <span className='sm-title'>{lang === 'vi' ? 'Đăng xuất' : 'Logout'}</span>
        </div>
      )}
    </div>
  )
}

export default SettingsModal
