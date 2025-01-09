import React, { useState, useEffect, useRef, useCallback } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Navbar from "../components/navbar.jsx";
import FloatingButton from "../components/foatingButton.jsx";

const Photos = () => {
    const [items, setItems] = useState([]);
    const [loadedImages, setLoadedImages] = useState({});
    const navigate = useNavigate();

    const carouselRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const speed = 10;
    const scrollAmount = 300;
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeout = useRef(null);

    const artists = [
        { id: 1, artist: "Soucream" },
        { id: 2, artist: "JackÖ" },
        { id: 3, artist: "SMOKEGSS" },
        { id: 4, artist: "MJ Nebreda" },
        { id: 5, artist: "Chigua" }      
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
        const fetchItems = async () => {
            const unsubscribe = onSnapshot(collection(db, "Direction"), (snapshot) => {
                const fetchedItems = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setItems(fetchedItems);
            });
            return () => unsubscribe();
        };

        fetchItems();
    }, []);

    const handleItemClick = (item) => {
        if (item.videoUrl) {
            window.open(item.videoUrl, "_blank");
        } else {
            navigate(`/details/${item.id}`, { state: item });
        }
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
            <div className="h-[83vh] w-screen flex items-center">
                {/* Botón izquierdo */}
                <button 
                    onClick={scrollLeft}
                    className="absolute left-4 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                
                <div
                    className="relative overflow-hidden w-screen group"
                    ref={carouselRef}
                >
                    <div className="flex flex-row justify-center space-x-4 items-center"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}>
                        {[...items, ...items, ...items, ...items].map((item, index) => (
                            <div
                                key={`${item.id}-${index}`}
                                className="flex flex-col min-w-[400px] px-10 font-montserrat mb-14 mt-10 hover:scale-125 hover:transition-all"
                                onClick={() => handleItemClick(item)}
                            >
                                <img
                                    src={
                                        item.videoUrl
                                            ? `https://img.youtube.com/vi/${new URL(item.videoUrl).searchParams.get(
                                                    "v"
                                                )}/0.jpg`
                                            : item.url
                                    }
                                    alt={item.title || `Carrusel ${index}`}
                                    className="w-auto object-cover transition-transform transform"
                                />
                                <div className="flex flex-row items-center justify-between">
                                    <p className="text-xl">{item.title || ""}</p>
                                    <p className="text-xs font-mono">{item.date || ""}</p>
                                </div>
                                <p>{item.artist || ""}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Botón derecho */}
                <button 
                    onClick={scrollRight}
                    className="absolute right-4 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
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
