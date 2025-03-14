import React from 'react'
import { motion } from 'framer-motion'

const ProcessLoader = ({ message = "Processing...", subMessage = "Please wait while we process your request" }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-white backdrop-blur-lg p-8 rounded-2xl shadow-xl flex flex-col items-center"
      >
        <div className="relative w-20 h-20">
          <motion.div 
            className="absolute w-full h-full border-4 border-blue-600 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute w-full h-full border-4 border-transparent border-t-blue-400 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <motion.p 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-800 text-lg font-medium mt-4"
        >
          {message}
        </motion.p>
        <motion.p 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 text-sm mt-2"
        >
          {subMessage}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

export default ProcessLoader
