import React from 'react';
import { motion } from 'framer-motion';
import { FaSync } from 'react-icons/fa';

const ComingSoon = ({ title, message, icon }) => {
  // Default values if props are not provided
  const defaultTitle = 'Coming Soon';
  const defaultMessage = 'This feature is currently under development';
  const IconComponent = icon || FaSync;

  return (
    <div className="flex h-[60vh] flex-col items-center justify-center py-10 bg-white rounded-xl shadow-sm p-6">
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="text-center"
      >
        <div className="inline-block p-4 mb-4 text-blue-600 bg-blue-100 rounded-full">
          <IconComponent className="w-8 h-8" />
        </div>
        <h4 className="mb-2 text-xl font-bold text-gray-800">{title || defaultTitle}</h4>
        <p className="text-gray-500">
          {message || defaultMessage}
        </p>
      </motion.div>
    </div>
  );
};

export default ComingSoon;