import React from 'react'

import { collectionCate } from 'share/Categories'
import { TopicColCate } from 'components'

const MainColCate = ({ defineLang, colCate, handleColCate }) => {
  const topicColCateProps = {
    defineLang, colCate, handleColCate
  }

  return (
    <div className="pt-6 pb-3 w3-row border-b border-0-05 border-solid">
      {collectionCate.map(collect => (
        <TopicColCate key={collect.value} { ... collect } { ... topicColCateProps } />
      ))}
    </div>
  )
}

export default MainColCate