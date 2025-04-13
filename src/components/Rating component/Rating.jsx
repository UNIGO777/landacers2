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
        <button
          key={i}
          type="button"
          onClick={() => handleRatingChange(i)}
          className={`${i <= feedbackFormData.rating ? 'text-yellow-400' : 'text-gray-300'} focus:outline-none`}
        >
          <FiStar className="w-6 h-6 fill-current" />
        </button>
      );
    }
    return stars;
  };

  // Render static star rating (for display only)
  const renderStaticStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FiStar
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg border-[2px] p-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Customer Feedback</h2>
        <p className="text-gray-600">We value your opinion! Let us know what you think about our website.</p>
      </motion.div>

      {/* Feedback Form Toggle Button */}
      {!showForm && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onClick={() => setShowForm(true)}
          className="mb-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center transition-colors"
        >
          <FiStar className="mr-2" />
          Write a Review
        </motion.button>
      )}

      {/* Feedback Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Share Your Experience</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                <div className="flex items-center">
                  {renderStarRating(feedbackFormData.rating)}
                  <span className="ml-2 text-sm text-gray-500">{feedbackFormData.rating}/5</span>
                </div>
              </div>

              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">Your Comment</label>
                <textarea
                  id="comment"
                  name="comment"
                  rows="4"
                  value={feedbackFormData.comment}
                  onChange={handleInputChange}
                  placeholder="Tell us what you think about our website..."
                  className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                ></textarea>
                <p className="mt-1 text-xs text-gray-500">Your honest feedback helps us improve our services</p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Review'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Recent Reviews</h3>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : feedbacks.length > 0 ? (
          <div className="space-y-6">
            {feedbacks.map((feedback) => (
              <div key={feedback._id} className="border-b pb-6 last:border-b-0 last:pb-0 hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FiUser className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{feedback.user?.firstName} {feedback.user?.lastName}</h4>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full flex items-center">
                        <FiCalendar className="mr-1" size={12} />
                        {formatDate(feedback.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {renderStaticStarRating(feedback.rating)}
                      </div>
                      <span className="ml-2 text-xs text-gray-500">{feedback.rating}/5</span>
                    </div>
                    <div className="mt-2 flex items-start">
                      <FiMessageSquare className="text-gray-400 mt-1 mr-2 flex-shrink-0" size={16} />
                      <p className="text-sm text-gray-600">{feedback.comment}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <button
                  onClick={() => handlePageChange(feedbackPage - 1)}
                  disabled={feedbackPage === 1}
                  className={`px-3 py-1 rounded-md ${feedbackPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-3 py-1 rounded-md ${feedbackPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(feedbackPage + 1)}
                  disabled={feedbackPage === totalPages}
                  className={`px-3 py-1 rounded-md ${feedbackPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews yet</h3>
            <p className="mt-1 text-sm text-gray-500">Be the first to share your experience!</p>
            {!showForm && (
              <div className="mt-6">
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiStar className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Write a Review
                </button>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Rating;