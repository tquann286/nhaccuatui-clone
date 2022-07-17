import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Title = ({ title }) => {
  const { pathname } = useLocation()
	
	useEffect(() => {
		document.title = title
	}, [title, pathname])
	return <React.Fragment></React.Fragment>
}

export default Title