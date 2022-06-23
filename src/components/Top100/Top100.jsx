import React from 'react'
import './Top100.scss'

import { createTop100Url } from 'share/utilities'
import { Link } from 'react-router-dom'

const Top100 = ({ top100List }) => {
  console.log(top100List)

  return (
    <div className="t1-container">
      <div className="t1-title">
        <Link to={createTop100Url(top100List[0].title, top100List[0].key)}>Top 100</Link>
      </div>
      <div className="t1-main">
      
      </div>
    </div>
  )
}

export default Top100