import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CardLoader = () => {
  

  const cardVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  const shimmerAnimation = {
    initial: { backgroundPosition: "-200% 0" },
    animate: {
      backgroundPosition: "200% 0",
      transition: { repeat: Infinity, duration: 1.5, ease: "linear" },
    },
  };

  return (
   
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          className="bg-white rounded-lg overflow-hidden w-full"
        >
          <motion.div
            className="h-48 bg-gray-200 relative overflow-hidden"
            variants={shimmerAnimation}
            style={{
              background: `linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)`,
              backgroundSize: "400% 100%",
            }}
          />

          <div className="p-4 space-y-3">
            <motion.div
              className="h-4 bg-gray-200 rounded w-3/4"
              variants={shimmerAnimation}
            />
            <motion.div
              className="h-4 bg-gray-200 rounded w-1/2"
              variants={shimmerAnimation}
            />
            <div className="space-y-2">
              <motion.div
                className="h-3 bg-gray-200 rounded w-full"
                variants={shimmerAnimation}
              />
              <motion.div
                className="h-3 bg-gray-200 rounded w-5/6"
                variants={shimmerAnimation}
              />
            </div>
          </div>
        </motion.div>
      
  );
};

export default CardLoader;
