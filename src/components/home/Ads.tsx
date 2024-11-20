import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllCompaniesAds } from '../../api/ads';
interface SlideData {
  id: number;
  title: string;
  name: string;
  image: string;
}

const AdSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const [slides, setSlides] = useState<SlideData[]>([]);

    useEffect(() => {
        const fetchAds = async () => {
        const response = await getAllCompaniesAds();
        setSlides(response?.data?.advertisements);
        };
        fetchAds();
    }, []);

  

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative w-full lg:px-[3rem] px-2 py-12 overflow-hidden rounded-lg shadow-lg">
      <div className="relative h-[30rem]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute w-full h-full transition-opacity duration-500 ease-in-out
              ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              height={3000}
              width={3000}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
              <h2 className="text-3xl font-bold mb-2">{slide.name}</h2>
              <p className="text-lg">{slide.title}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute md:left-12 left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute md:right-12 right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors
              ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdSlider;