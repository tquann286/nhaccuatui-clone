import React, { useState, useRef } from 'react'
import './LeftSidebar.scss'
import { Link } from 'react-router-dom'

import { PopupModal } from 'components'
import SettingsModal from './SettingsModal'

import nctLogo from 'images/nct-logo.png'

import { Scrollbars } from 'react-custom-scrollbars'
import { scrollBarStyles } from 'services/LeftSidebar'

import { useStore, actions } from 'store'

import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs'
import { AiOutlineSetting } from 'react-icons/ai'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

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
      <Scrollbars {...scrollBarStyles}>
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
        <div className='ls-main'>
          <div className='ls-navbar'>
            <ul className='nav-menu'>
              <li>
                <Link to='/tim-kiem'>
                  <div className='nav-item nav-search'>
                    <div className='nav-active-item'></div>
                    <div className='nav-content'>
                      <i class='uil uil-search search'></i>
                      <p className='nav-name'>{lang === 'vi' ? 'Tìm kiếm' : 'Search'}</p>
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <div className='nav-item nav-home'>
                    <div className='nav-active-item'></div>
                    <div className='nav-content'>
                      <i class='uil uil-estate home'></i>
                      <p className='nav-name'>{lang === 'vi' ? 'Trang chủ' : 'Home'}</p>
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <div className='nav-item nav-discovery'>
                  <div className='nav-active-item'></div>
                  <div className='nav-content'>
                    <i class='uil uil-compass discovery'></i>
                    <p className='nav-name'>{lang === 'vi' ? 'Khám phá' : 'Discovery'}</p>
                    <MdOutlineKeyboardArrowDown />
                  </div>
                </div>
              </li>
              <li>
                <div className='nav-item nav-today-selection'>
                  <div className='nav-active-item'></div>
                  <div className='nav-content'>
                    <i class='uil uil-headphones today-selection'></i>
                    <p className='nav-name'>{lang === 'vi' ? 'Nghe gì hôm nay' : 'Today selection'}</p>
                    <MdOutlineKeyboardArrowDown />
                  </div>
                </div>
              </li>
              <li>
                <Link to='/bang-xep-hang/top-20&k=nhac-viet'>
                  <div className='nav-item nav-chart'>
                    <div className='nav-active-item'></div>
                    <div className='nav-content'>
                      <i class='uil uil-chart-bar chart'></i>
                      <p className='nav-name'>{lang === 'vi' ? 'BXH NCT' : 'NCT chart'}</p>
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link to='/kham-pha'>
                  <div className='nav-item nav-music-4u'>
                    <div className='nav-active-item'></div>
                    <div className='nav-content'>
                      <i class='uil uil-music music-4u'></i>
                      <p className='nav-name'>Music 4U</p>
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Scrollbars>
    </div>
  )
}

export default LeftSidebar
