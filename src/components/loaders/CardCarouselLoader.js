import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ContentLoader = () => {
  const [itemsToShow, setItemsToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2); // Mid-screen: 2 cards
      } else {
        setItemsToShow(4); // Large screens: 4 cards
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {[1, 2, 3, 4].slice(0, itemsToShow).map((item) => (
        <motion.div
          key={item}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          className="bg-white rounded-lg overflow-hidden"
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
      ))}
    </div>
  );
};

export default ContentLoader;
