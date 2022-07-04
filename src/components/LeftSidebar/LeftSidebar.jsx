import React, { useState, useRef } from 'react'
import './LeftSidebar.scss'
import { Link } from 'react-router-dom'

import { PopupModal } from 'components'
import SettingsModal from './SettingsModal'

import nctLogo from 'images/nct-logo.png'

import { useStore, actions } from 'store'
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs'
import { AiOutlineSetting } from 'react-icons/ai'
import { useGetPosition } from 'hooks'

const LeftSidebar = () => {
  const [state, dispatch] = useStore()
  const { theme, lang } = state

  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [settingsModalPosition, setSettingsModalPosition] = useState({
    top: 0,
    left: 0,
  })

  const settingsBtnRef = useRef(null)

  const handleChangeTheme = () => {
    if (theme === 'light') {
      dispatch(actions.changeDarkTheme())
    } else if (theme === 'dark') {
      dispatch(actions.changeLightTheme())
    }
  }

  const toggleShowSettings = () => {
    setShowSettingsModal(!showSettingsModal)
  }

  useGetPosition(settingsBtnRef, (right, top) =>
    setSettingsModalPosition({
      top: top,
      left: right,
    })
  )

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
      <div className='ls-auth-setting'>
        <div className='ls-auth'>
          <div className='ls-auth-main'>
            <p>{lang === 'vi' ? 'Đăng nhập' : 'Sign in'}</p>
          </div>
        </div>
        <div className='ls-setting'>
          <div className='ls-setting-icon' ref={settingsBtnRef} onClick={toggleShowSettings}>
            <AiOutlineSetting style={showSettingsModal && { transform: 'rotate(60deg)' }} />
          </div>
          <PopupModal showModal={showSettingsModal} modalPosition={settingsModalPosition} toggleModal={toggleShowSettings}>
            <SettingsModal theme={theme} lang={lang} dispatch={dispatch} />
          </PopupModal>
        </div>
      </div>
    </div>
  )
}

export default LeftSidebar
