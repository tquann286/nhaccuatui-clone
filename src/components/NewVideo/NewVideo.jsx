import { Link } from 'react-router-dom'
import './NewVideo.scss'

import VideoDetail from './VideoDetail'

const NewVideo = ({ videos }) => {

  return (
    <div className="nv-container">
      <div className="nv-title">
        <Link to='video-hot'>Video hot</Link>
      </div>
      <div className="nv-main">
        <div className="nv-large-videos">
          {videos.slice(0, 2).map(video => (
            <VideoDetail { ... video } keyId={video.key} height={210} />
          ))}
        </div>
        <div className="nv-small-videos">
        {videos.slice(2, 6).map(video => (
          <VideoDetail { ... video } keyId={video.key} height={120} />
        ))}
        </div>
      </div>
    </div>
  )
}

export default NewVideo