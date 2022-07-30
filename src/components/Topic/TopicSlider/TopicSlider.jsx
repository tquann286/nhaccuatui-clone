import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './TopicSlider.scss'

import { useSlider } from 'hooks'
import { createTopicUrl } from 'share/utilities'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

const TopicSlider = ({ defineLang, topicCover }) => {
  const [activeTopic, setActiveTopic] = useState(0)
  const [readMore, setReadMore] = useState(false)

  const toggleReadMore = () => {
    setReadMore(!readMore)
  }

  useSlider(setActiveTopic, topicCover, 5000)

  if (!topicCover) return null
  
  const { backgroundColor, coverImageURL, description, key, thumbURL, title } = topicCover[activeTopic]

  const imgStyle = {
    backgroundColor,
    backgroundImage: `url(${coverImageURL})`,
  }

  return (
    <div className='topic-slider-container'>
      <Link to={createTopicUrl(title, key)}>
        <div className='topic-slide-img' style={imgStyle}></div>
      </Link>
      <div className={`topic-desc color-0-5 ${readMore && 'is-read-more'}`}>
        {description}
      </div>
      <div className="color-0-5 clickable pt0-lr3-2 width-fit-content w3-row alcenter" onClick={toggleReadMore}>
        <MdOutlineKeyboardArrowDown className={`${readMore && 'show-detail'}`} />
        <span className='ml-0-5'>{defineLang('Thêm', 'Read more')}</span>
      </div>
    </div>
  )
}

export default TopicSlider
