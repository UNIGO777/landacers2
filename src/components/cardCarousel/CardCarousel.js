import React from 'react'
import Slider from 'react-slick'
import Card from '../card/Card'

const CardCarousel = ({ title, className, children }) => {
  const SamplePrevArrow = (props) => {
    const { onClick } = props
    return (
      <button 
        className="absolute top-1/2 -left-3 md:-left-10 transform -translate-y-1/2 bg-gray-200 bg-opacity-80 text-black px-4 py-4 hover:scale-[1.1] transition-all rounded-full z-20"
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
        className="absolute top-1/2 -right-3 md:-right-10 transform -translate-y-1/2 bg-gray-200 bg-opacity-80 text-black px-4 py-4 hover:scale-[1.1] transition-all rounded-full z-20"
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
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 1 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 1 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ]
  }

  return (
    <div className={`mt-10 px-3 md:px-10 pb-5 md:pb-10 ${className}`}>
      <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
      <div className="mt-10 p-2 md:p-10 relative">
        <Slider {...settings}>
          {children}
          {children}
        </Slider>
      </div>
    </div>
  )
}

export default CardCarousel
