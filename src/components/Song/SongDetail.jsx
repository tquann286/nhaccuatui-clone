import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { BsHeadphones } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'

import { createSongUrl, createArtistUrl } from 'share/utilities'
import { createRandomSongView } from 'services/SongDetail'

const SongDetail = ({ artists, songId, thumbnail, title }) => {
  const songView = createRandomSongView()
  

	return (
		<div className='sd-container'>
			<div className='sd-main'>
        <Link to={createSongUrl(title, songId)} className="sd-thumbnail" title={title}>
          <div className='sd-thumb-img' style={{ backgroundImage: `url(${thumbnail})` }}></div>
        </Link>
        <div className="sd-more">
          <div className="sd-view-count">
            <BsHeadphones />
            <div className="sc-view-number">{songView}</div>
          </div>
          <div className="sd-more-options">
            <div className="sd-three-dots">
              <IoMdMore />
            </div>
          </div>
        </div>
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
