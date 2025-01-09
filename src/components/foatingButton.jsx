import React from 'react';

const FloatingButton = () => {
    const handleClick = () => {
        window.open('https://form.jotform.com/243605408327051', '_blank');
    };

    return (
        <button
        onClick={handleClick}
        className="fixed bottom-16 right-6 md:bottom-14 md:right-8 
                    bg-gray-950 border-2 border-solid border-white hover:bg-zinc-800 
                    text-white font-medium
                    rounded-full shadow-lg 
                    w-12 h-12 md:w-14 md:h-14
                    flex items-center justify-center
                    transition-all duration-300 
                    hover:scale-110
                    z-20"
        aria-label="Contact Form"
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-6 h-6 md:w-7 md:h-7"
            >
                <path 
                    d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"
                />
            </svg>
        </button>
    );
};

export default FloatingButton;