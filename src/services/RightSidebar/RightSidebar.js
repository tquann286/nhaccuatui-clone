import { getInfo } from 'api'

export const getPlayingSong = async (songId) => {
  try {
    const songDetail = await getInfo(songId, 'song')
    
    if (songDetail) return songDetail
  } catch (error) {
    console.log(error)
  }
}
