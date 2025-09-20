'use client'
import { CategoryData } from '@/types/categories';
import Image from 'next/image';
import React from 'react'
import Slider from 'react-slick';

export default function CategoriesSlider({productsCategory}: {productsCategory:CategoryData[]}) {
    const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      }
    ]
  };
  return (
    <div className="slider-container">
    <Slider {...settings}>
        {productsCategory.map((product) => {
          return (
            <div key={product._id} className='h-48 lg:h-64'>
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
              <h3 className='text-center mt-2'>{product.name}</h3>
            </div>
          );
        })}
      </Slider>
    </div>
  )
}
