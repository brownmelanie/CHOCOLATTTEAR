import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
import ImageWithSkeleton from './ImageWithSkeleton';

const ImageCarousel = ({ images, onImageClick }) => {
  const carouselRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const scrollTimeout = useRef(null);
  const speed = 10;
  const scrollAmount = 300;

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;
    const currentTouch = e.touches[0].clientX;
    const diff = (touchStart - currentTouch) / 2;
    
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: diff });
      setTouchStart(currentTouch);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
    setIsPaused(false);
  };

  const handleScroll = useCallback((e) => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += e.deltaY;
      setIsPaused(true);
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      scrollTimeout.current = setTimeout(() => {
        setIsPaused(false);
      }, 500);
    }
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      setIsPaused(true);
      carouselRef.current.scrollTo({
        left: carouselRef.current.scrollLeft - scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(() => setIsPaused(false), 500);
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      setIsPaused(true);
      carouselRef.current.scrollTo({
        left: carouselRef.current.scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(() => setIsPaused(false), 500);
    }
  };

  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener('wheel', handleScroll, { passive: false });
      carouselElement.addEventListener('touchstart', handleTouchStart);
      carouselElement.addEventListener('touchmove', handleTouchMove);
      carouselElement.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener('wheel', handleScroll);
        carouselElement.removeEventListener('touchstart', handleTouchStart);
        carouselElement.removeEventListener('touchmove', handleTouchMove);
        carouselElement.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    let interval;
    if (!isPaused && carouselRef.current) {
      interval = setInterval(() => {
        carouselRef.current.scrollLeft += 1;
        if (
          carouselRef.current.scrollLeft >=
          carouselRef.current.scrollWidth - carouselRef.current.clientWidth
        ) {
          carouselRef.current.scrollLeft = 0;
        }
      }, speed);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="relative h-[80vh] lg:h-[83vh] w-screen flex items-center">
      <button 
        onClick={scrollLeft}
        className="absolute left-1 lg:left-4 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors z-50 block"
      >
        <ChevronLeft className="w-2 h-2 lg:w-6 lg:h-6" />
      </button>

      <div
        ref={carouselRef}
        className="relative h-[100%] w-screen overflow-hidden pt-10"
        onWheel={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex flex-row justify-center space-x-4 items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {[...images, ...images, ...images, ...images].map((image, index) => (
            <ImageWithSkeleton
            key={`${image.id}-${index}`}
            url={image.url}
            alt={image.title || `Carrusel ${index}`}
            title={image.title}
            date={image.date}
            artist={image.artist}
            onClick={() => onImageClick(image)}
          />
          ))}
        </div>
      </div>

      <button 
        onClick={scrollRight}
        className="absolute right-1 lg:right-4 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors block"
      >
        <ChevronRight className="w-2 h-2 lg:w-6 lg:h-6" />
      </button>
    </div>
  );
};

export default ImageCarousel;