import React from 'react'
import DealCard from './DealCard'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Deal = () => {
    const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed: 2000,
    // cssEase:"linear"

  };
  return (
    <div className='py-5 lg:px-20'>
        <div className='slide-container'>

            <Slider {...settings}>
                {[1,1,1,1,1,1,1].map((item,index) => <div key={index} className='flex flex-col w-60'>
                    <DealCard deal=
                        {
                            {
                                image:"https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/d/c/v/-original-imahgfkhwaxezxje.jpeg?q=70",
                                discount:"10"
                            }
                        } 
                    />
                </div>)}

            </Slider>

        </div>



        
        
    </div>
  )
}

export default Deal