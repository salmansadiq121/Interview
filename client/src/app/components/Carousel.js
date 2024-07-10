import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import Image from "next/image";

export default function Carousel({ banners }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log("Banners", banners);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners?.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [banners?.length]);

  const handlePrevClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + banners?.length) % banners?.length
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners?.length);
  };

  return (
    <div className="w-[22rem] sm:w-[35rem] h-[45vh]  relative overflow-hidden">
      {banners?.map((banner, index) => (
        <div
          key={banner._id}
          className={`absolute inset-0 w-[22rem] sm:w-[35rem] h-[45vh] object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={banner ? banner : "/car3.webp"}
            fill
            alt="banner"
            className=" rounded-lg relative object-fill sm:object-fill"
          />
        </div>
      ))}
      <button
        onClick={handlePrevClick}
        className="absolute top-1/2 left-1 transform -translate-y-1/2 p-1 bg-gray-800 bg-opacity-50 cursor-pointer text-white rounded-full"
      >
        <FaAngleLeft className="h-5 w-5 text-white" />
      </button>
      <button
        onClick={handleNextClick}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 p-1 bg-gray-800 bg-opacity-50 cursor-pointer text-white rounded-full"
      >
        <FaAngleRight className="h-5 w-5 text-white" />
      </button>
    </div>
  );
}
