import React from 'react'
import './LeftSidebar.scss'
import { Link } from 'react-router-dom'

import nctLogo from 'images/nct-logo.png'

import { useStore, actions } from 'store'
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs'
import { AiOutlineSetting } from 'react-icons/ai'

const LeftSidebar = () => {
  const [state, dispatch] = useStore()
  const { theme } = state

  const handleChangeTheme = () => {
    if (theme === 'light') {
      dispatch(actions.changeDarkTheme())
      localStorage.setItem('theme', 'dark')
    } else if (theme === 'dark') {
      dispatch(actions.changeLightTheme())
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <div className='left-sidebar'>
      <div className='ls-logo-theme'>
        <Link className='ls-logo' to='/'>
          <img src={nctLogo} alt='NCT' />
        </Link>
        <div className='theme-container'>
          <div className='box' onClick={handleChangeTheme}>
            <div className='ball' style={theme === 'dark' ? { transform: 'translateX(100%)' } : {}}></div>
            <div className='scenary'>
              <div className='moon'>
                <BsMoonStarsFill />
              </div>
              <div className='sun'>
                <BsSunFill />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ls-auth-setting">
        <div className="ls-auth">
          <div className="ls-auth-main">
            <p>Đăng nhập</p>
          </div>
        </div>
        <div className="ls-setting">
          <div className="ls-setting-icon">
            <AiOutlineSetting />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftSidebar
