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

const AdSlider2: React.FC = () => {
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await getAllCompaniesAds();
        setSlides(response?.data?.advertisements || []);
      } catch (error) {
        console.error('Error fetching ads:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, []);

  return (
    <div className="py-2 relative flex flex-col w-[90.5%] mx-auto justify-center lg:mt-0 2xl:mt-0 xl:mt-0 md:mt-12 mb-8">
      {loading ? (
        // Skeleton Loader while fetching data
        <div className="relative w-full">
          <Skeleton height={80} width="100%" />
        </div>
      ) : slides.length > 2 ? (
        <div className="relative gap-2 grid grid-cols-1 md:grid-1 lg:grid-1 xl:grid-1 2xl:grid-1 w-full">
          <Link to={slides[2].url} key={slides[2]._id} className="relative">
            <img src={slides[2].image} alt={slides[2].name} className="object-cover w-full" />
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default AdSlider2;
