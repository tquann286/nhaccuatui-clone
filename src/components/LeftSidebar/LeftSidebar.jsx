import React from 'react'
import './LeftSidebar.scss'
import { Link } from 'react-router-dom';
import nctLogo from 'images/nct-logo.png'

const LeftSidebar = () => {
	return (
		<div className='left-sidebar'>
			<div className="ls-logo-theme">
				<Link className='ls-logo' to='/'><img src={nctLogo} alt="NCT" /></Link>
			</div>
		</div>
	)
}

export default LeftSidebar
