import { getChart, getSong } from 'nhaccuatui-api-full'

export const getPlayingSong = async (songId) => {
  try {
    const songDetail = await getSong()

    return songDetail
  } catch (error) {
    console.log(error)
  }
}

export const getTrendingSong = async () => {
  try {
    const { ranking } = await getChart({ category: 'nhac-viet' })

    return ranking[0]
  } catch (error) {
    console.log(error)
  }
}
