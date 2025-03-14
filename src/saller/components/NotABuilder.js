import React from 'react'
import { FaLock } from 'react-icons/fa'
import { motion } from 'framer-motion'


const NotABuilder = () => {
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
          className="text-6xl text-red-600 mb-4"
        >
          <FaLock/>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-bold text-gray-800 mb-2 text-center"
        >
          Builder Access Only
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-gray-600 text-center"
        >
          This page is restricted to builders only. Please change your seller type to builder for access.
        </motion.p>
      </motion.div>
  )
}

export default NotABuilder