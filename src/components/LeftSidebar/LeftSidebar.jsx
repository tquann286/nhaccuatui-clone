import React, { useState, useRef } from 'react'
import './LeftSidebar.scss'
import { Link, NavLink } from 'react-router-dom'

import { PopupModal, AuthForm } from 'components'
import SettingsModal from './SettingsModal'

import nctLogo from 'images/nct-logo-v2.png'

import { Scrollbars } from 'react-custom-scrollbars'
import { scrollBarStyles } from 'services/LeftSidebar'

import { overlayAuthStyles } from 'services/PopupModal'

import { useStore, actions } from 'store'

import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs'
import { AiOutlineSetting } from 'react-icons/ai'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

import { useGetFixedPosition } from 'hooks'

import { auth } from 'config/firebase'
import { createTop20Url } from 'share/utilities'

const LeftSidebar = () => {
  const [state, dispatch] = useStore()
  const { theme, lang, showLogin, showSignUp } = state

  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [settingsModalPosition, setSettingsModalPosition] = useState({
    top: 0,
    left: 0,
  })

  const [showDiscoveryMenu, setShowDiscoveryMenu] = useState(false)
  const [showTodaySelection, setShowTodaySelection] = useState(false)

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

  const toggleDiscoveryMenu = () => {
    setShowDiscoveryMenu(!showDiscoveryMenu)
  }

  const toggleTodaySelection = () => {
    setShowTodaySelection(!showTodaySelection)
  }

  const toggleShowLogin = () => {
    dispatch(actions.toggleShowLogin())
  }

  const toggleShowSignUp = () => {
    dispatch(actions.toggleShowSignUp())
  }

  useGetFixedPosition(
    settingsBtnRef,
    (right, top) =>
      setSettingsModalPosition({
        top: top,
        left: right,
      }),
    showSettingsModal
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
        <div className='ls-auth-setting color-0-88'>
          <div className='ls-auth'>
            {auth.currentUser ? (
              <React.Fragment>
                <div className='ls-user-thumb'>
                  <Link to='user'>
                    <img src={auth.currentUser.photoURL} />
                  </Link>
                </div>
                <div className='ls-user-name'>
                  <Link to='user'>
                    <div className='ls-user-name-content color-0-88' title={auth.currentUser.displayName}>
                      {auth.currentUser.displayName}
                    </div>
                  </Link>
                </div>
              </React.Fragment>
            ) : (
              <div className='ls-auth-main'>
                <p>
                  <span onClick={toggleShowLogin}>{lang === 'vi' ? 'Đăng nhập' : 'Sign in'}</span>
                  {' | '}
                  <span onClick={toggleShowSignUp}>{lang === 'vi' ? 'Đăng ký' : 'Sign up'}</span>
                </p>
                <PopupModal showModal={showLogin || showSignUp} toggleModal={(showLogin && toggleShowLogin) || (showSignUp && toggleShowSignUp)} overlayStyles={overlayAuthStyles}>
                  {(showLogin || showSignUp) && <AuthForm />}
                </PopupModal>
              </div>
            )}
          </div>
          <div className='ls-setting'>
            <div className='ls-setting-icon' ref={settingsBtnRef} onClick={toggleShowSettings}>
              <AiOutlineSetting style={showSettingsModal && { transform: 'rotate(60deg)' }} />
            </div>
            <PopupModal showModal={showSettingsModal} modalPosition={settingsModalPosition} toggleModal={toggleShowSettings}>
              <SettingsModal user={auth.currentUser} theme={theme} lang={lang} dispatch={dispatch} />
            </PopupModal>
          </div>
        </div>
        <div className='ls-main'>
          <div className='ls-navbar'>
            <ul className='nav-menu'>
              <li>
                <NavLink to='/tim-kiem'>
                  <div className='nav-item bg-color-0-05 nav-search'>
                    <div className='nav-active-item'></div>
                    <div className='nav-content color-0-5'>
                      <i className='fa-solid fa-magnifying-glass search'></i>
                      <p className='nav-name color-0-88'>{lang === 'vi' ? 'Tìm kiếm' : 'Search'}</p>
                    </div>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to='/'>
                  <div className='nav-item bg-color-0-05 nav-home'>
                    <div className='nav-active-item'></div>
                    <div className='nav-content color-0-5'>
                      <i className='fa-solid fa-house home'></i>
                      <p className='nav-name color-0-88'>{lang === 'vi' ? 'Trang chủ' : 'Home'}</p>
                    </div>
                  </div>
                </NavLink>
              </li>
              <li>
                <div className='nav-item bg-color-0-05 nav-discovery' onClick={toggleDiscoveryMenu}>
                  <div className='nav-active-item'></div>
                  <div className='nav-content color-0-5'>
                    <i className='fa-solid fa-compass discovery'></i>
                    <p className='nav-name color-0-88'>{lang === 'vi' ? 'Khám phá' : 'Discovery'}</p>
                    <MdOutlineKeyboardArrowDown className={`${showDiscoveryMenu && 'show-detail'}`} />
                  </div>
                </div>
                <div className={`${showDiscoveryMenu && 'show-detail'} nav-item-detail discovery-detail`}>
                  <NavLink to='/bai-hat'>
                    <div className='nav-item-detail-main'>
                      <div className='nav-item-detail-main-hover'></div>
                      <span className='color-0-5'>{lang === 'vi' ? 'bài hát' : 'song'}</span>
                    </div>
                  </NavLink>
                  <NavLink to='/playlist'>
                    <div className='nav-item-detail-main'>
                      <div className='nav-item-detail-main-hover'></div>
                      <span className='color-0-5'>playlist</span>
                    </div>
                  </NavLink>
                  <NavLink to='/video'>
                    <div className='nav-item-detail-main'>
                      <div className='nav-item-detail-main-hover'></div>
                      <span className='color-0-5'>video</span>
                    </div>
                  </NavLink>
                  <NavLink to='/nghe-si'>
                    <div className='nav-item-detail-main'>
                      <div className='nav-item-detail-main-hover'></div>
                      <span className='color-0-5'>{lang === 'vi' ? 'nghệ sỹ' : 'artist'}</span>
                    </div>
                  </NavLink>
                </div>
              </li>
              <li>
                <div className='nav-item bg-color-0-05 nav-today-selection' onClick={toggleTodaySelection}>
                  <div className='nav-active-item'></div>
                  <div className='nav-content color-0-5'>
                    <i className='fa-solid fa-headphones-simple today-selection'></i>
                    <p className='nav-name color-0-88'>{lang === 'vi' ? 'Nghe gì hôm nay' : 'Today selection'}</p>
                    <MdOutlineKeyboardArrowDown className={`${showTodaySelection && 'show-detail'}`} />
                  </div>
                </div>
                <div className={`${showTodaySelection && 'show-detail'} nav-item-detail today-selection-detail`}>
                  <NavLink to='/chu-de'>
                    <div className='nav-item-detail-main'>
                      <div className='nav-item-detail-main-hover'></div>
                      <span className='color-0-5'>{lang === 'vi' ? 'chủ đề' : 'topic'}</span>
                    </div>
                  </NavLink>
                  <NavLink to='/playlist'>
                    <div className='nav-item-detail-main'>
                      <div className='nav-item-detail-main-hover'></div>
                      <span className='color-0-5'>{lang === 'vi' ? 'tuyển tập' : 'collection'}</span>
                    </div>
                  </NavLink>
                  <NavLink to='/top-100'>
                    <div className='nav-item-detail-main'>
                      <div className='nav-item-detail-main-hover'></div>
                      <span className='color-0-5'>top 100</span>
                    </div>
                  </NavLink>
                </div>
              </li>
              <li>
                <NavLink to={createTop20Url('nhac-viet')}>
                  <div className='nav-item bg-color-0-05 nav-chart'>
                    <div className='nav-active-item'></div>
                    <div className='nav-content color-0-5'>
                      <i className='fa-solid fa-chart-simple chart'></i>
                      <p className='nav-name color-0-88'>{lang === 'vi' ? 'BXH NCT' : 'NCT chart'}</p>
                    </div>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to='/kham-pha'>
                  <div className='nav-item bg-color-0-05 nav-music-4u'>
                    <div className='nav-active-item'></div>
                    <div className='nav-content color-0-5'>
                      <i className='fa-regular fa-hand-point-up music-4u'></i>
                      <p className='nav-name color-0-88'>Music 4U</p>
                    </div>
                  </div>
                </NavLink>
              </li>
            </ul>
            {auth.currentUser && (
              <React.Fragment>
                <div className='ls-library color-0-88'>{lang === 'vi' ? 'Thư viện' : 'Library'}</div>
                <ul className='nav-menu'>
                  <li>
                    <NavLink to='user/yeu-thich'>
                      <div className='nav-item bg-color-0-05 nav-favorite'>
                        <div className='nav-active-item'></div>
                        <div className='nav-content color-0-5'>
                          <p className='nav-name color-0-88'>NhacCuaTui</p>
                        </div>
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='user/history'>
                      <div className='nav-item bg-color-0-05 nav-history'>
                        <div className='nav-active-item'></div>
                        <div className='nav-content color-0-5'>
                          <p className='nav-name color-0-88'>{lang === 'vi' ? 'Lịch sử' : 'History'}</p>
                        </div>
                      </div>
                    </NavLink>
                  </li>
                </ul>
              </React.Fragment>
            )}
          </div>
        </div>
      </Scrollbars>
    </div>
  )
}

export default LeftSidebar
