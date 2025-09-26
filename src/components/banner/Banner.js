import React, { useState, useEffect } from 'react';
import HomeSearchBox from '../SearchBox/HomeSearchBox';
import poster from '../../Assets/poster.png';

function Banner() {

    const images = [
        "https://images.unsplash.com/photo-1707623988408-ab88c9981730?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1649441246954-388fb49cced9?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true);
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                setFade(false);
            }, 500);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className='md:min-h-[90vh] lg:min-h-[60vh] flex items-center'>
            <div className="mx-auto w-full">
                <div className="flex flex-col w-full px-4 md:px-8 lg:px-10 items-center">
                    {/* Left Side - Hero Content */}
                    <div className="h-auto md:h-auto  w-full mb-6  md:mb-10 flex flex-col lg:flex-row justify-between">
                        <h1 className="text-3xl md:text-5xl md:-mt-4 lg:text-[4rem] xl:text-[5rem] mb-4 md:mb-0 edu-nsw-act-cursive text-gray-800" style={{lineHeight: '1.2'}}>
                            Find a home you'll <span className="italic font-light text-xl md:text-2xl">love</span>
                        </h1>
                        <p className="text-base md:text-lg text-gray-600 mb-10 mt-5 lg:-mt-5 w-full md:max-w-full lg:max-w-xl xl:max-w-2xl leading-relaxed italic">
                            Discover your perfect home with our extensive property listings. Whether you're looking for a cozy apartment, a spacious family house, or a luxury estate, we have the perfect property waiting for you. Our expert team is here to guide you through every step of your home-buying journey.
                        </p>
                    </div>
                    <div className='flex gap-5 flex-col lg:flex-row w-full -mt-4 md:-mt-10'>
                        <div className="flex-1">
                            {/* Hero Text */}

                            {/* Search Box */}
                            <div className="w-full">
                                <HomeSearchBox />
                            </div>

                            {/* Bottom Text */}
                            <div className="mt-4 md:mt-6">
                                <p className="text-base md:text-lg text-gray-600">
                                    We've got properties for everyone
                                </p>
                            </div>
                        </div>

                        {/* Right Side - Advertisement Banner */}
                        <div className="flex-shrink-0 w-full  lg:w-[15vw]  xl:w-96 mt-4 md:mt-0 lg:-mt-10">
                            <img className=" min-w-full h-full rounded-2xl p-4  text-white relative overflow-hidden object-contain" src={poster}>
                                {/* Background Pattern */}
                              

                                {/* Content */}
                               
                            </img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
