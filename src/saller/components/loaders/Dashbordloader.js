import React from "react";
import { motion } from "framer-motion";


const DashboardLoader = () => {
  const shimmerAnimation = {
    initial: { backgroundPosition: "-200% 0" },
    animate: {
      backgroundPosition: "200% 0",
      transition: { repeat: Infinity, duration: 1.5, ease: "linear" },
    },
  };

  const cardVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
      <div className="mb-8 space-y-4">
        <motion.div
          className="h-8 bg-gray-200 rounded w-64"
          variants={shimmerAnimation}
        />
        <motion.div
          className="h-4 bg-gray-200 rounded w-96"
          variants={shimmerAnimation}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 mb-8 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <motion.div
            key={item}
            variants={cardVariants}
            className="group p-6 bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                className="h-12 w-12 rounded-xl bg-gray-200"
                variants={shimmerAnimation}
              />
              <div className="space-y-2 flex-1">
                <motion.div
                  className="h-4 bg-gray-200 rounded w-3/4"
                  variants={shimmerAnimation}
                />
                <motion.div
                  className="h-6 bg-gray-200 rounded w-1/2"
                  variants={shimmerAnimation}
                />
              </div>
            </div>
            <motion.div
              className="h-3 bg-gray-200 rounded w-5/6"
              variants={shimmerAnimation}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={cardVariants}
        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <motion.div
              className="h-6 bg-gray-200 rounded w-48"
              variants={shimmerAnimation}
            />
            <motion.div
              className="h-4 bg-gray-200 rounded w-64"
              variants={shimmerAnimation}
            />
          </div>
          <motion.div
            className="h-10 bg-gray-200 rounded-lg w-32"
            variants={shimmerAnimation}
          />
        </div>
        <motion.div
          className="h-96 bg-gray-200 rounded-xl"
          variants={shimmerAnimation}
        />
      </motion.div>
    </div>
    
  );
};

export default DashboardLoader;
