import React from 'react'
import style from './MainSlider.module.css'
import slide1 from '../../assets/images/slider-image-1.jpeg'
import slide2 from '../../assets/images/slider-image-2.jpeg'
import slide3 from '../../assets/images/slider-image-3.jpeg'
import slide4 from '../../assets/images/banner-4.jpeg'
import slide5 from '../../assets/images/grocery-banner-2.jpeg'
import Slider from 'react-slick'

export default function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed:1000
  };

  
  return <>
    <div className="flex">
      <div className="w-3/4">
      <Slider {...settings}>
      <img src={slide1} alt='slide1 ' className='w-full h-[400px] object-cover'/>
      <img src={slide2} alt='slide2' className='w-full h-[400px] object-cover'/>
      <img src={slide3} alt='slide3' className='w-full h-[400px] object-cover'/>
        
    
        
    </Slider>

      </div>
      <div className="w-1/4">
      <img src={slide4} alt='banner1' className='w-full h-[200px]'/>
      <img src={slide5} alt='banner2' className='w-full h-[200px]'/>
      
      </div>
    </div>
  
  </>
}
