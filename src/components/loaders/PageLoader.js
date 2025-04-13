import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../../media/LandsAcers Icon LOGO.png';

const PageLoader = () => {
  const [loadingText, setLoadingText] = useState('');
  const fullText = 'LAND Acre';
  
  // Typewriter effect for the text
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setLoadingText(fullText.substring(0, currentIndex + 1));
      currentIndex++;
      
      if (currentIndex === fullText.length) {
        setTimeout(() => {
          currentIndex = 0;
          setLoadingText('');
        }, 1000);
      }
    }, 200);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-white to-blue-50 flex flex-col items-center justify-center z-50">
      <div className="relative mb-6">
        {/* Outer glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-200 filter blur-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Logo container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <img src={logo} alt="Land Acre Logo" className="w-28 h-28 object-contain" />
        </motion.div>
        
        {/* Primary spinner */}
        <motion.div 
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-600"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Secondary spinner (opposite direction) */}
        <motion.div 
          className="absolute inset-2 rounded-full border-4 border-transparent border-b-blue-400 border-l-blue-400"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Animated text section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center"
      >
        {/* Typewriter text effect */}
        <motion.div 
          className="h-8 mb-4"
          initial={{ y: 10 }}
          animate={{ y: 0 }}
        >
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            {loadingText}<span className="animate-pulse">|</span>
          </h3>
        </motion.div>
        
        {/* Status text */}
        <p className="text-gray-600 mb-4 text-sm font-medium">Loading your premium real estate experience</p>
        
        {/* Animated dots */}
        <div className="flex justify-center mt-2 space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="h-3 w-3 bg-blue-600 rounded-full"
            />
          ))}
        </div>
        
        {/* Progress bar */}
        <div className="flex justify-center">
          <motion.div 
            className="w-48 h-1 bg-gray-200 rounded-full mt-6 overflow-hidden"
          >
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PageLoader;