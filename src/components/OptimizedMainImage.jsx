import React from 'react';
import { motion } from 'framer-motion';

const OptimizedMainImage = ({ 
  image, 
  isLoaded,  
}) => {
  return (
    <motion.div
      className="max-w-4xl mx-auto mb-8 relative overflow-hidden"
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Skeleton loader */}
      {!isLoaded && (
        <div className="relative w-full h-[70vh] overflow-hidden rounded-lg">
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
        </div>
      )}
      
      {/* Imagen principal */}
      <img
        src={image.url}
        alt={image.title}
        className={`w-full max-h-[70vh] object-cover rounded-lg shadow-lg transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading= "lazy"
      />
    </motion.div>
  );
};

const OptimizedCollageImage = ({ 
  image, 
  index, 
  isLoaded, 
  onClick 
}) => {
  return (
    <motion.div
      className="group cursor-pointer relative"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.1 }}
    >
      {/* Skeleton loader */}
      {!isLoaded && (
        <div className="absolute inset-0 overflow-hidden rounded-lg">
        <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>
      )}

      {/* Imagen del collage */}
      <div className={`overflow-hidden rounded-lg w-full h-full`}>
        <img
          src={image.url}
          alt={`Collage image ${index + 1}`}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

export { OptimizedMainImage, OptimizedCollageImage };