import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import homeIcon from '../assets/icon-logo.png'
import closeIcon from "../assets/menu-close-dark.png"
import burguerIcon from "../assets/menu-icon-white.png"
import wpIcon from "../assets/wp-icon-dark.png"
import igIcon from "../assets/ig-icon-dark.png"
import emailIcon from "../assets/email-icon-dark.png"

const NavbarDark = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div>
        <div className='bg-[#0b0b0b] flex justify-between items-center px-4 h-16 lg:px-8 lg:pt-5'>
            <button
            onClick={() => handleNavigation('/home')}
            className="bg-white rounded-full py-2 px-4 lg:px-8 lg:cursor-pointer"
            >
            <img src={homeIcon} alt="Home" className="h-5 w-auto" />
            </button>

            <button
            onClick={toggleMenu}
            className= {`lg:hidden z-40 bg-transparent rounded-full border-solid border-2 w-16 h-9 flex items-center justify-center ${isMenuOpen ? 'border-[#181818]' : 'border-white'}`}
            >
            <img 
                src={isMenuOpen ? closeIcon : burguerIcon}
                alt={isMenuOpen ? 'Close Menu' : 'Open Menu'}
                className={`h-6 w-6 transition-all duration-300 ease-in-out ${isMenuOpen ? 'p-1' : ''}` }
            />
            </button>

            <div className='hidden lg:block lg:border-2 lg:border-solid lg:border-white lg:rounded-full lg:font-custom'>
            <ul className='lg:flex lg:flex-row lg:gap-[16px] lg:items-center lg:text-[1vw] whitespace-nowrap text-white'>
                {[
                { label: 'HOME', route: '/home' },
                { label: 'PHOTOS', route: '/photos' },
                { label: 'DIRECTION', route: '/direction' },
                { label: 'ABOUT ME', route: '/about' },
                { label: 'PRINTS', route: '/' },
                { label: 'MERCHㅤ', route: '/merch' }
                ].map((item, index) => (
                <li 
                key={index}
                className={` ${
                    isActive(item.route)
                    ? 'bg-white text-[#252525] py-[4px] rounded-3xl px-5 text-center lg:border-2 lg:border-solid lg:border-white'
                    : 'px-6 mr-[-14px] py-[5px]'
                }`}
                >
                <Link to={item.route}>{item.label}</Link>
                </li>
                ))}
            </ul>
            </div>
        </div>
        

        <div
            className={`fixed top-0 right-0 h-full w-4/5 bg-white text-[#252525] transition-transform transform z-30 ${
            isMenuOpen ? 'translate-x-0 transition-transform transform' : 'translate-x-full transition-transform transform'
            } z-30`}
        >
            <ul className="flex flex-col items-start pt-20 p-8 space-y-6 text-xl font-custom text-[#252525]">
            <li className="cursor-pointer relative group" onClick={() => handleNavigation('/photos')}>
                PHOTOS
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#252525] transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="cursor-pointer relative group" onClick={() => handleNavigation('/direction')}>
                DIRECTION
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#252525] transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="cursor-pointer relative group" onClick={() => handleNavigation('/about')}>
                ABOUT ME
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#252525] transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="cursor-pointer relative group" onClick={() => handleNavigation('/')}>
                PRINTS
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#252525] transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="cursor-pointer relative group" onClick={() => handleNavigation('/merch')}>
                MERCH
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#252525] transition-all duration-300 group-hover:w-full"></span>
            </li>
            </ul>

            <div className="absolute bottom-6 left-6 flex space-x-4 text-2xl">
            <a href="https://wa.me/17864918037" target="_blank" rel="noopener noreferrer">
                <img src={wpIcon} alt="WhatsApp Icon" className='w-9 h-9'/>
            </a>
            <a href="mailto:chocolatttear@gmail.com" target="_blank" rel="noopener noreferrer">
                <img src={emailIcon} alt="Email Icon" className='w-9 h-9' />
            </a>
            <a href="https://www.instagram.com/chocolatttear/" target="_blank" rel="noopener noreferrer">
                <img src={igIcon} alt="Instagram Icon" className='w-9 h-9' />
            </a>
            </div>
        </div>

        {isMenuOpen && (
            <div
            className="fixed inset-0 bg-[#252525] opacity-50 z-20 w-screen h-screen"
            onClick={toggleMenu}
            ></div>
        )}
        </div>
    );
};

export default NavbarDark;