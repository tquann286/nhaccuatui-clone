import React, { useState, useEffect } from 'react'

import { BlurImg } from 'components'
import { Grid, Tooltip as MuiTooltip } from '@mui/material'
import { getCurrentDay } from 'share/utilities'
import { IconButton } from '@mui/material'
import { BsFillPlayCircleFill } from 'react-icons/bs'
import { isEmpty } from 'lodash'
import { defineColor } from 'services/Common/Top3Realtime'
import { LineChart, Line, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from 'recharts'

const Top3Realtime = ({ top3, defineLang, showTop3 }) => {
  console.log('top3: ', top3)

  useEffect(() => {
    if (!isEmpty(top3)) {
    }
  }, [top3])

  if (isEmpty(top3)) return null

  const blurImgProps = {
    img: top3[0]?.thumbnail,
    blurRadius: 100,
    className: 'relative h-full w-full',
  }

  const xAxisProps = {
    dataKey: 'time',
    allowDuplicatedCategory: false,
    axisLine: false,
    tickLine: false,
    tickMargin: 8,
    ticks: top3[0].viewIn24H.map((value, i) => (i % 2 === 0 ? value.time : null)).filter((value) => value !== null),
    tick: { fill: '#f4f6f899', fontSize: 12 },
    interval: 'preserveStartEnd',
  }

  const renderTooltip = (props) => {
    console.log(props)
  }

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
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart strokeDashArray={4} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray='5'
                  stroke='#f4f6f833
                '
                />
                <XAxis {...xAxisProps} />
                <Tooltip />
                {top3.map((item, i) => (
                  <Line id={item.songKey} type='monotone' dataKey='view' data={item.viewIn24H} name={item.title} key={item.songKey} stroke={defineColor(i)} dot={false} activeDot={{ strokeWidth: 2, r: 5 }} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Grid>
    </React.Fragment>
  )
}

export default Top3Realtime
