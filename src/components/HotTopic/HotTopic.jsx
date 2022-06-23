import React from 'react'
import { Link } from 'react-router-dom'
import './HotTopic.scss'

const HotTopic = ({ hotTopic }) => {
  return (
    <div className="ht-container">
      <div className="ht-title">
        <Link to='/chu-de'>Chủ đề hot</Link>
      </div>
      <div className="ht-main">
      
      </div>
    </div>
  )
}

export default HotTopic