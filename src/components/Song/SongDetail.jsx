import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { createSongUrl, createArtistUrl } from 'share/utilities'

const SongDetail = ({ artists, songId, thumbnail, title }) => {

  
	return (
		<div className='sd-container'>
			<div className='sd-main'>
        <Link to={createSongUrl(title, songId)} className="sd-thumbnail" title={title}>
          <div className='sd-thumb-img' style={{ backgroundImage: `url(${thumbnail})` }}></div>
        </Link>
        <div className="sd-song-details">
          <div className="sd-song-title">
            <Link to={createSongUrl(title, songId)}>{title}</Link>
          </div>
          <div className="sd-artists">
          {artists.map((artist, i) => {
						const { artistId, name, shortLink } = artist

						return (
							<React.Fragment key={artistId}>
								<Link to={createArtistUrl(name, shortLink, artistId)}><span>{name}</span></Link>
								{i + 1 === artists.length ? '' : ', '}
							</React.Fragment>
						)
					})}
          </div>
        </div>
      </div>
		</div>
	)
}

export default SongDetail
