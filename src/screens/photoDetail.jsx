import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';
import { OptimizedMainImage, OptimizedCollageImage } from '../components/OptimizedMainImage';

const PhotoDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const [mainImage, setMainImage] = useState(location.state || null);
    const [collageImages, setCollageImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loadedImages, setLoadedImages] = useState({});

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
        const fetchImageAndCollage = async () => {
            try {
                let currentImage = mainImage;
                if (!currentImage) {
                    const docRef = doc(db, "Photography", id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        currentImage = { id: docSnap.id, ...docSnap.data() };
                        setMainImage(currentImage);
                    }
                }

                if (currentImage) {
                    await preloadImage(currentImage.url);
                    
                    const collageRef = collection(db, "Photography", id, "collage");
                    const collageSnap = await getDocs(collageRef);
                    const collageData = collageSnap.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setCollageImages(collageData);

                    // Precargar las primeras imágenes del collage
                    for (const image of collageData.slice(0, 2)) {
                        await preloadImage(image.url);
                    }

                    // Precargar el resto de imágenes después
                    setTimeout(() => {
                        collageData.slice(2).forEach(image => {
                            preloadImage(image.url);
                        });
                    }, 10);
                }

                setLoading(false);
            } catch (error) {
                console.error("Error fetching image and collage:", error);
                setLoading(false);
            }
        };

        fetchImageAndCollage();
    }, [id, mainImage]);

    if (!mainImage) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl">Image not found</p>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 py-8 font-montserrat"
            >
                <OptimizedMainImage 
                    image={mainImage}
                    isLoaded={loadedImages[mainImage.url]}
                />

                <motion.div
                    className="max-w-4xl mx-auto mb-12"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h1 className="text-3xl font-bold mb-2">{mainImage.title || "Sin título"}</h1>
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-xl">{mainImage.artist || ""}</p>
                        <p className="text-gray-600 font-mono">{mainImage.date || ""}</p>
                    </div>
                    {mainImage.description && (
                        <p className="text-gray-700 mt-4">{mainImage.description}</p>
                    )}
                </motion.div>

                {collageImages.length > 0 && (
                    <motion.div
                        className="max-w-4xl mx-auto"
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {collageImages.map((image, index) => (
                                <OptimizedCollageImage
                                    key={image.id}
                                    image={image}
                                    index={index}
                                    isLoaded={loadedImages[image.url]}
                                    onClick={() => setSelectedImage(image)}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}

                {selectedImage && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                        onClick={() => setSelectedImage(null)}
                    >
                        <div
                            className="relative max-w-4xl w-full mx-4"
                            onClick={e => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage.url}
                                alt="Imagen ampliada"
                                className="max-w-screen max-h-screen w-full h-auto object-contain p-5"
                            />
                        </div>
                    </div>
                )}
            </motion.div>
        </>
    );
};

export default PhotoDetails;