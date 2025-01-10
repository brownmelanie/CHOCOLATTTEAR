import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from "../components/navbar";
import Loader from '../components/loader';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Prints = () => {
    const [prints, setPrints] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [slideDirection, setSlideDirection] = useState('right');

    useEffect(() => {
        const fetchPrints = async () => {
            try {
                const printsCollection = collection(db, 'Prints');
                const printsSnapshot = await getDocs(printsCollection);
                const printsList = printsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPrints(printsList);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching prints:", error);
                setLoading(false);
            }
        };

        fetchPrints();
    }, []);

    const handleTransition = (direction, newIndex) => {
        setIsTransitioning(true);
        setSlideDirection(direction);
        
        setTimeout(() => {
            setCurrentIndex(newIndex);
            setIsTransitioning(false);
        }, 400);
    };

    const handlePrevious = () => {
        const newIndex = currentIndex === 0 ? prints.length - 1 : currentIndex - 1;
        handleTransition('left', newIndex);
    };

    const handleNext = () => {
        const newIndex = currentIndex === prints.length - 1 ? 0 : currentIndex + 1;
        handleTransition('right', newIndex);
    };

    if (loading) {
        return (
            <Loader />
        );
    }

    const currentPrint = prints[currentIndex];

    return (
        <>
            <div className="h-[100svh]">
                <Navbar />
                <div className="flex flex-col px-10 justify-center items-center w-screen h-[90svh] relative">
                    {/* Botones de navegación */}
                    <button 
                        onClick={handlePrevious}
                        className="absolute left-4 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button 
                        onClick={handleNext}
                        className="absolute right-4 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors"
                    >
                        <ChevronRight size={24} />
                    </button>

                    <div className="relative w-full flex justify-center items-center">
                        <div
                            className={`
                                transform transition-all duration-300 ease-in-out
                                ${isTransitioning ? 'opacity-0' : 'opacity-100'}
                            `}
                        >
                            <img
                                className="max-w-[500px] max-h-[75vh] rounded-sm shadow-md"
                                src={currentPrint.url}
                                alt={currentPrint.title}
                            />
                            <h3 className="font-montserrat font-semibold text-3xl pt-2 uppercase text-center">
                                {currentPrint.title}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center">
                <div className="w-[55%] h-[1px] bg-black mb-10"></div>
            </div>

            <div className="flex flex-col px-10 w-screen font-montserrat">
                <h4 className="font-semibold text-xl uppercase">
                    {currentPrint.camera}
                </h4>
                <p className="pt-3 text-lg">{currentPrint.date}</p>
                <p className="text-lg">{currentPrint.location}</p>
                <p className="pt-5 pb-20">{currentPrint.description}</p>
            </div>
        </>
    );
}

export default Prints;