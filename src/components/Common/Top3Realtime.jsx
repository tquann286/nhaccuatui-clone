import React, { useState, useEffect } from 'react'

import { BlurImg } from 'components'
import { Grid, Tooltip as MuiTooltip } from '@mui/material'
import { getCurrentDay } from 'share/utilities'
import { IconButton } from '@mui/material'
import { BsFillPlayCircleFill } from 'react-icons/bs'
import { isEmpty } from 'lodash'

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const Top3Realtime = ({ top3, defineLang, showTop3 }) => {
  console.log('top3: ', top3)
  const [data, setData] = useState({})
  console.log('data: ', data)

  useEffect(() => {
    const defineColor = (i) => {
      switch (i) {
        case 0:
          return '#2daaed'
        case 1:
          return '#FFC40E'
        case 2:
          return '#95D96D'
        default:
          break
      }
    }

    if (!isEmpty(top3)) {
      console.log('conasc')
      setData({
        labels: top3[0].viewIn24H.filter((value, i) => i % 2 === 0).map(value => value.time),
        datasets: top3.map((song, i) => {
          const { title, viewIn24H, songKey } = song

          return {
            label: title,
            data: viewIn24H.map((view) => view.view),
            borderColor: defineColor(i),
            yAxisID: songKey,
          }
        }),
      })
    }
  }, [top3])

  if (isEmpty(top3)) return null
  if (isEmpty(data)) return null

  const blurImgProps = {
    img: top3[0]?.thumbnail,
    blurRadius: 100,
    className: 'relative h-full w-full',
  }
  // <Line data={data} />

  return (
    <React.Fragment>
      <BlurImg {...blurImgProps} />
      <Grid container direction='column' className='absolute top-0'>
        <div className='flex relative flex-col h-[296px] w-full mb-2px'>
          <div className='flex w-full items-center justify-between py-16px px-[19px]'>
            <div className='text-sm'>
              <span className='text-slate-100 font-semibold mr-8px'>#NCTChart</span>
              <span className='text-white/50'>{getCurrentDay()}</span>
            </div>
            <div className='flex h-full'>
              <MuiTooltip title={defineLang('Phát tất cả', 'Play all')} arrow placement='top'>
                <IconButton className='hover:!bg-white/[.08]' aria-label='play-icon'>
                  <BsFillPlayCircleFill className='text-slate-100' />
                </IconButton>
              </MuiTooltip>
            </div>
          </div>
          <div className='px-24px relative flex items-end h-[calc(100%_-_63px)] w-full rounded-4px'>
            <Line data={data} />
          </div>
        </div>
      </Grid>
    </React.Fragment>
  )
}

export default Top3Realtime
