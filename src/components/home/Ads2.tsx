import React, { useState, useEffect } from 'react';
import { getAllCompaniesAds } from '../../api/ads';
interface SlideData {
  _id: number;
  title: string;
  name: string;
  image: string;
}

const AdSlider2: React.FC = () => {

  const [slides, setSlides] = useState<SlideData[]>([]);

    useEffect(() => {
        const fetchAds = async () => {
        const response = await getAllCompaniesAds();
        setSlides(response?.data?.advertisements.slice(2, 4));
        };
        fetchAds();
    }, []);

  return (
    <>
    {slides.length > 0 && (
    <div className=' bg-green-300 py-2 relative flex flex-col w-[90%] mx-auto justify-center  lg:px-[4rem] lg:mt-0 2xl:mt-0 xl:mt-0 md:mt-96 px-2 mb-8'>
      <div className="relative h-[8rem] gap-2 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 w-full
      ">
        {slides.map((slide) => (
          <div key={slide._id} className="relative h-[8rem]">
            <img src={slide.image} alt={slide.name} className="object-cover h-[8rem] w-full" />
          </div>
        ))}
      </div>
    </div>
    )}
    </>
  );
};

export default AdSlider2;