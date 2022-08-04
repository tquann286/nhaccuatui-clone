import React, { useState, useEffect, useCallback } from 'react'

import { MainColCate, Title } from 'components'
import { useStore } from 'store'
import { isEmpty } from 'lodash'
import { IoIosCloseCircle } from 'react-icons/io'

const Collection = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  const [colCate, setColCate] = useState([])

  const handleAddColCate = (value, mainCate) => {
    const oldColCate = colCate.filter((collection) => collection.mainCate !== mainCate)

    setColCate([...oldColCate, { value, mainCate }])
  }

  const handleRemoveColCate = (value) => {
    const newColCate = colCate.filter(collect => collect.value.value !== value)

    setColCate(newColCate)
  }

  const mainColCateProps = {
    defineLang,
    colCate,
    handleAddColCate,
  }

  return (
    <div className='collection-container min-h-[1500px] commonMainOutlet'>
      <Title title={defineLang('Tuyển tập playlist hay nhất, chọn lọc theo tâm trạng - NhacCuaTui Clone', 'Best playlist collection, based on mood - NhacCuaTui Clone')} />
      <div className='pt-10 common-paddingLR'>
        <MainColCate {...mainColCateProps} />
        <div className='mt-16 font-bold color-0-88 text-md flex items-center'>
          {isEmpty(colCate) ? defineLang('Tất cả tuyển tập','All Collections') : 'Tags: '}
          {colCate.map(cate => {
            const { value } = cate

            return (
              <span key={value.value} className='flex items-center px-5 py-3 ml-3 bg-color-0-05 rounded-3xl color-0-5'>
                <span className='text-sm font-medium mr-2'>{defineLang(value.title.vi, value.title.en)}</span>
                <IoIosCloseCircle className='cursor-pointer' onClick={() => handleRemoveColCate(value.value)} />
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Collection
