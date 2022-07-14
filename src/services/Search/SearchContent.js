import { getTrendingArtists, getTopKeyword } from 'nhaccuatui-api-full/dist'

export const getTopArtists = async () => {
  try {
    const data = await getTrendingArtists()

    if (data) return data.artistTrending
  } catch (error) {
    console.log(error)
  }
}

export const getTrendingKeyword = async () => {
  try {
    const data = await getTopKeyword()

    if (data) return data
  } catch (error) {
    console.log(error)
  }
}