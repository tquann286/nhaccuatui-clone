import React from 'react'

import { BlurImg } from 'components'
import { Grid } from '@mui/material'
import { getCurrentDay } from 'share/utilities'
import { IconButton } from '@mui/material'
import { BsFillPlayCircleFill } from 'react-icons/bs'

const Top3Realtime = ({ top3, defineLang }) => {
  if (!top3) return null

  const blurImgProps = {
    img: top3[0]?.thumbnail,
    blurRadius: 100,
    className: 'relative h-full w-full',
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
              <IconButton className='hover:!bg-white/[.08]' aria-label='play-icon'>
                <BsFillPlayCircleFill className='text-slate-100' />
              </IconButton>
            </div>
          </div>
        </div>
      </Grid>
    </React.Fragment>
  )
}

export default Top3Realtime
