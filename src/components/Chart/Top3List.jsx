import React from 'react'

import { convertDuration } from 'share'
import { Grid, IconButton } from '@mui/material'
import { defineColor } from 'services/Common/Top3Realtime'
import { Image } from 'components'
import { isEmpty } from 'lodash'
import { IoMdMore } from 'react-icons/io'
import backupImg from 'images/default/default_song.png'

const Top3List = ({ top3, activeItem, setActiveItem }) => {
  
  if (isEmpty(top3)) return null

  return (
    <div className='px-24px'>
      {top3.map((item, i) => {
        const { artists, duration, position, songKey, thumbnail, title } = item

        return (
          <Grid container key={songKey} className={`my-2px py-4px pr-12px pl-8px rounded-4px ${activeItem === i ? 'bg-white/[.05]' : 'bg-white/[.02]'}`} onMouseEnter={() => setActiveItem(i)}>
            <Grid item xs={true}>
              <Grid container className='items-center flex h-full'>
                <Grid item xs={6}>
                  <Grid container className='items-center'>
                    <span className='mr-16px ml-6px  text-center font-semibold text-base' style={{ color: defineColor(i) }}>
                      {position}
                    </span>
                    <Image imageUrl={thumbnail} backupImg={backupImg} className='w-36px h-36px rounded-2px' />
                    <span className='ml-12px truncate text-white/[.88] clickable font-semibold' title={title}>
                      {title}
                    </span>
                  </Grid>
                </Grid>
                <Grid item xs={6}></Grid>
              </Grid>
            </Grid>
            <Grid container className='items-center w-40'>
              <div className='text-sm font-normal text-white/50 cursor-default'>{convertDuration(duration)}</div>
            </Grid>
            <Grid item className='w-36px'>
              <IconButton className='hover:bg-white/[.08]' aria-label='more-icon' size='medium'>
                <IoMdMore className='text-white/50 text-22px' />
              </IconButton>
            </Grid>
          </Grid>
        )
      })}
    </div>
  )
}

export default Top3List