import { getSong } from 'nhaccuatui-api-full'

export const getPlayingSong = async (songId) => {
  const songDetail = await getSong()

  return songDetail
} 
