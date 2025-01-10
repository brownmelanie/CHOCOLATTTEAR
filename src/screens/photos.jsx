import React, { useState, useEffect, useRef, useCallback } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Navbar from "../components/navbar.jsx";
import FloatingButton from "../components/foatingButton.jsx";

const Photos = () => {
    const [images, setImages] = useState([]);
    const [artists, setArtists] = useState([]);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const navigate = useNavigate();

    const carouselRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const speed = 10;
    const scrollAmount = 300;
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeout = useRef(null);

    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX);
        setIsPaused(true);
    };

    const handleTouchMove = (e) => {
        if (!touchStart) return;
    
        const currentTouch = e.touches[0].clientX;
        const diff = (touchStart - currentTouch) / 2;
    
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: diff,
            });
            setTouchStart(currentTouch);
        }
    };

    const handleTouchEnd = () => {
        setTouchStart(null);
        setTouchEnd(null);
        setIsPaused(false);
    };

    useEffect(() => {
        const unsubscribeImages = onSnapshot(collection(db, "Photography"), (snapshot) => {
            const fetchedImages = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setImages(fetchedImages);
        });

        const unsubscribeArtists = onSnapshot(collection(db, "ArtistsPhotography"), (snapshot) => {
            const fetchedArtists = snapshot.docs.map((doc) => ({
                id: doc.id,
                artist: doc.data().name
            }));
            setArtists(fetchedArtists);
        });

        return () => {
            unsubscribeImages();
            unsubscribeArtists();
        };
    }, []);


    const handleImageClick = (image) => {
        navigate(`/details/${image.id}`, { state: image });
    };

    const scrollLeft = () => {
        if (carouselRef.current) {
            setIsScrolling(true);
            setIsPaused(true);
            
            carouselRef.current.scrollTo({
                left: carouselRef.current.scrollLeft - scrollAmount,
                behavior: 'smooth'
            });

            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
            
            scrollTimeout.current = setTimeout(() => {
                setIsScrolling(false);
                setIsPaused(false);
            }, 500);
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            setIsScrolling(true);
            setIsPaused(true);
            
            carouselRef.current.scrollTo({
                left: carouselRef.current.scrollLeft + scrollAmount,
                behavior: 'smooth'
            });

            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
            
            scrollTimeout.current = setTimeout(() => {
                setIsScrolling(false);
                setIsPaused(false);
            }, 500);
        }
    };

    // Manejador para el scroll con el mouse/touch
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

    useEffect(() => {
        const carouselElement = carouselRef.current;
        if (carouselElement) {
            carouselElement.addEventListener('wheel', handleScroll, { passive: false });
            carouselElement.addEventListener('touchstart', handleTouchStart);
            carouselElement.addEventListener('touchmove', handleTouchMove, { passive: false });
            carouselElement.addEventListener('touchend', handleTouchEnd);
        }
        return () => {
            if (carouselElement) {
                carouselElement.removeEventListener('wheel', handleScroll, { passive: false });
                carouselElement.removeEventListener('touchstart', handleTouchStart);
                carouselElement.removeEventListener('touchmove', handleTouchMove);
                carouselElement.removeEventListener('touchend', handleTouchEnd);
            }
        };
    }, [handleScroll, handleTouchStart, handleTouchMove, handleTouchEnd]);

    useEffect(() => {
        const carouselElement = carouselRef.current;
    
        if (carouselElement) {
            carouselElement.addEventListener('wheel', handleScroll, { passive: false });
            carouselElement.addEventListener('touchstart', handleTouchStart);
            carouselElement.addEventListener('touchend', handleTouchEnd);
        }
    
        return () => {
            if (carouselElement) {
                carouselElement.removeEventListener('wheel', handleScroll, { passive: false });
                carouselElement.removeEventListener('touchstart', handleTouchStart);
                carouselElement.removeEventListener('touchend', handleTouchEnd);
            }
        };
    }, [ handleTouchStart, handleTouchEnd]);

    useEffect(() => {
        let interval;
        if (!isPaused && carouselRef.current) {
            const scroll = () => {
                carouselRef.current.scrollLeft += 1;
                if (
                    carouselRef.current.scrollLeft >=
                    carouselRef.current.scrollWidth - carouselRef.current.clientWidth
                ) {
                    carouselRef.current.scrollLeft = 0;
                }
            };
            interval = setInterval(scroll, speed);
        }

        return () => clearInterval(interval);
    }, [isPaused]);

    return (
        <div className="h-[100svh] overflow-y-hidden ">
            <Navbar />
            <div className="h-[80vh] lg:h-[83vh] w-screen flex items-center">
                {/* Botón izquierdo */}
                <button 
                    onClick={scrollLeft}
                    className="absolute left:1 lg:left-4 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors z-50 block"
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-2 h-2 lg:w-6 lg:h-6" />
                </button>

                <div
                    className="relative overflow-hidden w-screen group"
                    ref={carouselRef}
                    onWheel={handleScroll}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="flex flex-row justify-center space-x-4 items-center"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}>
                        {[...images, ...images, ...images, ...images].map((image, index) => (
                            <div
                                key={`${image.id}-${index}`}
                                className="flex flex-col min-w-[400px] px-10 font-montserrat pb-12 pt-12 lg:hover:scale-125 hover:transition-all"
                                onClick={() => handleImageClick(image)}
                            >
                                <img
                                    src={image.url}
                                    alt={image.title || `Carrusel ${index}`}
                                    className="w-auto object-cover transition-transform transform max-h-[400px]"
                                    draggable="false"
                                />
                                <div className="flex flex-row items-center justify-between">
                                    <p className="text-xl">{image.title || ""}</p>
                                    <p className="text-xs font-mono">{image.date || ""}</p>
                                </div>
                                <p>{image.artist || ""}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Botón derecho */}
                <button 
                    onClick={scrollRight}
                    className="absolute right-1 lg:right-4 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors block"
                    aria-label="Scroll right"
                >
                    <ChevronRight className="w-2 h-2 lg:w-6 lg:h-6" />
                </button>
            </div>

            <div className="overflow-hidden hidden lg:flex">
                <ul className="flex gap-10 text-black py-4 animate-infinite-scroll">
                    {[...artists, ...artists, ...artists].map((artist, index) => (
                        <li key={`${artist.id}-artist-${index}`} className="flex gap-2 items-center text-[1.3vw] whitespace-nowrap">
                            <p className="text-black font-mono">{artist.artist || ""}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <FloatingButton/>
        </div>
    );
};

export default Photos;