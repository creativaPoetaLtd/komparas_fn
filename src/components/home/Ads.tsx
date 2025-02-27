import React, { useState, useEffect } from 'react';
import { getAllCompaniesAds } from '../../api/ads';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

interface SlideData {
  _id: number;
  title: string;
  name: string;
  image: string;
  url: string;
}

const AdSlider: React.FC = () => {
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAds = async () => {
      const response = await getAllCompaniesAds();
      setSlides(response?.data?.advertisements.slice(0, 2));
      setLoading(false);
    };
    fetchAds();
  }, []);

  if (!loading && slides.length === 0) {
    return null;
  }

  return (
    <div className="py-2 relative flex flex-col w-[90.5%] mx-auto justify-center lg:mt-12 2xl:mt-12 xl:mt-0 md:mt-12">
      {loading ? (
        // Ads Slider Skeleton
        <div className="relative lg:w-[80%] w-[100%] self-center h-full ml-0 lg:ml-40 gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
          <Skeleton height={80} width="100%" />
          <Skeleton height={80} width="100%" />
        </div>
      ) : (
        slides.length > 0 && (
          <div className="relative gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 w-full">
            {slides.map((slide) => (
              <Link key={slide._id} className="relative" to={slide?.url}>
                <img src={slide.image} alt={slide.name} className="object-cover w-full" />
              </Link>
            ))}
          </div>
        )
      )}
    </div>
  );
  
};

export default AdSlider;
