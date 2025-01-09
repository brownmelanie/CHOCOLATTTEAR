import React, { useState, useEffect, useRef, useCallback } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Navbar from "../components/navbar.jsx";
import FloatingButton from "../components/foatingButton.jsx";

const Photos = () => {
    const [images, setImages] = useState([]);
    const [loadedImages, setLoadedImages] = useState({});
    const navigate = useNavigate();

    const carouselRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const speed = 10;
    const scrollAmount = 300;
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeout = useRef(null);

    const artists = [
        { id: 1, artist: "Gini" },
        { id: 2, artist: "Anacri" },
        { id: 3, artist: "Jowel&Randy" },
        { id: 4, artist: "Soucream" },
        { id: 5, artist: "Boscan" },
        { id: 6, artist: "Anuel" },
        { id: 7, artist: "Ozuna"},
        { id: 8, artist: "Deivi"},
        { id: 9, artist: "Poli"},
        { id: 10, artist: "Lil Supa"},
        { id: 11, artist: "Llanes"},
        { id: 12, artist: "Lunay"},
        { id: 13, artist: "SMOKEGSS"},
        { id: 14, artist: "MJ Nebrada"},
        { id: 15, artist: "Akapellah"},
        { id: 16, artist: "Ovi"}        
    ];

    const preloadImage = (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                setLoadedImages(prev => ({...prev, [url]: true}));
                resolve(url);
            };
            img.onerror = reject;
            img.src = url;
        });
    };

    useEffect(() => {
        const fetchImages = async () => {
            const unsubscribe = onSnapshot(collection(db, "Photography"), (snapshot) => {
                const fetchedImages = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setImages(fetchedImages);

                fetchedImages.slice(0, 4).forEach(image => {
                    preloadImage(image.url);
                });

                setTimeout(() => {
                    fetchedImages.slice(4).forEach(image => {
                        preloadImage(image.url);
                    });
                }, 1000);
            });
            return () => unsubscribe();
        };

        fetchImages();
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
            carouselElement.addEventListener('wheel', handleScroll);
        }
        return () => {
            if (carouselElement) {
                carouselElement.removeEventListener('wheel', handleScroll);
            }
        };
    }, [handleScroll]);
    
    const handleTouch = useCallback((e) => {
        if (carouselRef.current) {
            setIsScrolling(true);
            setIsPaused(true);
        }
    }, []);

    const handleTouchEnd = useCallback(() => {
        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
        }
        
        scrollTimeout.current = setTimeout(() => {
            setIsScrolling(false);
            setIsPaused(false);
        }, 500);
    }, []);

    useEffect(() => {
        const carouselElement = carouselRef.current;
    
        if (carouselElement) {
            carouselElement.addEventListener('wheel', handleScroll, { passive: false });
            carouselElement.addEventListener('touchstart', handleTouch);
            carouselElement.addEventListener('touchend', handleTouchEnd);
        }
    
        return () => {
            if (carouselElement) {
                carouselElement.removeEventListener('wheel', handleScroll, { passive: false });
                carouselElement.removeEventListener('touchstart', handleTouch);
                carouselElement.removeEventListener('touchend', handleTouchEnd);
            }
        };
    }, [ handleTouch, handleTouchEnd]);

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
        <>
            <Navbar />
            <div className="h-[83vh] w-screen flex items-center relative">
                {/* Botón izquierdo */}
                <button 
                    onClick={scrollLeft}
                    className="absolute left-4 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <div
                    className="relative overflow-hidden w-screen group"
                    ref={carouselRef}
                    onWheel={handleScroll}
                >
                    <div className="flex flex-row justify-center space-x-4 items-center"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}>
                        {[...images, ...images, ...images, ...images].map((image, index) => (
                            <div
                                key={`${image.id}-${index}`}
                                className="flex flex-col min-w-[400px] px-10 font-montserrat pb-12 pt-12 hover:scale-125 hover:transition-all"
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
                    className="absolute right-4 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                    aria-label="Scroll right"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            <div className="overflow-hidden flex">
                <ul className="flex gap-10 text-black py-4 animate-infinite-scroll">
                    {[...artists, ...artists, ...artists].map((artist, index) => (
                        <li key={`${artist.id}-artist-${index}`} className="flex gap-2 items-center min-w-24">
                            <p className="text-black font-mono">{artist.artist || ""}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <FloatingButton/>
        </>
    );
};

export default Photos;