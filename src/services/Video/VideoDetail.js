import { getVideoDetail } from 'api'

export const getVideoDetailData = async (key) => {
  try {
    const data = await getVideoDetail(key)

    return data.video
  } catch (error) {
    console.log(error)
  }
}
