import { CommonPlaylist } from 'components'
import { Grid } from '@mui/material'

const PlaylistInfo = ({ playlists, defineLang }) => (
  <div className='playlist-info-container common-section'>
    <div className='pi-title pt0-lr3-2 common-title color-0-88'>{defineLang('Danh sách phát', 'Playlist')}</div>
    <div className='pi-main common-main'>
      <Grid className='list-playlists' container spacing={2}>
        {playlists.map((playlist) => (
          <Grid key={playlist.key} item xs={3} sm={3} md={3} xl={2}>
            <CommonPlaylist {...playlist} keyId={playlist.key} />
          </Grid>
        ))}
      </Grid>
    </div>
  </div>
)

export default PlaylistInfo
