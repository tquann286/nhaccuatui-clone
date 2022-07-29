import { getArtists } from 'api'

export const getArtistsMain = async (nation, gender) => {
  try {
    const data = await getArtists(nation, gender)

    if (data) return data.artist
  } catch (error) {
    throw new Error(error)
  }
} 