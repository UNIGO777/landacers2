import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CardLoader = () => {
  // Optimized animation variants
  const cardVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  // Optimized shimmer animation with reduced complexity
  const shimmerAnimation = {
    initial: { backgroundPosition: "-200% 0" },
    animate: {
      backgroundPosition: "200% 0",
      transition: { repeat: Infinity, duration: 2, ease: "linear" },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      className="bg-white rounded-lg overflow-hidden w-full"
    >
      {/* Using will-change for hardware acceleration */}
      <motion.div
        className="h-48 bg-gray-200 relative overflow-hidden"
        variants={shimmerAnimation}
        style={{
          background: `linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)`,
          backgroundSize: "400% 100%",
          willChange: "background-position",
        }}
      />

      <div className="p-4 space-y-3">
        {/* Using a single motion.div with multiple elements to reduce animation instances */}
        <motion.div
          className="space-y-3 w-full"
          variants={shimmerAnimation}
          style={{ willChange: "background-position" }}
        >
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CardLoader;
