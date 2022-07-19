import React from 'react'
import { Link } from 'react-router-dom'
import './CommonArtist.scss'

import { createArtistUrl } from 'share/utilities'

const CommonArtist = ({ artists }) => {
  if (!artists) return null

  return (
    <React.Fragment>
      {artists && (
        <div className='common-artists-container color-0-5'>
          {artists.map((artist, index) => {
            const { artistId, name, shortLink } = artist

            return (
              <React.Fragment key={artistId}>
                <Link to={`/${createArtistUrl(name, shortLink, artistId)}`} className='common-artists-name'>
                  <span>{name}</span>
                </Link>
                {index + 1 === artists.length ? '' : ', '}
              </React.Fragment>
            )
          })}
        </div>
      )}
    </React.Fragment>
  )
}

export default CommonArtist
