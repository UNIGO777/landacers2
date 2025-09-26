import React from 'react'
import Slider from 'react-slick'
import Card from '../card/Card'
import { ZapIcon } from 'lucide-react'
const CardCarousel = ({ title, className, children }) => {
  const SamplePrevArrow = (props) => {
    const { onClick } = props
    return (
      <button 
        className="absolute top-1/2 -left-6 md:-left-12 transform -translate-y-1/2 bg-gray-200 bg-opacity-80 text-black px-4 py-4 hover:scale-[1.1] transition-all rounded-full z-[5]"
        onClick={onClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-5' fill="currentColor"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
      </button>
    )
  }

  const SampleNextArrow = (props) => {
    const { onClick } = props
    return (
      <button 
        className="absolute top-1/2 -right-6 md:-right-12 transform -translate-y-1/2 bg-gray-200 bg-opacity-80 text-black px-4 py-4 hover:scale-[1.1] transition-all rounded-full "
        onClick={onClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-5' fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
      </button>
    )
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    zIndex: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 2, slidesToScroll: 1 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ]
  }

  return (
    <div className={`mt-10 px-4  md:px-16 pb-5 md:pb-10 z-20 ${className}`}>
      <h2 className="text-xl  md:text-2xl font-bold">{title}</h2>
      <div className="mt-10 p-4  md:p-12 relative">
        <Slider {...settings}>
          {children}
        </Slider>
      </div>
    </div>
  )
}

export default CardCarousel
