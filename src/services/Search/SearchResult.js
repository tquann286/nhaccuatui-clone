import { searchByKeyword } from 'nhaccuatui-api-full/dist'

export const getSearchResult = async (query) => {
  try {
    const data = await searchByKeyword(query)

    if (data) return data
  } catch (error) {
    throw new Error(error)
  }
}

export const searchResultNavbar = [
  { title: {vi: 'Tất cả', en: 'All'}, value: 'all' },
  { title: {vi: 'Bài hát', en: 'Song'}, value: 'song' },
  { title: {vi: 'Danh sách phát', en: 'Playlist'}, value: 'playlist' },
  { title: {vi: 'Video', en: 'Video'}, value: 'video' },
]

export const topResultSwiperProps = {
  slidesPerView: 1,
  centeredSlides: true
}