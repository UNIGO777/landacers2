import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import { useProperty, useUI } from '../Hooks/index.js';
import { generateSearchURL } from '../utils/urlGenerator.js';
import { useNavigate } from 'react-router-dom';

const PropertiesAcrossIndia = ({ loading = false }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(loading);
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoSlideRef = useRef(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  // Use custom hooks
  const { isMobile, setIsMobile } = useUI();
  const cityLocations = [
    {
      id: 1,
      name: 'Delhi',
      city: 'Delhi',
      bgImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      gradient: 'from-black/10 to-black/30',
      avgPrice: '₹85 Lakh',
      link: generateSearchURL('FlatApartment', 'Buy', 'Delhi', 'Delhi')
    },
    {
      id: 2,
      name: 'Mumbai',
      city: 'Mumbai',
      bgImage: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      gradient: 'from-black/10 to-black/30',
      avgPrice: '₹1.2 Crore',
      link: generateSearchURL('FlatApartment', 'Buy', 'Mumbai', 'Maharashtra')
    },
    {
      id: 3,
      name: 'Bangalore',
      city: 'Bangalore',
      bgImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      gradient: 'from-black/10 to-black/30',
      avgPrice: '₹75 Lakh',
      link: generateSearchURL('FlatApartment', 'Buy', 'Bangalore', 'Karnataka')
    },
    {
      id: 4,
      name: 'Hyderabad',
      city: 'Hyderabad',
      bgImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      gradient: 'from-black/10 to-black/30',
      avgPrice: '₹65 Lakh',
      link: generateSearchURL('FlatApartment', 'Buy', 'Hyderabad', 'Telangana')
    },
    {
      id: 5,
      name: 'Chennai',
      city: 'Chennai',
      bgImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      gradient: 'from-black/10 to-black/30',
      avgPrice: '₹70 Lakh',
      link: generateSearchURL('FlatApartment', 'Buy', 'Chennai', 'Tamil Nadu')
    },
    {
      id: 6,
      name: 'Pune',
      city: 'Pune',
      bgImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      gradient: 'from-black/10 to-black/30',
      avgPrice: '₹60 Lakh',
      link: generateSearchURL('FlatApartment', 'Buy', 'Pune', 'Maharashtra')
    },
    {
      id: 7,
      name: 'Kolkata',
      city: 'Kolkata',
      bgImage: 'https://images.unsplash.com/photo-1558431382-27e303142255?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      gradient: 'from-black/10 to-black/30',
      avgPrice: '₹45 Lakh',
      link: generateSearchURL('FlatApartment', 'Buy', 'Kolkata', 'West Bengal')
    },
    {
      id: 8,
      name: 'Ahmedabad',
      city: 'Ahmedabad',
      bgImage: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      gradient: 'from-black/10 to-black/30',
      avgPrice: '₹50 Lakh',
      link: generateSearchURL('FlatApartment', 'Buy', 'Ahmedabad', 'Gujarat')
    },
    {
      id: 9,
      name: 'Agra',
      city: 'Agra',
      bgImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2352&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      gradient: 'from-black/10 to-black/30',
      avgPrice: '₹50 Lakh',
      link: generateSearchURL('FlatApartment', 'Buy', 'Agra', 'Uttar Pradesh')
    }
  ]

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [setIsMobile]);

  useEffect(() => {
    if (isMobile && !isLoading) {
      autoSlideRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % cityLocations.length);
      }, 3000);
    }
    
    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [isMobile, isLoading]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % cityLocations.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + cityLocations.length) % cityLocations.length);
  };

  // Touch handlers for swipe functionality
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // cityLocations now comes from the Zustand store

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 15
      }
    },
    hover: { 
      scale: 1.05,
      y: -5,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  const LoaderCard = () => (
    <div className="relative h-64 rounded-2xl overflow-hidden bg-gray-200 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20"></div>
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <div className="w-20 h-8 bg-white/30 rounded animate-pulse"></div>
            <div className="w-32 h-4 bg-white/20 rounded animate-pulse"></div>
          </div>
          <div className="w-12 h-12 bg-white/30 rounded-full animate-pulse"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-16 h-8 bg-white/30 rounded animate-pulse"></div>
          <div className="w-8 h-8 bg-white/30 rounded-full animate-pulse"></div>
        </div>
      </div>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </div>
  );

  return (
    <div className="pt-8 ">
      <div className="px-5 md:px-10  mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-start mb-5 md:mb-8"
        >
           <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 ">Explore Properties Across India</h2>
          <p className="text-gray-600  mx-auto edu-nsw-act-cursive">Explore our curated collection of exclusive properties spanning across India's prime locations</p>
        </motion.div>

        {/* Desktop Grid */}
        <motion.div 
          className="hidden md:grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
              >
                <LoaderCard />
              </motion.div>
            ))
          ) : (
            cityLocations.map((city) => (
              <motion.div
                key={city.id}
                className="relative h-64 rounded-xl overflow-hidden cursor-pointer group"
                variants={cardVariants}
                whileHover="hover"
                onClick={() => navigate(city.link)}
                style={{
                  backgroundImage: `url(${city.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${city.gradient} group-hover:opacity-90 transition-opacity duration-300`}></div>
                
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="w-5 h-5" />
                    <span className="text-xl font-semibold edu-nsw-act-cursive">{city.city}</span>
                  </div>
                  
                  <motion.div 
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div>
                      <motion.p 
                        className="text-md opacity-90"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        Starting from {city.avgPrice}
                      </motion.p>
                    </div>
                    <motion.div
                      className="p-2 bg-white/20 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300"
                      whileHover={{ scale: 1.2, x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <FaArrowRight className="w-4 h-4" />
                    </motion.div>
                  </motion.div>
                </div>
                
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div 
            className="overflow-hidden rounded-xl"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <motion.div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {isLoading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-2">
                    <LoaderCard />
                  </div>
                ))
              ) : (
                cityLocations.map((city) => (
                  <motion.div
                    key={city.id}
                    className="w-full flex-shrink-0 px-2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      className="relative h-64 rounded-xl overflow-hidden cursor-pointer group"
                      onClick={() => navigate(city.link)}
                      style={{
                        backgroundImage: `url(${city.bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${city.gradient} group-hover:opacity-90 transition-opacity duration-300`}></div>
                      
                      <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                        <div className="flex items-center space-x-2">
                          <FaMapMarkerAlt className="w-5 h-5" />
                          <span className="text-xl font-semibold">{city.city}</span>
                        </div>
                        
                        <motion.div 
                          className="flex items-center justify-between"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <div>
                            <motion.p 
                              className="text-md opacity-90"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 }}
                            >
                              Starting from {city.avgPrice}
                            </motion.p>
                          </div>
                          <motion.div
                            className="p-2 bg-white/20 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300"
                            whileHover={{ scale: 1.2, x: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <FaArrowRight className="w-4 h-4" />
                          </motion.div>
                        </motion.div>
                      </div>
                      
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>



          {/* Dots Indicator */}
          {!isLoading && (
            <div className="flex justify-center mt-4 space-x-2">
              {cityLocations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default PropertiesAcrossIndia;