import React from 'react'

const Image = ({ imageUrl, backupImg, loadingImg, ... props }) => {

  const handleErrorImg = ({ currentTarget }) => {
    currentTarget.onerror = null
    currentTarget.src = backupImg
  }

  return (
    <img src={imageUrl} onError={handleErrorImg} { ... props } />
  )
}

export default Image