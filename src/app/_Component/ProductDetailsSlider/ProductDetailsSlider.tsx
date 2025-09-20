"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import Slider from "react-slick";

export default function ProductDetailsSlider({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };
  const fullScreenSettings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    initialSlider: startIndex,
    arrows: true,
  };

  return (
    <>
      <Slider {...settings}>
        {images.map((image, index) => {
          return (
            <div
              key={image}
              className="cursor-zoom-in "
              onClick={() => {
                setStartIndex(index);
                setIsOpen(true);
              }}
            >
              <Image
                src={image}
                alt={title}
                width={300}
                height={300}
                className="w-full"
              />
            </div>
          );
        })}
      </Slider>
      {/* open Slider */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <Button
            className="absolute top-10 right-5 text-blue-900 text-3xl bg-transparent hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </Button>
          <div className="w-10/12 lg:w-4/12">
            <Slider {...fullScreenSettings}>
              {images.map((image) => {
                return (
                  <div
                    key={image}
                    className="flex justify-center items-center"
                  >
                    <Image
                      src={image}
                      alt={title}
                      width={300}
                      height={300}
                      className="w-full object-contain "
                    />
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      )}
    </>
  );
}
