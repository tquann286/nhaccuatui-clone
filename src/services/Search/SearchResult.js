import { searchByKeyword } from 'nhaccuatui-api-full/dist'

export const getSearchResult = async (query) => {
  try {
    const data = await searchByKeyword(query)

    if (data) return data
  } catch (error) {
    throw new Error(error)
  }
}