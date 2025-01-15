import React, { useState, useCallback } from 'react';

const ImageWithSkeleton = ({ 
  url, 
  alt, 
  title, 
  date, 
  artist, 
  onClick,
  aspectRatio = '3/4' // Podemos ajustar esto según tus necesidades
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setError(true);
  }, []);

  return (
    <div 
      className="flex flex-col min-w-[380px] px-10 font-montserrat pb-12 pt-12 lg:hover:scale-125 hover:transition-all cursor-pointer"
      onClick={onClick}
    >
      <div 
        className="flex flex-col justify-center"
        style={{ aspectRatio }}
      >
        {/* Skeleton loader */}
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
        )}
        
        {/* Imagen real */}
        <img
          src={url}
          alt={alt}
          className={`w-full max-h-[400px] object-cover transition-all duration-300 rounded-lg ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          draggable="false"
        />
      </div>

      {/* Metadata */}
      <div className={`mt-2 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
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