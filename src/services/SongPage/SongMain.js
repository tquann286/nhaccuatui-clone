import { getGenre } from 'api'

export const songMainCate = [
  { title: { vi: 'Mới & Hot', en: 'New & Hot' }, value: 'newHot' },
  { title: { vi: 'Việt Nam', en: 'Vietnam' }, value: 'vietnam' },
  { title: { vi: 'Âu Mỹ', en: 'US-UK' }, value: 'usuk' },
  { title: { vi: 'Châu Á', en: 'Asia' }, value: 'asia' },
  { title: { vi: 'Khác', en: 'Others' }, value: 'others' },
]

export const getExplore = async (type, key, pageIndex = 1, order = 1, pageSize = 36) => {
  try {
    const data = await getGenre(type, key, pageIndex, order, pageSize)

    if (data) return data
  } catch (error) {
    throw new Error(error)
  }
}