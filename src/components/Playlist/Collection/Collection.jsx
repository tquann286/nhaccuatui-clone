import React, { useState, useEffect, useCallback }  from 'react'

import { MainColCate } from 'components'
import { useStore } from 'store'

const Collection = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => state.lang === 'vi' ? vie : eng, [state.lang])
  
  const [colCate, setColCate] = useState([])
  console.log('colCate: ', colCate)

  const handleColCate = (value, mainCate) => {
    const oldColCate = colCate.filter(collection => collection.mainCate !== mainCate)

    setColCate([ ...oldColCate, { value, mainCate }])
  }

  const mainColCateProps = {
    defineLang,
    colCate,
    handleColCate
  }

  return (
    <div className='collection-container min-h-[1500px] commonMainOutlet'>
      <div className="pt-10 common-paddingLR">
        <MainColCate {...mainColCateProps} />
      </div>
    </div>
  )
}

export default Collection