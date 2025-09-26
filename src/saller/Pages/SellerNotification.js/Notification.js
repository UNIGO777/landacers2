import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../../Layout';
import { toast } from 'react-toastify';
import axios from 'axios';
import markAllNotificationsRead from '../../Requests/MarkNotificationReaded';

const SellerNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isMarkingAsRead, setIsMarkingAsRead] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    fetchNotifications(currentPage);
  }, [currentPage]);

  const fetchNotifications = async (page) => {
    try {
      setIsLoadingMore(true);
      const response = await axios.get(
        `https://api.landacre.in/api/notifications?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('sellerToken')}`,
          },
        }
      );
      
      if (page === 1) {
        setNotifications(response.data.data.notifications);
      } else {
        setNotifications(prev => [...prev, ...response.data.data.notifications]);
      }
      
      setTotalPages(response.data.data.pagination.totalPages);
    } catch (error) {
      toast.error('Failed to fetch notifications');
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages && !isLoadingMore) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      setIsMarkingAsRead(true);
      await markAllNotificationsRead();
      setNotifications(prev =>
        prev.map(notification => ({
          ...notification,
          isRead: true
        }))
      );
      toast.success('All notifications marked as read');
    } catch (error) {
      toast.error(error.message || 'Failed to mark notifications as read');
    } finally {
      setIsMarkingAsRead(false);
    }
  };

  const renderPagination = () => {
    return (
      <div className="flex justify-center mt-6">
        {currentPage < totalPages && (
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoadingMore ? (
              <div className="flex items-center">
                <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </div>
            ) : (
              'Load More'
            )}
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <button
            onClick={handleMarkAllAsRead}
            disabled={isMarkingAsRead || notifications.every(n => n.isRead)}
            className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg transition-colors ${
              isMarkingAsRead || notifications.every(n => n.isRead)
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-blue-700'
            }`}
          >
            {isMarkingAsRead ? (
              <div className="flex items-center">
                <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Marking as Read...
              </div>
            ) : (
              'Mark All as Read'
            )}
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-4 bg-white rounded-lg shadow-sm border ${!notification.isRead ? 'border-l-4 border-l-blue-500' : 'border-gray-100'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className={`text-sm ${!notification.isRead ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                      {notification.message}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {new Date(notification.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </motion.div>
            ))}
            {renderPagination()}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <svg
              className="w-16 h-16 text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <p className="text-lg text-gray-500">No notifications yet</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SellerNotification;