import { getSongDetail } from 'api'

export const getSongDetailData = async (key) => {
  try {
    const data = await getSongDetail(key)

    return data.song
  } catch (error) {
    console.log(error)
  }
}

export const getSongStreamData = async (streamUrl) => {
  try {
    const response = await fetch(`https://nhaccuatui-be.onrender.com/api/streamUrl/${encodeURIComponent(streamUrl)}`)
    const contentType = response.headers.get('Content-Type')
    const audioData = await response.arrayBuffer()

    const blob = new Blob([audioData], { type: contentType })

    const dataUrl = URL.createObjectURL(blob)

    return dataUrl
  } catch (error) {
    console.log(error)
  }
}
