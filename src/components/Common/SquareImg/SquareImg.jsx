import './SquareImg.scss'

const SquareImg = ({ imageUrl }) => {


  return (
    <div className="square-img-container" style={{ backgroundImage: `url(${imageUrl})` }}>
    </div>
  )
}

export default SquareImg