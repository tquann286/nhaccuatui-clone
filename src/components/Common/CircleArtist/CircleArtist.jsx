import { Link } from 'react-router-dom'
import { createArtistUrl } from 'share/utilities'
import noArtistImg from 'images/default/default_artist.png'
import './CircleArtist.scss'

const CircleArtist = ({ name, shortLink, imageUrl }) => {
  const handleErrorImg = ({ currentTarget }) => {
    currentTarget.onerror = null
    currentTarget.src = noArtistImg
  }

  return (
    <Link to={createArtistUrl(name, shortLink)}>
      <div className='circle-artist-container'>
        <img className='border-0-1' src={imageUrl} alt={name} title={name} onError={handleErrorImg} />
        <p className='color-0-88'>{name}</p>
      </div>
    </Link>
  )
}

export default CircleArtist
