import { useState, useEffect } from "react";
import "../components/animations/blinkText.css";

const ScrollText = () => {
    const texts = ["PHOTOGRAPHER", "DIRECTOR", "VISUAL STORYTELLER"];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [texts.length]);

    return (
        <>
            <div className="overflow-hidden pt-2 lg:hidden">
                <div className="flex space-x-16 animate-loop-scroll-second">
                    <p className="font-jost font-bold text-5xl ml-[-15px] text-[#252525]">
                    CHOCÖLATTTEARCHOCÖLATTTEARCHOCÖLATTTEARCHOCÖLATTTEAR
        </p>
        </div>
        <div className="flex space-x-16 animate-loop-scroll-third">
        <p className="font-jost font-bold text-5xl ml-[-15px] text-[#252525]">
            ÖLATTTEARCHOCÖLATTTEARCHOCÖLATTTEARCHOCÖLATTTEARCHOC
        </p>
        </div>
        <div className="flex space-x-16 animate-loop-scroll-second">
        <p className="font-jost font-bold text-5xl ml-[-32px] text-[#252525]">
            OCÖLATTTEARCHOCÖLATTTEARCHOCÖLATTTEARCHOCÖLATTTEARCH
        </p>
        </div>
        <div className="flex space-x-16 animate-loop-scroll">
        <p className="font-jost font-bold text-5xl ml-[-3px] text-[#252525]">
            HOCÖLATTTEARCHOCÖLATTTEARCHOCÖLATTTEARCHOCÖLATTTEARC
        </p>
        </div>
        <div className="flex space-x-16 animate-loop-scroll-third">
        <p className="font-jost font-bold text-5xl ml-[-8px] text-[#252525]">
            CHOCÖLATTTEARCHOCÖLATTTEARCHOCÖLATTTEARCHOCÖLATTTEAR
        </p>
        </div>
        <div className="flex space-x-16 animate-loop-scroll-second">
        <p className="font-jost font-bold text-5xl ml-[-15px] text-[#252525]">
            ÖLATTTEARCHOCÖLATTTEARCHOCÖLATTTEARCHOCÖLATTTEARCHOC
        </p>
        </div>
        <div className="flex space-x-16 animate-loop-scroll">
        <p className="font-jost font-bold text-5xl ml-[-30px] text-[#252525]">
            OCÖLATTTEARCHOCÖLATTTEARCHOCÖLATTTEARCHOCÖLATTTEARCH
        </p>
        </div>
        <div className="flex space-x-16 animate-loop-scroll-second">
        <p className="font-jost font-bold text-5xl ml-[-15px] text-[#252525]">
            HOCÖLATTTEARCHOCÖLATTTEARCHOCÖLATTTEARCHOCÖLATTTEARC
        </p>
        </div>
        <div className="flex space-x-16 animate-loop-scroll-third">
        <p className="font-jost font-bold text-5xl ml-[-15px] text-[#252525]">
            CHOCÖLATTTEARCHOCÖLATTTEARCHOCÖLATTTEARCHOCÖLATTTEAR
        </p>
        </div>
        <div className="flex space-x-16 animate-loop-scroll">
        <p className="font-jost font-bold text-5xl ml-[-15px] text-[#252525]">
            ÖLATTTEARCHOCÖLATTTEARCHOCÖLATTTEARCHOCÖLATTTEARCHOC
        </p>
        </div>
        <div className="flex space-x-16 animate-loop-scroll-second">
        <p className="font-jost font-bold text-5xl ml-[-30px] text-[#252525]">
            OCÖLATTTEARCHOCÖLATTTEARCHOCÖLATTTEARCHOCÖLATTTEARCH
        </p>
        </div>
        <div className="flex space-x-16 animate-loop-scroll-third">
        <p className="font-jost font-bold text-5xl ml-[-15px] text-[#252525]">
            HOCÖLATTTEARCHOCÖLATTTEARCHOCÖLATTTEARCHOCÖLATTTEARC
        </p>
        </div>
        <div className="flex space-x-16 animate-loop-scroll-second">
        <p className="font-jost font-bold text-5xl ml-[-15px] text-[#252525]">
            CHOCÖLATTTEARCHOCÖLATTTEARCHOCÖLATTTEARCHOCÖLATTTEAR
        </p>
        </div>
        </div>
        <div className="hidden lg:font-jost lg:text-[#252525] lg:flex lg:flex-col lg:items-center lg:justify-center lg:h-[80vh]">
            <div>
            <div className="lg:flex lg:flex-col lg:items-end">
                <h2 className="lg:text-[7rem] xl:text-[9rem] font-bold leading-3 mr-36 xl:mr-48">CHOCÖLATTE</h2>
                <h2 className="lg:text-[7rem] xl:text-[9rem] font-bold mr-[-10px]">TEAR</h2>
            </div>
            
            <p className="text-2xl font-light mt-[-85px] xl:mt-[-100px] ml-60 blink_me">
                {texts[currentIndex]}
            </p>
            </div> 
        </div>
        </>
    );
};

export default ScrollText;