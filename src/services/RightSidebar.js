import { explore, getChart, getSong } from 'nhaccuatui-api-full'

export const getPlayingSong = async (songId) => {
  try {
    const songDetail = await getSong()
    if (songDetail) return songDetail
  } catch (error) {
    console.log(error)
  }
}

export const getTrendingSong = async () => {
  try {
    const { ranking } = await getChart({ category: 'nhac-viet', type: 'song', size: 1 })
    if (ranking) return ranking.song[0]
    explore({
      type: "song",
      key: "moi-hot",
      page: 1,
      pageSize: 36,
    }).then(res => console.log(res))
  } catch (error) {
    console.log(error)
  }
}
