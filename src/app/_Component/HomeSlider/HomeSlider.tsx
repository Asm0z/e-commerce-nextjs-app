"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    fade: true,
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="-translate-y-7 "> {dots} </ul>
      </div>
    ),
  };

  return (
      <Slider {...settings} className="lg:w-10/12 mx-auto my-5 rounded-2xl relative">
        <Image
          src="/Images/slider-1.png"
          alt="Banner-1"
          width={1920}
          height={912}
          className="w-full object-cover rounded-2xl"
        />
        <Image
          src="/Images/slider-2.png"
          alt="Banner-2"
          width={1920}
          height={912}
          className="w-full object-cover rounded-2xl"
        />
        <Image
          src="/Images/slider-3.png"
          alt="Banner-3"
          width={1920}
          height={912}
          className="w-full object-cover rounded-2xl"
        />
        <Image
          src="/Images/slider-4.png"
          alt="Banner-4"
          width={1920}
          height={912}
          className="w-full object-cover rounded-2xl"
        />
        <Image
          src="/Images/slider-5.png"
          alt="Banner-5"
          width={1920}
          height={912}
          className="w-full object-cover rounded-2xl"
        />
        <Image
          src="/Images/slider-6.png"
          alt="Banner-6"
          width={1920}
          height={912}
          className="w-full object-cover rounded-2xl"
        />
      </Slider>
  );
}
