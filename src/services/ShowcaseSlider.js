import { CustomPrevArrow, CustomNextArrow } from 'components/ShowcaseSlider/CustomArrow/CustomArrow'

export const settings = {
  dots: true,
  className: 'center',
  infinite: true,
  slidesToShow: 1,
  autoplay: true,
  speed: 800,
  lazyLoad: true,
  pauseOnHover: true,
  nextArrow: <CustomNextArrow />,
  prevArrow: <CustomPrevArrow />,
}