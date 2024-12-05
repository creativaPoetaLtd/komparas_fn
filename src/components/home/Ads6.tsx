import React, { useState, useEffect } from 'react';
import { getAllCompaniesAds } from '../../api/ads';
import { Link } from 'react-router-dom';
interface SlideData {
  _id: number;
  title: string;
  name: string;
  image: string;
  url: string;
}

const AdSlider6: React.FC = () => {

  const [slides, setSlides] = useState<SlideData[]>([]);

    useEffect(() => {
        const fetchAds = async () => {
        const response = await getAllCompaniesAds();
        setSlides(response?.data?.advertisements);
        };
        fetchAds();
    }, []);

  return (
    <>
    {slides[6] && (
    <div className=' py-2 relative flex flex-col w-[90.6%] mx-auto justify-center lg:mt-0 2xl:mt-0 xl:mt-0 md:mt-96  mb-8'>
      <div className="relative  gap-2 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 w-full
      ">
          <Link key={slides[6]._id} className="relative " to={slides[6].url}>
            <img src={slides[6].image} alt={slides[6].name} className="object-cover  w-full" />
          </Link>
      </div>
    </div>
    )}
    </>
  );
};

export default AdSlider6;