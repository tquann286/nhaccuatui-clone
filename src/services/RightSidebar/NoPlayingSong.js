import { getMaybeHit } from 'api'

export const getTrendingSong = async () => {
  try {
    const data = await getMaybeHit()
    if (data && data.status === 'success') return data.song
  } catch (error) {
    throw new Error(error)
  }
}
