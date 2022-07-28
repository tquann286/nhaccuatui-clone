import notfoundImg from 'images/not_found.png'

const NotFoundV2 = ({ defineLang, vie, eng }) => {
  return (
    <div className='flexCenter flex-column'>
      <img className='w25 h25' src={notfoundImg} alt='Page not found' />
      <p className='notfound-title color-0-5'>{defineLang(vie, eng)}</p>
    </div>
  )
}

export default NotFoundV2
