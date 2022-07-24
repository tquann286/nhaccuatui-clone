import { CommonArtist } from 'components'
import { BsHeadphones } from 'react-icons/bs'
import { formatNumber } from 'share'

const SongItem = ({ keyId, songId, key, title, artists, duration, songsView }) => {
  return (
    <li key={keyId || songId || key} className='song-list-common bg-color-0-02 li-list-item-common color-0-6 hover-bg-color-0-05'>
      <div className='song-list-title-artist'>
        <div className='song-list-title song-list-title-real'>{title}</div>
        <div className='song-list-title song-list-artist-real'>
          <CommonArtist artists={artists} />
        </div>
      </div>
      <div className='song-list-title listen-title-real'>
        <div className='view-count'>
          <BsHeadphones />
          <span className='view-count-content color-0-5'>{formatNumber(songsView[keyId || songId || key])}</span>
        </div>
      </div>
      <div className='song-list-title duration-title-real'>{duration}</div>
    </li>
  )
}

export default SongItem