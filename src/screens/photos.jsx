import React, { useState, useEffect, useRef } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/navbar.jsx";
import FloatingButton from "../components/foatingButton.jsx";

const Photos = () => {
    const [images, setImages] = useState([]);
    const carouselRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const speed = 10;
    const navigate = useNavigate();

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

    useEffect(() => {
        const fetchImages = async () => {
            const unsubscribe = onSnapshot(collection(db, "Photography"), (snapshot) => {
                const fetchedImages = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setImages(fetchedImages);
            });
            return () => unsubscribe();
        };

        fetchImages();
    }, []);

    const handleImageClick = (image) => {
        navigate(`/details/${image.id}`, { state: image });
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
                        {[...images, ...images, ...images, ...images].map((image, index) => (
                            <div
                                key={`${image.id}-${index}`}
                                className="flex flex-col min-w-80 px-10 font-montserrat pb-14 hover:scale-125 hover:transition-all"
                                onClick={() => handleImageClick(image)}
                            >
                                <img
                                    src={image.url}
                                    alt={image.title || `Carrusel ${index}`}
                                    className="w-auto object-cover transition-transform transform pt-14"
                                />
                                <div className="flex flex-row items-center justify-between">
                                    <p className="text-xl">{image.title || "Sin título"}</p>
                                    <p className="text-xs font-mono">{image.date || "Fecha no disponible"}</p>
                                </div>
                                <p>{image.artist || ""}</p>
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



/*
import React, { useState, useEffect, useRef } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";

import Navbar from "../components/navbar.jsx";

const Photos = () => {
    const artists = [
        { name: "Artista 1" },
        { name: "Artista 2" },
        { name: "Artista 3" },
        { name: "Artista 4" },
        { name: "Artista 5" },
        { name: "Artista 6" },
        { name: "Artista 1" },
        { name: "Artista 2" },
        { name: "Artista 3" },
        { name: "Artista 4" },
        { name: "Artista 5" },
        { name: "Artista 6" },
    ];

    const [images, setImages] = useState([]);
    const carouselRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const speed = 10;

    useEffect(() => {
        const fetchImages = async () => {
        try {
            const imagesRef = ref(storage, "images/");
            const res = await listAll(imagesRef);
            const urls = await Promise.all(res.items.map((item) => getDownloadURL(item)));
            setImages(urls);
        } catch (error) {
            console.error("Error al obtener imágenes:", error.message);
        }};

        fetchImages();
    }, []);

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
            }};
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
            <div className="flex flex-row justify-center space-x-4"
            >
                {[...images, ...images, ...images, ...images].map((image, index) => (
                <div
                    key={index}
                    className="flex flex-col min-w-80 px-10 font-montserrat pb-14 hover:scale-125 hover:transition-all"
                >
                    <img
                    src={image}
                    alt={`Carrusel ${index}`}
                    className="w-auto object-cover transition-transform transform pt-14"
                    />
                    <div className="flex flex-row items-center justify-between">
                    <p className="text-xl">TITLE PROJECT</p>
                    <p className="text-xs font-mono">10.5.24</p>
                    </div>
                    <p>Artist name</p>
                </div>
                ))}
            </div>
            </div>
        </div>

        <div className="overflow-hidden flex">
            <ul className="flex gap-10 text-black py-4 animate-infinite-scroll">
                {[...artists, ...artists, ...artists].map((artist) => {
                return (
                    <li className="flex gap-2 items-center min-w-24"><p className="text-black font-mono">{artist.name}</p></li>
                )
                })}
            </ul>
        </div>
        </>
    );
};

export default Photos;

*/