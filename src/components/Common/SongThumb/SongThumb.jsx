import './SongThumb.scss'

const SongThumb = ({ width, shadowHeight, imageUrl }) => {
  return (
    <div className='st-container'>
      <div className='shadow1' style={{ height: shadowHeight }}></div>
      <div className='shadow2' style={{ height: shadowHeight }}></div>
      <div className='st-image' style={{ backgroundImage: `url(${imageUrl})`, width }}></div>
    </div>
  )
}

export default SongThumb
