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
        setSlides(response?.data?.advertisements);
        };
        fetchAds();
    }, []);
console.log("============", slides[1]);

  return (
    <>
    {slides[2] && (
    <div className=' py-2 relative flex flex-col w-[90.5%] mx-auto justify-center lg:mt-0 2xl:mt-0 xl:mt-0 md:mt-96  mb-8'>
      <div className="relative  gap-2 grid grid-cols-1 md:grid-1 lg:grid-1 xl:grid-1 2xl:grid-1 w-full
      ">
          <div key={slides[2]._id} className="relative ">
            <img src={slides[2].image} alt={slides[2].name} className="object-cover  w-full" />
          </div>
    
      </div>
    </div>
    )}
    </>
  );
};

export default AdSlider2;