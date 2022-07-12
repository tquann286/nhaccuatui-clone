import React, { useState, useEffect } from 'react'
import './RightSidebar.scss'

import { useStore, actions } from 'store'

import { getPlayingSong } from 'services/RightSidebar'

const RightSidebar = () => {
  const [state, dispatch] = useStore()
  const { lang, lastPlayedSongId } = state
	const [playingSong, setPlayingSong] = useState(null)

  useEffect(() => {
		if (lastPlayedSongId) {
			getPlayingSong(lastPlayedSongId).then(res => {
				setPlayingSong(res)
			})
		}
	}, [])
	console.log(lastPlayedSongId)

  return (
		<div className='rb-container'>
		
		</div>
	)
}

export default RightSidebar
