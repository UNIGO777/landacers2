import React from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiHome } from 'react-icons/fi';

const PropertyProfileLoader = () => {
  const shimmerAnimation = {
    initial: { backgroundPosition: "-200% 0" },
    animate: {
      backgroundPosition: "200% 0",
      transition: { repeat: Infinity, duration: 1.5, ease: "linear" },
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Image Section Loader */}
      <div className="relative h-[70vh] bg-gray-900">
        <motion.div
          className="w-full h-full bg-gray-800"
          variants={shimmerAnimation}
          initial="initial"
          animate="animate"
          style={{
            background: `linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%)`,
            backgroundSize: "400% 100%",
          }}
        />
        
        {/* Overlay Content Loader */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 flex flex-col justify-end p-8 md:p-16">
          <div className="container mx-auto">
            <div className="max-w-4xl">
              <motion.div
                className="w-32 h-8 bg-white/20 rounded-full mb-4"
                variants={shimmerAnimation}
              />
              <motion.div
                className="h-12 bg-white/20 rounded-lg w-3/4 mb-4"
                variants={shimmerAnimation}
              />
              <div className="flex items-center text-white/90 mb-2">
                <FiMapPin className="w-5 h-5 mr-2 opacity-50" />
                <motion.div
                  className="h-6 bg-white/20 rounded w-1/2"
                  variants={shimmerAnimation}
                />
              </div>
              <div className="flex flex-wrap items-center gap-6 mt-6">
                <motion.div
                  className="w-48 h-12 bg-white/10 rounded-lg"
                  variants={shimmerAnimation}
                />
                <div className="flex gap-4">
                  <motion.div
                    className="w-32 h-10 bg-white/10 rounded-lg"
                    variants={shimmerAnimation}
                  />
                  <motion.div
                    className="w-32 h-10 bg-white/10 rounded-lg"
                    variants={shimmerAnimation}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnails Loader */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <motion.div
                key={index}
                className="h-16 w-24 bg-gray-200 rounded-md flex-shrink-0"
                variants={shimmerAnimation}
                initial="initial"
                animate="animate"
                style={{
                  background: `linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)`,
                  backgroundSize: "400% 100%",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Loader */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 mt-12">
        <div className="md:col-span-2 space-y-8">
          <div className="border-b pb-6">
            <div className="flex items-center justify-between mb-6">
              <motion.div
                className="h-8 bg-gray-200 rounded w-2/3"
                variants={shimmerAnimation}
              />
              <motion.div
                className="h-8 bg-gray-200 rounded w-32"
                variants={shimmerAnimation}
              />
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((column) => (
                <div key={column} className="space-y-4">
                  {[1, 2, 3].map((row) => (
                    <div key={`${column}-${row}`} className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full mr-3" />
                      <motion.div
                        className="h-6 bg-gray-200 rounded w-3/4"
                        variants={shimmerAnimation}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Description Section Loader */}
          <div className="space-y-4">
            <motion.div
              className="h-6 bg-gray-200 rounded w-48"
              variants={shimmerAnimation}
            />
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="h-4 bg-gray-200 rounded w-full"
                variants={shimmerAnimation}
              />
            ))}
          </div>
        </div>

        {/* Sidebar Loader */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <motion.div
              className="h-6 bg-gray-200 rounded w-32 mb-4"
              variants={shimmerAnimation}
            />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div className="flex-1">
                    <motion.div
                      className="h-4 bg-gray-200 rounded w-3/4 mb-2"
                      variants={shimmerAnimation}
                    />
                    <motion.div
                      className="h-3 bg-gray-200 rounded w-1/2"
                      variants={shimmerAnimation}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyProfileLoader;