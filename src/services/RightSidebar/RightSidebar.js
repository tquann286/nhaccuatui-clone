import { getSong } from 'nhaccuatui-api-full'

export const getPlayingSong = async (songId) => {
  try {
    const songDetail = await getSong()
    if (songDetail) return songDetail
  } catch (error) {
    console.log(error)
  }
}
