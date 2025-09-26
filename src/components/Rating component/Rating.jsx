import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiStar, FiUser, FiCalendar, FiMessageSquare } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Rating = ({ setLoginOpen }) => {
  // State for feedback form
  const [feedbackFormData, setFeedbackFormData] = useState({
    rating: 5,
    comment: ''
  });
  
  // State for feedback list and UI states
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [feedbackPage, setFeedbackPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Get server URL from environment variables
  const serverUrl = process.env.REACT_APP_backendUrl;

  // Fetch existing feedbacks when component mounts
  useEffect(() => {
    fetchFeedbacks();
  }, [feedbackPage]);


  // Lock/unlock body scroll when showForm changes
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [showForm]);

  // Fetch feedbacks from the server
  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${serverUrl}/api/feedback/landacers?page=${feedbackPage}`);
      
      if (response.data && response.data.data) {
        setFeedbacks(response.data.data.results || []);
        setTotalPages(response.data.data.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedbackFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle rating change
  const handleRatingChange = (rating) => {
    setFeedbackFormData(prev => ({
      ...prev,
      rating
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      toast.info('Please login to submit feedback');
      setLoginOpen(true); // Open login form
      return;
    }

    // Validate form
    if (!feedbackFormData.comment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    try {
      setSubmitting(true);
      
      const response = await axios.post(
        `${serverUrl}/api/feedback`,
        {
          feedbackType: 'website',
          rating: feedbackFormData.rating,
          comment: feedbackFormData.comment
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success('Feedback submitted successfully!');
      
      // Reset form
      setFeedbackFormData({
        rating: 5,
        comment: ''
      });
      
      setShowForm(false);
      
      // Update feedbacks list without page reload
      const newFeedback = response.data.data;
      setFeedbacks(prevFeedbacks => [
        ...(Array.isArray(newFeedback) ? newFeedback : [newFeedback]),
        ...prevFeedbacks
      ]);
      
      // Refresh feedbacks
      fetchFeedbacks();
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error(error.response?.data?.message || 'Failed to submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setFeedbackPage(newPage);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Render star rating (interactive)
  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <motion.button
          key={i}
          type="button"
          whileHover={{ scale: 1.2, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleRatingChange(i)}
          className={`${i <= feedbackFormData.rating ? 'text-yellow-400' : 'text-gray-300'} focus:outline-none transition-colors duration-200`}
        >
          <FiStar className="w-8 h-8 fill-current drop-shadow-sm" />
        </motion.button>
      );
    }
    return stars;
  };

  // Render static star rating (for display only)
  const renderStaticStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        >
          <FiStar
            className={`w-4 h-4 ${i <= rating ? 'text-white fill-current' : 'text-white/50'} drop-shadow-sm`}
          />
        </motion.div>
      );
    }
    return stars;
  };

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/30 grid grid-cols-1 md:grid-cols-3 gap-10 to-purple-50/20 rounded-3xl border border-gray-100/50 p-8 px-10 mx-auto backdrop-blur-sm">
      <div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <FiStar className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-3">
            Customer Feedback
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            We value your opinion! Share your experience and help us create an even better platform for everyone.
          </p>
        </motion.div>

        {/* Feedback Form Toggle Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(true)}
          className="mb-10 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 hover:from-blue-700 hover:via-blue-800 hover:to-purple-800 text-white font-semibold py-4 px-8 rounded-2xl flex items-center justify-center mx-auto transition-all duration-300 group"
        >
          <FiStar className="mr-3 group-hover:rotate-12 transition-transform duration-300" size={20} />
          <span className="text-lg">Write a Review</span>
        </motion.button>
      

      {/* Feedback Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center  z-50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                      <FiMessageSquare className="text-white" size={20} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Share Your Experience</h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowForm(false)}
                    className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700">Your Rating</label>
                    <div className="flex items-center justify-between bg-gray-50/50 p-4 rounded-2xl border border-gray-200/50">
                      <div className="flex items-center space-x-1">
                        {renderStarRating(feedbackFormData.rating)}
                      </div>
                      <div className="flex items-center bg-white px-4 py-2 rounded-xl border border-gray-200">
                        <span className="text-lg font-bold text-gray-800">{feedbackFormData.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">/5</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="comment" className="block text-sm font-semibold text-gray-700">Your Comment</label>
                    <div className="relative">
                      <textarea
                        id="comment"
                        name="comment"
                        rows="5"
                        value={feedbackFormData.comment}
                        onChange={handleInputChange}
                        placeholder="Tell us what you think about our website..."
                        className="w-full px-6 py-4 text-gray-700 bg-white/70 border-2 border-gray-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none backdrop-blur-sm"
                        required
                      ></textarea>
                      <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                        {feedbackFormData.comment.length}/500
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Your honest feedback helps us improve our services
                    </p>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowForm(false)}
                      className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: submitting ? 1 : 1.02 }}
                      whileTap={{ scale: submitting ? 1 : 0.98 }}
                      className="px-8 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-medium"
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <FiStar className="mr-2" size={18} />
                          Submit Review
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence></div>

      {/* Feedback List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="col-span-2 mt-12"
      >
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Recent Reviews
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto"></div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
            </div>
          </div>
        ) : feedbacks.length > 0 ? (
          <div className="grid gap-6">
            {feedbacks.map((feedback, index) => (
              <motion.div
                key={feedback._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-6 transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <FiUser className="h-6 w-6 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                          {feedback.user?.firstName} {feedback.user?.lastName}
                        </h4>
                        <p className="text-sm text-gray-500">Verified Customer</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-full shadow-sm">
                          <div className="flex space-x-1">
                            {renderStaticStarRating(feedback.rating)}
                          </div>
                          <span className="ml-2 text-sm font-bold text-white">{feedback.rating}</span>
                        </div>
                        <div className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full flex items-center">
                          <FiCalendar className="mr-1" size={12} />
                          {formatDate(feedback.createdAt)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                          <FiMessageSquare className="text-blue-600" size={16} />
                        </div>
                        <p className="text-gray-700 leading-relaxed flex-1">{feedback.comment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex justify-center items-center space-x-2 mt-10"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(feedbackPage - 1)}
                  disabled={feedbackPage === 1}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    feedbackPage === 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-sm hover:shadow-md'
                  }`}
                >
                  Previous
                </motion.button>
                
                <div className="flex space-x-1">
                  {[...Array(totalPages)].map((_, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handlePageChange(index + 1)}
                      className={`w-10 h-10 rounded-xl font-medium transition-all duration-200 ${
                        feedbackPage === index + 1 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                          : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-sm hover:shadow-md'
                      }`}
                    >
                      {index + 1}
                    </motion.button>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(feedbackPage + 1)}
                  disabled={feedbackPage === totalPages}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    feedbackPage === totalPages 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-sm hover:shadow-md'
                  }`}
                >
                  Next
                </motion.button>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-3xl border border-gray-200/50"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No reviews yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">Be the first to share your experience and help others make informed decisions!</p>
            {!showForm && (
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <FiStar className="mr-3 group-hover:rotate-12 transition-transform duration-300" size={20} />
                Write the First Review
              </motion.button>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Rating;