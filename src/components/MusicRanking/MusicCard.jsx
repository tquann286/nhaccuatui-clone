import React from 'react'

const MusicCard = ({ index, keyId, region, song, bgImage }) => {
  
	return (
		<div className='mr-card-container'>
			<div className='mr-card-bg-img'>
        <img src={bgImage} alt={region} />
      </div>
		</div>
	)
}

export default MusicCard
