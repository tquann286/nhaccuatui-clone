import React, { useState, useEffect } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom'

import { CateBasic } from 'components'
import { weekSubCate } from 'share/Categories'
import { getWeek, getYear } from 'services/Chart/Top20'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { getTop20Data } from 'services/Chart/Top20'

const Top20 = () => {
  const [defineLang, curCate, navigate] = useOutletContext()
  const [searchParams] = useSearchParams()

  const [top20, setTop20] = useState({})
  console.log('top20: ', top20)
  const [type, setType] = useState('song')
  const [week, setWeek] = useState(getWeek())
  const [year, setYear] = useState(getYear())
  const [curSubCate, setCurSubCate] = useState(weekSubCate[0].value)
  const [isLoading, setIsLoading] = useState(false)

  const handleTitle = ({ vi, en }) => (document.title = defineLang(`Bảng xếp hạng bài hát ${vi} - Tuần 31/2022 - NhacCuaTui Clone`, `${en} Song Chart - Week 31/2022 - NhacCuaTui Clone`))

  const handleChangeWeek = (type) => {
    if (type === 'next' && !((week === getWeek()) && (year === getYear()))) {
      if (week === 52) {
        setWeek(1)
        setYear(year + 1)
      } else {
        setWeek(week + 1)
      }
    } else if (type === 'prev') {
      if (week === 1) {
        setWeek(52)
        setYear(year - 1)
      } else {
        setWeek(week - 1)
      }
    }
  }

  useEffect(() => {
    setCurSubCate(searchParams.get('q'))

    switch (curSubCate) {
      case 'nhac-viet':
        handleTitle(weekSubCate[0].title)
        break
      case 'au-my':
        handleTitle(weekSubCate[1].title)
        break
      case 'nhac-han':
        handleTitle(weekSubCate[2].title)
        break
      default:
        break
    }
  }, [curSubCate, defineLang])

  useEffect(() => {
    try {
      setIsLoading(true)
      const getTop20State = async () => {
        const top20 = await getTop20Data(curSubCate, type, week, year)

        setTop20(top20)
        setIsLoading(false)
      }

      getTop20State()
    } catch (error) {
      setIsLoading(false)
      throw new Error(error)
    }
  }, [curSubCate, type, week, year])

  const handleSubCateChange = (newCate) => {
    setCurSubCate(newCate)
    navigate(`/bang-xep-hang/top-20?q=${newCate}`)
  }

  const cateBasicProps = {
    defineLang,
    curCate: curSubCate,
    handleCateChange: handleSubCateChange,
    categories: weekSubCate,
  }

  return (
    <div className='top20-container'>
      {curCate === 'week' && (
        <div className='py-8'>
          <CateBasic {...cateBasicProps} />
        </div>
      )}
      <div className='w3-row leading-26px h-26px mt-24px mx-32px color-0-88'>
        <div className='text-22px font-bold w3-col w-40'>
          {defineLang('Tuần', 'Week')} {week}:
        </div>
        <div className='w-fit h-full rounded-13px useBorder border-0-05 ml-20px w3-col w3-row cursor-pointer color-0-5 text-13px transition-colors'>
          <div className='w3-col w-20px h-full leading-inherit text-center clickable flex items-center justify-center' onClick={() => handleChangeWeek('prev')}>
            <IoIosArrowBack />
          </div>
          <div className={`w3-col w3-right w-20px h-full leading-inherit text-center hover:text-main flex items-center justify-center ${((week === getWeek()) && (year === getYear()) && '!text-disable cursor-default')}`} onClick={() => handleChangeWeek('next')}>
            <IoIosArrowForward />
          </div>
        </div>
        <div className={`w3-col w3-right w-fit clickable inline-block`}>Video</div>
        <div className='w3-col h26px leading-26px w3-right w-fit text-13px mr-12px inline-block'>|</div>
        <div className={`w3-right w3-col w-fit clickable mr-12px inline-block`}>{defineLang('Bài hát', 'Song')}</div>
      </div>
    </div>
  )
}

export default Top20
