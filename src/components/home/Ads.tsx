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

const AdSlider: React.FC = () => {

  const [slides, setSlides] = useState<SlideData[]>([]);

    useEffect(() => {
        const fetchAds = async () => {
        const response = await getAllCompaniesAds();
        setSlides(response?.data?.advertisements.slice(0, 2));
        };
        fetchAds();
    }, []);

  return (
    <>
    {slides.length > 0 && (
    <div className=' py-2  relative flex flex-col w-[90.5%] mx-auto justify-center lg:mt-[6rem] 2xl:mt-[6rem] xl:mt-0 md:mt-96'>
      <div className="relative gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 w-full
      ">
        {slides.map((slide) => (
          <Link key={slide._id} className="relative" to={slide?.url}>
            <img src={slide.image} alt={slide.name} className="object-cover w-full" />
          </Link>
        ))}
      </div>
    </div>
    )}
    </>
  );
};

export default AdSlider;