import { getArtists, getArtistDetail } from 'api'

export const getArtistsMain = async (nation, gender) => {
  try {
    const data = await getArtists(nation, gender)

    if (data) return data.artist
  } catch (error) {
    console.log(error)
  }
}

export const getArtistDetailData = async (shortLink) => {
  try {
    const data = await getArtistDetail(shortLink)

    if (data) return data
  } catch (error) {
    console.log(error)
  }
}