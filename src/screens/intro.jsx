import videoSrc from "../assets/video-demo.mp4";
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/loader.jsx';
import useWindowHeight from '../components/functions/calcWindowHeight.jsx'

const VideoIntro = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const windowHeight = useWindowHeight();
    const navigate = useNavigate();

    const updateDateTime = () => {
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        });
        const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
            setTime(formattedTime);
            setDate(formattedDate);
    };

    useEffect(() => {
        updateDateTime();
        const intervalId = setInterval(updateDateTime, 60000);
        return () => clearInterval(intervalId);
    }, []);

    const handlePlay = () => {
        videoRef.current.play();
        setIsPlaying(true);
    };

    const handleStop = () => {
        videoRef.current.pause();
        setIsPlaying(false);
    };

    const handleRedirect = () => {
        setIsLoading(true);
        setTimeout(() => {
        navigate('/home');
        }, 2000);
    };

    return (
        <div className="relative">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <video
                        ref={videoRef}
                        className="object-cover"
                        style={{ height: `${windowHeight}px`, width: '100%' }}
                        autoPlay
                        loop
                        muted
                        playsInline
                        onClick={handleRedirect}
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                    <div className="flex justify-center lg:justify-start lg:ml-5 xl:ml-8">
                        <div className="mt-[-155px] grid grid-rows-4 grid-cols-2 border border-black bg-white w-72 h-32">
                            <p className="col-span-2 flex items-center justify-center font-custom text-sm border-solid border-black border-b cursor-pointer xl:text-lg"> CHOCOLATTTEAR.MP4 </p>
                            <p className="col-span-2 flex items-center justify-center font-custom text-sm border-solid border-black border-b xl:text-lg"> Photography & Direction </p>
                            <button
                                onClick={handleStop}
                                className={`font-custom border-solid border-black border-b border-e text-sm xl:text-lg z-50 ${!isPlaying ? 'opacity-50' : ''}`}
                                disabled={!isPlaying}
                            >Stop</button>
                            <div className="flex items-center justify-center font-custom text-sm border-solid border-black border-b xl:text-lg">{date}</div>
                            <button
                            onClick={handlePlay}
                            className={`font-custom border-solid border-black border-e text-sm xl:text-lg z-50 ${isPlaying ? 'opacity-50' : ''}`}
                            disabled={isPlaying}
                            > Play</button>
                            <div className="flex items-center justify-center font-custom text-sm xl:text-lg">{time}</div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default VideoIntro;