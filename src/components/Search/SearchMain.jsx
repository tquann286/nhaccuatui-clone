import React from 'react'

import { Loading } from 'components'

const SearchMain = ({  defineLang, trendingKeywords, }) => {

  if (!trendingKeywords) return <Loading />

  return (
    <div className='sm-container'>
      <div className="trend-keywords-container">
        <h1 className="tk-title">{defineLang('Top từ khóa', 'Top keywords')}</h1>
        <div className="tk-main">
          {trendingKeywords.map(keyword => {
            const {order, title, link} = keyword

            return (
              <div key={order} className="tk-content">
              <p className="tk-content-title">
                <span className="tk-position">#{order}</span>
                {title}
              </p>
            </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SearchMain