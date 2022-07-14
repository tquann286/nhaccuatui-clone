import { getTrendingArtists } from 'nhaccuatui-api-full/dist'

export const getTopArtists = async () => {
  try {
    const data = await getTrendingArtists()

    if (data) return data.artistTrending
  } catch (error) {
    console.log(error)
  }
}