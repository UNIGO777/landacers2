import React from 'react'
import { motion } from 'framer-motion'
import { FiUpload } from 'react-icons/fi'

const SellerConfirmation = () => {
  return (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col justify-center items-center h-screen bg-gray-50"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-6xl text-blue-500 mb-4"
        >
          <FiUpload />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-bold text-gray-800 mb-2 text-center"
        >
          Confirming Seller Status
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-gray-600 text-center"
        >
          Please wait while we verify your seller credentials...
        </motion.p>
      </motion.div>
  )
}

export default SellerConfirmation