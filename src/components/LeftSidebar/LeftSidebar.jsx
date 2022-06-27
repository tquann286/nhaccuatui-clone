import React from 'react'
import './LeftSidebar.scss'
import { Link } from 'react-router-dom';
import nctLogo from 'images/nct-logo.png'

import { useStore, actions } from 'store';

const LeftSidebar = () => {
	const [state, dispatch] = useStore()
	const { theme } = state
	console.log(theme)

	const handleChangeTheme = () => {
		if (theme === 'light') {
			dispatch(actions.changeDarkTheme())
		} else if (theme === 'dark') {
			dispatch(actions.changeLightTheme())
		}
	}

	return (
		<div className='left-sidebar'>
			<div className="ls-logo-theme">
				<Link className='ls-logo' to='/'><img src={nctLogo} alt="NCT" /></Link>
				<button onClick={handleChangeTheme}>Theme</button>
			</div>
		</div>
	)
}

export default LeftSidebar
