import React, { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

import { Top3Realtime, LoadingV2, Sharing, SongRanking } from 'components'
import { getRealtimeData } from 'services/Chart/Realtime'
import { getCurrentPathname, handleCopyProxy } from 'share/utilities'
import { toastNotify } from 'share/toast'

const Realtime = () => {
  const [defineLang] = useOutletContext()

  const [top3, setTop3] = useState([])
  const [top50, setTop50] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [size, setSize] = useState(10)

  useEffect(() => {
    try {
      setIsLoading(true)
      const getRealtimeState = async () => {
        const top3 = await getRealtimeData(3)
        const top50 = await getRealtimeData(50)

        setTop3(top3)
        setTop50(top50)
        setIsLoading(false)
      }

      getRealtimeState()
    } catch (error) {
      setIsLoading(false)
      throw new Error(error)
    }
  }, [])

  const top3RealtimeProps = {
    top3,
    defineLang,
    styles: 'h-[296px]',
  }

  const handleCopyShare = () => {
    handleCopyProxy(defineLang, getCurrentPathname())
  }

  const onShareWindowClose = () => {
    toastNotify(defineLang('Chia sẻ lên facebook thành công', 'Share to facebook successfully'), 'success')
  }

  if (isLoading)
    return (
      <div className='flexCenter w-full h-[calc(100vh_-_6.4rem)]'>
        <LoadingV2 />
      </div>
    )

  const sharingProps = { defineLang, placement: 'top', handleCopyShare, onShareWindowClose, shareLink: getCurrentPathname() }

  return (
    <div className='margin-footer'>
      <div className='mt-24px ml-32px mr-32px relative z-1 h-[296px] min-w-[600px] rounded-4px overflow-hidden'>
        <Top3Realtime {...top3RealtimeProps} />
      </div>
      <div className='mt-24px mx-32px h-64px rounded-4px bg-color-0-02 w3-row'>
        <div className='w3-col w-64 h-32px mt-16px ml-24px useBorder border-0-1 flexCenter text-13px font-normal rounded-16px color-0-5 hover:!border-main hoverMainColor cursor-pointer'>{defineLang('Phát tất cả', 'Play all')}</div>
        <div className='w3-col w3-right w-fit mt-12px mr-14px'>
          <Sharing {...sharingProps} />
        </div>
      </div>
      <div className='mt-16px'>
        {top50.map((song) => (
          <SongRanking key={song.songKey} {...song} defineLang={defineLang} hasRanking />
        ))}
      </div>
    </div>
  )
}

export default Realtime
