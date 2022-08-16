import React, { useState, useEffect } from 'react'

import { BlurImg } from 'components'
import { Grid, Tooltip as MuiTooltip } from '@mui/material'
import { getCurrentDay } from 'share/utilities'
import { IconButton } from '@mui/material'
import { BsFillPlayCircleFill } from 'react-icons/bs'
import { isEmpty } from 'lodash'
import { defineColor, renderCustomAxisTick } from 'services/Common/Top3Realtime'
import { LineChart, Line, CartesianGrid, XAxis, Tooltip, ResponsiveContainer, YAxis } from 'recharts'

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

  const lineChartProps = {
    data: top3.viewIn24H,
    width: '100%',
    height: '100%',
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
            <LineChart {...lineChartProps}>
              <Tooltip />
              <XAxis dataKey='time' tick={renderCustomAxisTick} />
              <YAxis />
              {top3.map((item, i) => {
                return <Line key={item.songKey} type='monotone' dataKey='view' stroke={defineColor(i)} />
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
        </div>
      </Grid>
    </React.Fragment>
  )
}

export default Top3Realtime
