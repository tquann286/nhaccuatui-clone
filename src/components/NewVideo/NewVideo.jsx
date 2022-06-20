import { Link } from 'react-router-dom'
import './NewVideo.scss'

import VideoDetail from './VideoDetail'

const NewVideo = ({ videos }) => {

  return (
    <div className="nv-container">
      <div className="nv-title">
        <Link to='/'>Video hot</Link>
      </div>
      <div className="nv-main">
        <div className="nr-large-videos">
          {videos.slice(0, 2).map(video => (
            <VideoDetail { ... video } keyId={video.key} height={210} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewVideo