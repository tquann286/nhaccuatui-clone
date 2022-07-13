import { getChart } from 'nhaccuatui-api-full/dist'

export const getTrendingSong = async () => {
  try {
    const { ranking } = await getChart({ category: 'nhac-viet', type: 'song', size: 1 })
    if (ranking) return ranking.song[0]
  } catch (error) {
    console.log(error)
  }
}
