import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaBuilding, FaUserTie, FaQuestionCircle, FaCheck } from 'react-icons/fa'
import axios from 'axios'
import { toast } from 'react-toastify'
import ADMIN_API_ROUTES from '../AdminRequestPath'

const Notifications = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const [markingAsRead, setMarkingAsRead] = useState(false)
  
  useEffect(() => {
    if (isOpen) {
      fetchNotifications()
    }
  }, [isOpen])
  
  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('adminToken')
      const response = await axios.get(
        `${ADMIN_API_ROUTES.GET_NOTIFICATIONS}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      
      if (response.data && response.data.data.notifications) {

        setNotifications(response.data.data.notifications)
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
      toast.error('Failed to load notifications')
    } finally {
      setLoading(false)
    }
  }
  
  const handleMarkAllAsRead = async () => {
    try {
      setMarkingAsRead(true)
      const token = localStorage.getItem('adminToken')
      await axios.put(
        `${ADMIN_API_ROUTES.MARK_ALL_NOTIFICATIONS_READ}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      
      // Update local state to mark all as read
      setNotifications(prevNotifications => 
        prevNotifications.map(notification => ({
          ...notification,
          isRead: true
        }))
      )
      
      toast.success('All notifications marked as read')
    } catch (error) {
      console.error('Error marking notifications as read:', error)
      toast.error('Failed to mark notifications as read')
    } finally {
      setMarkingAsRead(false)
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case 'property':
        return <FaBuilding className="w-6 h-6 text-blue-500" />
      case 'broker':
        return <FaUserTie className="w-6 h-6 text-green-500" />
      case 'query':
        return <FaQuestionCircle className="w-6 h-6 text-yellow-500" />
      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
            >
              <FaTimes className="w-5 h-5" />
            </button>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
              <button
                onClick={handleMarkAllAsRead}
                disabled={markingAsRead || notifications.length === 0}
                className={`flex items-center px-3 py-1 text-sm font-medium rounded-md ${markingAsRead ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                <FaCheck className="mr-1" />
                {markingAsRead ? 'Marking...' : 'Mark All Read'}
              </button>
            </div>
            <div className="space-y-4 overflow-y-auto max-h-[60vh]">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : notifications.length > 0 ? (
                notifications.map((notification) => (
                  <motion.div
                    key={notification._id || notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start p-3 space-x-3 rounded-lg ${notification.isRead ? 'bg-gray-100' : 'bg-blue-50 border-l-4 border-blue-500'}`}
                  >
                    {getIcon(notification.type)}
                    <div className="flex-1">
                      <p className={`text-sm ${notification.isRead ? 'text-gray-800' : 'text-gray-900 font-medium'}`}>{notification.message}</p>
                      <p className="mt-1 text-xs text-gray-500">
                        {notification.createdAt 
                          ? new Date(notification.createdAt).toLocaleString() 
                          : notification.time}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No notifications found</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Notifications