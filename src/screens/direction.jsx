import React, { useState, useEffect, useRef } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/navbar.jsx";
import FloatingButton from "../components/foatingButton.jsx";

const Photos = () => {
    const [items, setItems] = useState([]);
    const carouselRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const speed = 10;
    const navigate = useNavigate();

    const artists = [
        { id: 1, artist: "Soucream" },
        { id: 2, artist: "JackÖ" },
        { id: 3, artist: "SMOKEGSS" },
        { id: 4, artist: "MJ Nebreda" },
        { id: 5, artist: "Chigua" }      
    ];

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
                <div
                    className="relative overflow-hidden w-screen group"
                    ref={carouselRef}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="flex flex-row justify-center space-x-4">
                        {[...items, ...items, ...items, ...items].map((item, index) => (
                            <div
                                key={`${item.id}-${index}`}
                                className="flex flex-col min-w-80 px-10 font-montserrat pb-14 hover:scale-125 hover:transition-all"
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
                                    className="w-auto object-cover transition-transform transform pt-14"
                                />
                                <div className="flex flex-row items-center justify-between">
                                    <p className="text-xl">{item.title || "Sin título"}</p>
                                    <p className="text-xs font-mono">{item.date || "Fecha no disponible"}</p>
                                </div>
                                <p>{item.artist || "Artista desconocido"}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="overflow-hidden flex">
                <ul className="flex gap-10 text-black py-4 animate-infinite-scroll">
                {[...artists, ...artists, ...artists].map((artist, index) => (
                <li key={`${artist.id}-artist-${index}`} className="flex gap-2 items-center min-w-24">
                    <p className="text-black font-mono">{artist.artist || "Artista desconocido"}</p>
                </li>
                ))}
                </ul>
            </div>
            <FloatingButton/>
        </>
    );
};

export default Photos;
