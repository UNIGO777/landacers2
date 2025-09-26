import React from "react";
import { motion } from "framer-motion";

const QueryDetailLoader = () => {
  const shimmerAnimation = {
    initial: { backgroundPosition: "-200% 0" },
    animate: {
      backgroundPosition: "200% 0",
      transition: { repeat: Infinity, duration: 1.5, ease: "linear" },
    },
  };

  return (
    <div className="w-full max-h-[80%] max-w-2xl p-6 bg-white rounded-lg">
      {/* Title */}
      <motion.div
        className="h-8 bg-gray-200 rounded w-3/4 mb-4"
        variants={shimmerAnimation}
      />

      {/* Description */}
      <motion.div
        className="h-20 bg-gray-200 rounded w-full mb-4"
        variants={shimmerAnimation}
      />

      {/* Grid Layout */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Status */}
        <div>
          <motion.div
            className="h-4 bg-gray-200 rounded w-20 mb-2"
            variants={shimmerAnimation}
          />
          <motion.div
            className="h-6 bg-gray-200 rounded-full w-24"
            variants={shimmerAnimation}
          />
        </div>

        {/* Priority */}
        <div>
          <motion.div
            className="h-4 bg-gray-200 rounded w-20 mb-2"
            variants={shimmerAnimation}
          />
          <motion.div
            className="h-6 bg-gray-200 rounded w-24"
            variants={shimmerAnimation}
          />
        </div>

        {/* Created At */}
        <div>
          <motion.div
            className="h-4 bg-gray-200 rounded w-24 mb-2"
            variants={shimmerAnimation}
          />
          <motion.div
            className="h-6 bg-gray-200 rounded w-32"
            variants={shimmerAnimation}
          />
        </div>

        {/* Messages Section */}
        <div className="col-span-2 mt-4">
          <motion.div
            className="h-4 bg-gray-200 rounded w-24 mb-4"
            variants={shimmerAnimation}
          />
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              className="h-16 bg-gray-200 rounded w-full mb-2"
              variants={shimmerAnimation}
            />
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default QueryDetailLoader;