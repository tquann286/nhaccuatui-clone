import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Title = ({ title }) => {
  let location = useLocation()
	useEffect(() => {
		document.title = title
	}, [title, location])
	return <React.Fragment></React.Fragment>
}

export default Title