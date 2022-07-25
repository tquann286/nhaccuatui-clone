import { getSearchByKeywords, getSearchSong } from 'api'

export const getSearchResult = async (query) => {
  try {
    const data = await getSearchByKeywords(query)

    if (data) return data
  } catch (error) {
    throw new Error(error)
  }
}

export const searchResultNavbar = [
  { title: { vi: 'Tất cả', en: 'All' }, value: 'all' },
  { title: { vi: 'Bài hát', en: 'Song' }, value: 'song' },
  { title: { vi: 'Danh sách phát', en: 'Playlist' }, value: 'playlist' },
  { title: { vi: 'Video', en: 'Video' }, value: 'video' },
]

export const topResultSwiperProps = {
  slidesPerView: 1,
  speed: 300,
}

export const getSongResult = async (query, pageIndex = 1) => {
  try {
    const data = await getSearchSong(query, pageIndex)

    if (data) return data.song
  } catch (error) {
    throw new Error(error)
  }
}