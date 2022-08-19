import { getSongDetail } from 'api'

export const getSongDetailData = async (key) => {
  try {
    const data = await getSongDetail(key)

    return data
  } catch (error) {
    console.log(error)
  }
}