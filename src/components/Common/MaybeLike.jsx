import React from 'react'
import Grid from '@mui/material/Grid'
import SongSquare from './SongSquare/SongSquare'
import CommonPlaylist from './CommonPlaylist/CommonPlaylist'

const MaybeLike = ({ maybeLike, defineLang, titleStyles = '' }) =>
  maybeLike && (
    <React.Fragment>
      <div className={`mt-16 text-xl color-0-88 font-bold capitalize ${titleStyles}`}>{defineLang('Có thể bạn cũng thích', 'You May Also Like')}</div>
      <div className='mt-16px'>
        <Grid container spacing={2}>
          {maybeLike.type === 'song' && (
            <React.Fragment>
              {maybeLike.data.map((song) => (
                <Grid item key={song.key} xs={3} sm={3} md={3} xl={2}>
                  <SongSquare {...song} keyId={song.key} />
                </Grid>
              ))}
            </React.Fragment>
          )}
          {maybeLike.type === 'playlist' && (
            <React.Fragment>
              {maybeLike.data.map((playlist) => (
                <Grid item key={playlist.key} xs={3} sm={3} md={3} xl={2}>
                  <CommonPlaylist {...playlist} keyId={playlist.key} />
                </Grid>
              ))}
            </React.Fragment>
          )}
        </Grid>
      </div>
    </React.Fragment>
  )

export default MaybeLike
