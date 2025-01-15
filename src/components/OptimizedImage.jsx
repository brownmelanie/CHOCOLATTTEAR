import React, { useState, useCallback } from 'react';

const OptimizedImage = ({ 
  url, 
  alt, 
  title, 
  date, 
  artist, 
  onClick, 
  className = '' 
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <div 
      className="flex flex-col min-w-[400px] px-10 font-montserrat pb-12 pt-12 lg:hover:scale-125 hover:transition-all"
      onClick={onClick}
    >
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          src={url}
          alt={alt}
          className={`w-auto object-cover transition-transform transform max-h-[400px] ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
          onLoad={handleLoad}
          draggable="false"
          decoding="async"
        />
      </div>
      <div className="flex flex-row items-center justify-between">
        <p className="text-xl">{title || ""}</p>
        <p className="text-xs font-mono">{date || ""}</p>
      </div>
      <p>{artist || ""}</p>
    </div>
  );
};

export default OptimizedImage;