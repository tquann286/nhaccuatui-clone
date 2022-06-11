import React from 'react'

import './Homepage.scss'
import { MainHomepage, LeftSidebar, RightSidebar } from 'components'

const Homepage = () => {
	return (
		<div className='hp-container'>
			<LeftSidebar />
			<MainHomepage />
			<RightSidebar />
		</div>
	)
}

export default Homepage
