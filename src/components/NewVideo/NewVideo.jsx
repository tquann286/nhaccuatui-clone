import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './NewVideo.scss'

import { cloneDeep } from 'lodash'

const NewVideo = ({ videos }) => {
  const [newVideo, setNewVideo] = useState([])
  console.log(newVideo)

  useEffect(() => {
    const cloneVideos = cloneDeep(videos)

    setNewVideo(cloneVideos.slice(0,6))
  }, [])

  return (
    <div className="nv-container">
      <div className="nv-title">
        <Link to='/'>Video hot</Link>
      </div>
    </div>
  )
}

export default NewVideo