import FloatingButton from "../components/foatingButton";
import NavbarDark from "../components/navbarDark";

import img from "../assets/Jacko-about.png";
import instagramLogo from "../assets/InstagramLogo.png";
import emailLogo from "../assets/EnvelopeSimple.png";
import whatsappLogo from "../assets/WhatsappLogo.png"

const About = () => {
    return (
        <div className="min-h-screen bg-[#0b0b0b]">
            <NavbarDark/>
            <div className="p-8 flex flex-col justify-between overflow-y-hidden min-h-[90vh] md:p-16 lg:flex-row lg:items-center lg:mt-[-40px] xl:p-20">
                <div className="font-montserrat text-xl text-[#CACACA] font-semibold md:text-3xl lg:pl-10 lg:text-2xl lg:w-[40vw] lg:flex lg:flex-col lg:justify-between xl:text-3xl">
                    <div>
                        <h2 className="lg:w-[30vw] font-extrabold text-white md:text-3xl lg:text-2xl xl:text-3xl">JACKÖ RENZA</h2>
                        <div className="font-montserrat text-[#CACACA] font-light text-sm md:text-xl lg:text-base xl:text-xl">
                            <p className="pt-2">Is a creative director and photographer with over four years of experience, specializing in transforming ideas into visual pieces that evoke emotion and deeply connect with audiences.</p>
                            <p>Known for his attention to detail and narrative structure, he strives to lead meaningful projects that deliver tangible results for his clients.</p>
                            <p className="pt-5">Every frame he creates serves a clear purpose: to tell stories that resonate and endure.</p>
                        </div>
                        <div className="lg:flex lg:w-10 lg:h-px lg:bg-[#CACACA] lg:mt-3 hidden"></div>
                    </div>
                    
                    <div className="hidden lg:flex lg:mt-10 lg:justify-between">
                        <div>
                            <h4 className="lg:text-sm lg:mb-2 xl:text-base">CONTACT</h4>
                            <ul className="text-xs font-light xl:text-sm">
                                <li>
                                    <a href="mailto:chocolatttear@gmail.com" className="flex items-center gap-2 hover:underline"><img className="h-4" src={emailLogo}/><span>Email</span></a>
                                </li>
                                <li>
                                    <a href="https://wa.me/17864918037" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline"><img className="h-4" src={whatsappLogo}/><span>WhatsApp</span></a>
                                </li>
                            </ul>
                        </div>
                        <div className="lg:mr-10 xl:mr-14">
                            <h4 className="lg:text-sm lg:mb-2 xl:text-base">FOLLOW</h4>
                            <ul className="lg:text-xs lg:font-light xl:text-sm">
                                <li>
                                    <a href="https://www.instagram.com/chocolatttear/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                                    <img className="h-4" src={instagramLogo}/>
                                    <span>Instagram</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col">
                            <p className=" font-montserrat pb-2 text-sm font-light">Chocolatttear Ⓡ</p>
                        </div>
                    </div>
                    
                </div>
                <div className="w-10 h-[1px] bg-[#CACACA] mt-4 mb-8 lg:hidden"></div>
                <div className="flex flex-col items-center lg:pr-5 lg:pt-10">
                    <img className="h-[500px]" src={img}/>
                    <h3 className="font-extralight font-montserrat text-white text-sm text-center mt-5 md:text-3xl lg:text-sm lg:w-[30vw] xl:text-base">Creative Director, Photographer & Visual Storyteller.</h3>
                </div>

                <div className="flex flex-row justify-between mt-10 mb-4 mr-4 lg:hidden">
                    <div className="flex flex-col font-montserrat placeholder-blue-100">
                        <h4 className="text-white font-semibold pb-2 md:text-2xl">CONTACT</h4>
                        <ul className="text-[#CACACA] text-xs font-light md:text-xl">
                            <li>
                                <a href="mailto:chocolatttear@gmail.com" className="flex items-center gap-2 hover:underline">
                                <img className="h-4" src={emailLogo}/>
                                <span>Email</span></a>
                            </li>
                            <li>
                                <a href="https://wa.me/17864918037" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2  hover:underline">
                                <img className="h-4" src={whatsappLogo}/><span>WhatsApp</span></a>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col font-montserrat">
                        <h4 className="text-white font-semibold pb-2 md:text-2xl">FOLLOW</h4>
                        <ul className="text-[#CACACA] text-xs font-light md:text-xl">
                            <li>
                                <a href="https://www.instagram.com/chocolatttear/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline"><img className="h-4" src={instagramLogo}/><span>Instagram</span></a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col pb-16">
                        <p className="text-white font-montserrat pb-2 text-sm font-light">Chocolatttear Ⓡ</p>
                    </div>
                </div>
            </div>
            <FloatingButton/>
        </div>
    )
}

export default About;