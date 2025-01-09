import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Navbar from '../components/navbar';
import { motion } from 'framer-motion';
import Loader from '../components/loader';

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
                }

                if (currentImage) {
                    const collageRef = collection(db, "Photography", id, "collage");
                    const collageSnap = await getDocs(collageRef);
                    const collageData = collageSnap.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setCollageImages(collageData);

                    collageData.slice(0, 2).forEach(image => {
                        preloadImage(image.url);
                    });

                    setTimeout(() => {
                        collageData.slice(2).forEach(image => {
                            preloadImage(image.url);
                        });
                    }, 1000);
                }

                setLoading(false);
            } catch (error) {
                console.error("Error fetching image and collage:", error);
                setLoading(false);
            }
        };

        fetchImageAndCollage();
    }, [id, mainImage]);

    const closeModal = () => setSelectedImage(null);

    if (loading) {
        return (
            <Loader/>
        );
    }

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
        >
            
            <div className="container mx-auto px-4 py-8 font-montserrat">
                <motion.div
                    className="max-w-4xl mx-auto mb-8"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {!loadedImages[mainImage?.url] && (
                        <div className="w-full h-[70vh] animate-pulse bg-gray-200" />
                    )}
                    <img
                        src={mainImage.url}
                        alt={mainImage.title}
                        className={`w-full max-h-screen object-cover shadow-lg transition-opacity duration-300 ${
                            loadedImages[mainImage?.url] ? 'opacity-100' : 'opacity-0'
                        }`}
                        loading="eager"
                    />
                </motion.div>

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
                        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                            {collageImages.map((image, index) => (
                                <motion.div
                                    key={image.id}
                                    className="group cursor-pointer"
                                    onClick={() => setSelectedImage(image)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                >
                                    {!loadedImages[image.url] && (
                                        <div className={`w-full animate-pulse bg-gray-200 ${
                                            index % 2 === 0 ? 'aspect-w-4 aspect-h-3' : 'aspect-w-3 aspect-h-4'
                                        }`} />
                                    )}
                                    <div
                                        className={`overflow-hidden ${index % 2 === 0 ? 'aspect-w-4 aspect-h-3' : 'aspect-w-3 aspect-h-4'}`}
                                    >
                                        <img
                                            src={image.url}
                                            alt={`${mainImage.title} - ${index + 1}`}
                                            className={`w-full h-full object-cover transition-opacity duration-300 ${
                                                loadedImages[image.url] ? 'opacity-100' : 'opacity-0'
                                            }`}
                                            loading="lazy"
                                            onLoad={() => setLoadedImages(prev => ({...prev, [image.url]: true}))}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>

            {selectedImage && (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                onClick={closeModal}
            >
                <div
                    className="rounded shadow-lg max-w-lg w-full relative"
                    onClick={(e) => e.stopPropagation()}
                >
                <img
                    src={selectedImage.url}
                    alt="Imagen ampliada"
                    className="w-full h-auto object-contain"
                />
            </div>
    </div>
)}

        </motion.div>
        </>
    );
    
};

export default PhotoDetails;
