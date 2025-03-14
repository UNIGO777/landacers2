import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiBell } from 'react-icons/fi';

const SubscriptionComingSoon = () => {
  return (
    <div className=" bg-gray-50 flex items-center justify-center p-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-[80vh] w-full flex flex-col justify-center bg-white rounded-2xl  p-8 text-center"
      >
        <div className="mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <FiClock className="w-8 h-8 text-blue-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Subscription Coming Soon!</h2>
          <p className="text-gray-600 mb-6">
            We're working hard to bring you an amazing subscription experience. Stay tuned for updates!
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FiBell className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-800">Automatic Notifications Enabled</span>
          </div>
          <p className="text-sm text-blue-700">
            You're all set! We'll automatically notify you when our subscription service launches with exclusive offers and features.
          </p>
        </div>

        <div className="text-sm text-gray-500">
          Thank you for your patience as we prepare something special for you!
        </div>
      </motion.div>
    </div>
  );
};

export default SubscriptionComingSoon;