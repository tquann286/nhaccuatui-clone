import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'

import Blur from 'react-blur'
import { LoadingV2 } from 'components'
import { getTop100Item } from 'services/Top100/Top100'
import blur_layer from 'images/blur/blur_layer_v1.png'

const Top100Item = () => {
  const params = useParams()
  const query = new URLSearchParams(params.top100Id)
  const [defineLang, top100Title] = useOutletContext()

  const [top100, setTop100] = useState(null)
  console.log('top100: ', top100)
  const [count, setCount] = useState(20)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    try {
      setIsLoading(true)
      const getTop100State = async () => {
        const top100 = await getTop100Item(query.get('k'))

        setTop100(top100)
        setIsLoading(false)
      }
      getTop100State()
    } catch (error) {
      setIsLoading(false)
      throw new Error(error)
    }
  }, [params.top100Id])

  if (isLoading)
    return (
      <div className='flex items-center justify-center w-full h-[calc(100vh_-_13rem)]'>
        <LoadingV2 />
      </div>
    )

  if (!top100) return null

  return (
    <div>
      <div className='relative w-full h-[94px] mt-16 mb-9'>
        <Blur img={top100.songs[0].thumbnail || blur_layer} blurRadius={100} className='h-full w-full'>
          <div className='absolute top-0 left-0 h-full w-full bg-black/70'></div>
        </Blur>
        <div className='flex absolute items-center justify-between top-0 left-0 w-full h-full py-12px px-32px text-slate-100/90'>
          <div>
            <h2 className='text-3xl font-bold'>TOP 100</h2>
            <p className='mt-2.5 text-slate-100/60 uppercase text-13px font-medium'>
              {defineLang(top100Title.vi, top100Title.en)} -{' '}
              <span className='normal-case'>
                {defineLang('Cập nhật vào: ', 'Updated at: ')}{top100.dateModify}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Top100Item
