import { BsPlayCircleFill } from 'react-icons/bs'

const VideoDetail = ({ keyId, artists, duration, thumbnail, title, height }) => {


  return (
    <div className='vd-container'>
      <div className="vd-video" title={title} style={{ height }}>
        <img className='vd-img' src={thumbnail} alt={title} />
        <div className="vd-duration">{duration}</div>
        <div className="vd-blur-layer">
          <div className="vd-play-icon">
            <BsPlayCircleFill />
          </div>
          <div className="vd-more-options">
          
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoDetail