import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import FloatingButton from '../components/foatingButton';
import ImageCarousel from '../components/ImageCarousel';
import { usePhotos } from '../components/functions/usePhotos';
import Loader from '../components/loader';

const Photos = () => {
  const navigate = useNavigate();
  const { images, artists, loading } = usePhotos();

  const handleImageClick = (image) => {
    navigate(`/details/${image.id}`, { state: image });
  };

  if (loading) {
    return <Loader/>;
  }

  return (
    <div className="h-[100svh] overflow-y-hidden">
      <Navbar />
      <ImageCarousel 
        images={images} 
        onImageClick={handleImageClick}
      />
      <div className="overflow-hidden hidden lg:flex">
        <ul className="flex gap-10 text-black py-4 animate-infinite-scroll">
          {[...artists, ...artists, ...artists].map((artist, index) => (
            <li 
              key={`${artist.id}-artist-${index}`} 
              className="flex gap-2 items-center text-[1.3vw] whitespace-nowrap"
            >
              <p className="text-black font-mono">{artist.artist || ""}</p>
            </li>
          ))}
        </ul>
      </div>
      <FloatingButton />
    </div>
  );
};

export default Photos;