import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'

import { useStore } from 'store'
import { CircleTitleArtist, Description, ListTag, LoadingV2, ShadowThumb, Title, TitleCommon } from 'components'
import { getMaybeLike } from 'share/utilities'
import { getPlaylistDetailData } from 'services/Playlist/Playlist'

const PlaylistDetail = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  const params = useParams()
  const query = new URLSearchParams(params.playlistId)

  const [playlistDetail, setPlaylistDetail] = useState({})
  console.log(playlistDetail)
  const [maybeLike, setMaybeLike] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

useEffect(() => {
    try {
      setIsLoading(true)
      const getPlaylistDetailState = async () => {
        const playlistDetail = await getPlaylistDetailData(query.get('k'))
        const maybeLike = await getMaybeLike(playlistDetail.key, 'playlist')

        setPlaylistDetail(playlistDetail)
        setMaybeLike(maybeLike)
        setIsLoading(false)
      }

      getPlaylistDetailState()
    } catch (error) {
      setIsLoading(false)
      throw new Error(error)
    }
  }, [params.playlistKey])

  if (isLoading)
    return (
      <div className='commonMainOutlet flexCenter h-full'>
        <LoadingV2 />
      </div>
    )

  const { thumbnail, artists = [], title, dateCreate, description = '', listTag = [] } = playlistDetail

  return (
    <div className='commonMainOutlet pt-24px px-32px relative'>
    {artists.length !== 0 && <Title title={`${title} - ${artists.map((art) => art.name).join(', ')} - NhacCuaTui Clone`} />}
      <div className="w3-row">
        <div className="w3-col w-240px">
          <ShadowThumb imageUrl={thumbnail} width='24rem' />
        </div>
        <div className="w3-rest pl-24px">
          <TitleCommon type='playlist' defineLang={defineLang} title={title} />
          <CircleTitleArtist circleStyles='float-left' titleStyles='!mt-unset ml-8px' artists={artists} />
          <div className="w3-row mt-4">
            <div className="w3-rest text-13px color-0-5 w-fit">{new Date(dateCreate).toLocaleDateString()}</div>
          </div>
          <div className="mt-8px text-sm color-0-5">
            {parse(description)}
          </div>
          <ListTag listTag={listTag} defineLang={defineLang} />
        </div>
      </div>
    </div>
  )
}

export default PlaylistDetail