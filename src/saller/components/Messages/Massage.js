import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Massage = ({ message, type = 'success', duration = 3000, redirect }) => {
  const Icon = type === 'success' ? CheckCircle : XCircle;
  const iconColor = type === 'success' ? 'text-blue-500' : 'text-red-500';
  const progressBarColor = type === 'success' ? 'bg-blue-500' : 'bg-red-500';
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      if (redirect) {
        navigate(redirect);
      }
    }, duration);
  }, [duration, redirect]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center shadow-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <Icon className={`w-20 h-20 ${iconColor} mx-auto mb-6`} />
        </motion.div>
        
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-800 mb-4"
        >
          {type === 'success' ? 'Success!' : 'Error!'}
        </motion.h2>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-8"
        >
          {message}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: duration / 1000, ease: "linear" }}
          className={`h-1 ${progressBarColor} origin-left`}
        />
      </motion.div>
    </motion.div>
  );
};

export default Massage;
