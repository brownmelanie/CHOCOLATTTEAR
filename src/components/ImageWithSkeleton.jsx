import React, { useState, useCallback } from 'react';

const ImageWithSkeleton = ({ 
  url, 
  alt, 
  title, 
  date, 
  artist, 
  onClick,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <div 
      className="flex flex-col min-w-[380px] px-10 font-montserrat pb-12 pt-12 lg:hover:scale-125 hover:transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-full h-[400px] flex items-center justify-center">
        {/* Skeleton loader */}
        {isLoading && (
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
          </div>
        )}
        
        {/* Imagen real */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={url}
            alt={alt}
            className={`max-w-full max-h-full w-auto h-auto object-contain rounded-lg transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleLoad}
            loading="lazy"
            draggable="false"
          />
        </div>
      </div>

      {/* Metadata */}
      <div className={`mt-2 mx-4 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex flex-row items-center justify-between">
          <p className="text-xl">{title || ""}</p>
          <p className="text-xs font-mono">{date || ""}</p>
        </div>
        <p className="mt-1">{artist || ""}</p>
      </div>
    </div>
  );
};

export default ImageWithSkeleton;