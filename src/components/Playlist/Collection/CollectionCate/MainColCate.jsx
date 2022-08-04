import React from 'react'

import { collectionCate } from 'share/Categories'
import { TopicColCate } from 'components'

const MainColCate = ({ defineLang }) => {
  

  return (
    <div className="pt-6 pb-3 w3-row">
      {collectionCate.map(collect => (
        <TopicColCate key={collect.value} { ... collect } defineLang={defineLang} />
      ))}
    </div>
  )
}

export default MainColCate