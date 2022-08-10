import React from 'react'

import { createArtistUrl } from 'share/utilities'
import { Link } from 'react-router-dom'
import no_artist_img from 'images/default/default_artist.png'
import { Image } from 'components'

const ArtistCircle = ({ artists }) => {
  if (!artists) return null

  return (
    <React.Fragment>
      {artists.map((artist, i) => {
        const { name, shortLink, imageUrl } = artist
        const imageProps = {
          imageUrl,
          backupImg: no_artist_img,
        }

        return (
          <Link to={createArtistUrl(name, shortLink)} className={`relative w-24px h-24px useBorder border-slate-50 rounded-circle z-[${artists.length - i}] ${i !== 0 ? '-ml-8px' : ''}`}>
            <Image {...imageProps} className='rounded-circle' />
          </Link>
        )
      })}
    </React.Fragment>
  )
}

export default ArtistCircle
