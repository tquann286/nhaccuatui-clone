import { explore } from 'nhaccuatui-api-full/dist'

export const getMaybeHit = async () => {
  try {
    const data = await explore({
      type: 'song',
      key: 'moi-hot',
      page: 1,
      pageSize: 1,
    })

    console.log(data)
  } catch (error) {
    throw new Error(error)
  }
}
