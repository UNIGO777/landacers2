import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { cardsData, images } from '../../tempData/data';
import ProjectProfileLoader from '../../components/loaders/ProjectProfileLoader';
import { FiMapPin, FiHome, FiLayers, FiCheck, FiMail, FiPhone, FiUser, FiHeart, FiCalendar, FiLoader, FiUsers, FiCoffee, FiMessageSquare, FiStar, FiDroplet } from 'react-icons/fi';
import Card from '../../components/card/Card';
import CardCarousel from '../../components/cardCarousel/CardCarousel';

import axios from 'axios';
import { toast } from 'react-toastify';
import { AlertOctagon, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectProfile = ({ setLoginOpen }) => {
    const [searchParams] = useSearchParams();
    const projectId = searchParams.get('projectId');
    const [activeMediaIndex, setActiveMediaIndex] = useState(0);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        agreeToTerms: false
    });
    const [relatedProjects, setRelatedProjects] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [queryLoading, setQueryLoading] = useState(false);

    // Feedback states
    const [feedbacks, setFeedbacks] = useState([]);
    const [feedbackLoading, setFeedbackLoading] = useState(false);
    const [feedbackPage, setFeedbackPage] = useState(1);
    const [totalFeedbackPages, setTotalFeedbackPages] = useState(1);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [feedbackFormData, setFeedbackFormData] = useState({
        rating: 5,
        comment: ''
    });
    const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);

    // Fetch project data
    useEffect(() => {
        const fetchProjectData = async () => {
            if (!projectId) {
                setError('Project ID is missing');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_backendUrl}/api/projects/projectDetails/${projectId}`);
                setProject(response.data.projectDetail);
               

                // Fetch related projects
                try {
                    const relatedResponse = await axios.get(`${process.env.REACT_APP_backendUrl}/api/projects/related/${projectId}`);
                    setRelatedProjects(relatedResponse.data.data);
                } catch (err) {
                    console.error('Error fetching related projects:', err);
                    setRelatedProjects(cardsData.slice(0, 3)); // Fallback to dummy data
                }

            } catch (err) {
                console.error('Error fetching project:', err);
                setError('Failed to load project details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProjectData();
    }, [projectId]);

    // Fetch project feedbacks
    useEffect(() => {
        const fetchProjectFeedbacks = async () => {
            if (!projectId) return;

            try {
                setFeedbackLoading(true);
                const response = await axios.get(
                    `${process.env.REACT_APP_backendUrl}/api/feedback/project/${projectId}?page=${feedbackPage}`
                );

                if (response.data) {
                    setFeedbacks(response.data.data.results || []);
                    setTotalFeedbackPages(response.data.data.totalPages || 1);
                }
            } catch (err) {
                console.error('Error fetching project feedbacks:', err);
                // Don't show error toast for feedbacks as it's not critical
            } finally {
                setFeedbackLoading(false);
            }
        };

        fetchProjectFeedbacks();
    }, [projectId, feedbackPage]);

    const handleGenerateQuery = () => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
            setLoginOpen(true);
            return;
        }

        setShowConfirmation(true);
    };

    const handleConfirmQuery = async () => {
        try {
            setQueryLoading(true);
            const token = localStorage.getItem('token');

            const response = await axios.get(
                `${process.env.REACT_APP_backendUrl}/api/quary/project/create/${projectId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success('Query generated successfully!');
            setFormData({
                agreeToTerms: false
            });
            setShowConfirmation(false);
        } catch (err) {
            console.error('Error generating query:', err);
            toast.error(err.response?.data?.message || 'Failed to generate query. Please try again.');
        } finally {
            setQueryLoading(false);
        }
    };

    const handleCancelQuery = () => {
        setShowConfirmation(false);
    };

    // Feedback handlers
    const handleFeedbackInputChange = (e) => {
        const { name, value } = e.target;
        setFeedbackFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRatingChange = (rating) => {
        setFeedbackFormData(prev => ({
            ...prev,
            rating
        }));
    };

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();

        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
            setLoginOpen(true);
            return;
        }

        // Validate form
        if (!feedbackFormData.comment.trim()) {
            toast.error('Please enter a comment');
            return;
        }

        try {
            setFeedbackSubmitting(true);

            const response = await axios.post(
                `${process.env.REACT_APP_backendUrl}/api/feedback`,
                {
                    feedbackType: 'project',
                    projectId,
                    rating: feedbackFormData.rating,
                    comment: feedbackFormData.comment
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success('Feedback submitted successfully!');

            // Reset form
            setFeedbackFormData({
                rating: 5,
                comment: ''
            });
            setShowFeedbackForm(false);

            // Update feedbacks list without page reload
            // Add the new feedback to the beginning of the list
            const newFeedback = response.data.data;
            setFeedbacks(prevFeedbacks => [
                {
                    ...newFeedback,
                    user: {
                        firstName: localStorage.getItem('firstName') || 'User',
                        lastName: localStorage.getItem('lastName') || ''
                    },
                    createdAt: new Date().toISOString()
                },
                ...prevFeedbacks
            ]);

        } catch (err) {
            console.error('Error submitting feedback:', err);
            toast.error(err.response?.data?.message || 'Failed to submit feedback. Please try again.');
        } finally {
            setFeedbackSubmitting(false);
        }
    };

    const handleFeedbackPageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalFeedbackPages) {
            setFeedbackPage(newPage);
        }
    };

    // Format date for feedback
    const formatFeedbackDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Format date for project launch and completion
    const formatProjectDate = (dateString) => {
        if (!dateString) return 'Not specified';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Render star rating
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
                    <FiStar className="w-5 h-5 fill-current" />
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

    // Loading state
    if (loading) {
        return <ProjectProfileLoader />;
    }

    // Error state
    if (error || !project) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-gray-100 flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-black/10 rounded-2xl p-8 max-w-md w-full relative overflow-hidden"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                        className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16"
                    />
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                        className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"
                    />

                    <div className="relative">
                        <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mb-8 text-center"
                        >
                            <motion.div
                                animate={{
                                    rotate: [0, 10, -10, 10, 0],
                                }}
                                transition={{
                                    duration: 0.5,
                                    repeat: Infinity,
                                    repeatDelay: 3
                                }}
                                className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center"
                            >
                                <AlertOctagon className="w-12 h-12 text-red-500" />
                            </motion.div>

                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="text-3xl font-bold text-gray-800 mb-4"
                            >
                                Oops! Something went wrong
                            </motion.h2>

                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="text-gray-600"
                            >
                                {error || 'Project not found. Please try again later.'}
                            </motion.p>
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="flex justify-center"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.history.back()}
                                className="bg-[#3a78ff] text-white px-8 py-3 rounded-lg flex items-center space-x-2 shadow-lg shadow-blue-200"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span>Go Back</span>
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        );
    }

    // Prepare project data
    const projectImages = project.images?.map(photo =>
        `${process.env.REACT_APP_backendUrl}/storage/${photo}`
    ) || [];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Image Section with Overlay */}
            <div className="relative h-[70vh] bg-gray-900">
                {projectImages.length > 0 ? (
                    <img
                        src={projectImages[activeMediaIndex]}
                        alt="Project"
                        className="w-full h-full object-cover opacity-80"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        <p className="text-gray-400">No images available</p>
                    </div>
                )}

                {/* Overlay with project title and details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 flex flex-col justify-end p-8 md:p-16">
                    <div className="container mx-auto">
                        <div className="max-w-4xl">
                            <span className="inline-block px-4 py-1 bg-white/20 text-white text-sm font-semibold rounded-full mb-4">
                                {project.projectType || 'Project'}
                            </span>
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{project.projectName || 'Untitled Project'}</h1>
                            <div className="flex items-center text-white/90 mb-2">
                                <FiMapPin className="w-5 h-5 mr-2" />
                                <span>
                                    {project.location ? 
                                        `${project.location.locality || ''}, 
                                        ${project.location.city || ''}, 
                                        ${project.location.state || ''}` : 
                                        'Location not specified'}
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-6 mt-6">
                                <button
                                    onClick={handleGenerateQuery}
                                    className="bg-[#3a78ff] hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
                                >
                                    Generate Query
                                </button>
                                <div className="flex gap-4">
                                    {project.totalUnits && (
                                        <div className="flex items-center bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                                            <span className="font-semibold mr-2">{project.totalUnits}</span>
                                            <span>Units</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Gallery Thumbnails */}
            <div className="bg-white border-b mb-4 shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex gap-3 overflow-y-auto p-2 pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                        {projectImages.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index}`}
                                className={`h-16 w-24 cursor-pointer object-cover rounded-md transition-all ${activeMediaIndex === index ? 'ring-2 ring-[#2c5fb7] ' : 'opacity-70 hover:opacity-100'}`}
                                onClick={() => setActiveMediaIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-5 md:p-10">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                            <h2 className="text-2xl font-bold mb-4">About This Project</h2>
                            <div className="prose max-w-none text-gray-700">
                                <p>{project.description}</p>
                            </div>
                        </div>

                        {/* Project Features */}
                        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                            <h2 className="text-2xl font-bold mb-4">Project Features</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                        <FiHome className="text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Project Type</h3>
                                        <p className="text-gray-600">{project.projectType}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-green-100 p-3 rounded-lg mr-4">
                                        <FiLayers className="text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Total Units</h3>
                                        <p className="text-gray-600">{project.totalUnits || 'Not specified'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-purple-100 p-3 rounded-lg mr-4">
                                        <FiCalendar className="text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Launch Date</h3>
                                        <p className="text-gray-600">{formatProjectDate(project.launchDate)}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                                        <FiCalendar className="text-yellow-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Completion Date</h3>
                                        <p className="text-gray-600">{formatProjectDate(project.completionDate)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Amenities */}
                        {project.amenities && project.amenities.length > 0 && (
                            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 overflow-hidden">
                                <h2 className="text-2xl font-bold mb-6 flex items-center">
                                    <FiCoffee className="mr-3 text-blue-600" />
                                    <span>Project Amenities</span>
                                </h2>
                                
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    {project.amenities.map((amenity, index) => {
                                        // Map amenities to appropriate icons
                                        let icon;
                                        if (amenity.toLowerCase().includes('pool')) {
                                            icon = <FiDroplet className="text-blue-500" />;
                                        } else if (amenity.toLowerCase().includes('gym') || amenity.toLowerCase().includes('fitness')) {
                                            icon = <FiLoader className="text-red-500" />;
                                        } else if (amenity.toLowerCase().includes('garden') || amenity.toLowerCase().includes('park')) {
                                            icon = <FiCoffee className="text-green-500" />;
                                        } else if (amenity.toLowerCase().includes('security') || amenity.toLowerCase().includes('guard')) {
                                            icon = <FiUser className="text-purple-500" />;
                                        } else if (amenity.toLowerCase().includes('club') || amenity.toLowerCase().includes('community')) {
                                            icon = <FiUsers className="text-yellow-600" />;
                                        } else {
                                            icon = <FiCheck className="text-emerald-500" />;
                                        }
                                        
                                        return (
                                            <motion.div 
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                                            >
                                                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm mr-3">
                                                    {icon}
                                                </div>
                                                <span className="text-gray-800 font-medium">{amenity}</span>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                                
                                {project.amenities.length > 6 && (
                                    <div className="mt-6 text-center">
                                        <span className="inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
                                            {project.amenities.length} Amenities Available
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Feedback Section */}
                        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold">Reviews & Feedback</h2>
                                <button
                                    onClick={() => setShowFeedbackForm(!showFeedbackForm)}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    {showFeedbackForm ? 'Cancel' : 'Write a Review'}
                                </button>
                            </div>

                            {/* Feedback Form */}
                            {showFeedbackForm && (
                                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                    <form onSubmit={handleFeedbackSubmit}>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 mb-2">Rating</label>
                                            <div className="flex">
                                                {renderStarRating(feedbackFormData.rating)}
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="comment" className="block text-gray-700 mb-2">Your Review</label>
                                            <textarea
                                                id="comment"
                                                name="comment"
                                                value={feedbackFormData.comment}
                                                onChange={handleFeedbackInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                rows="4"
                                                placeholder="Share your experience with this project..."
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={feedbackSubmitting}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
                                        >
                                            {feedbackSubmitting ? 'Submitting...' : 'Submit Review'}
                                        </button>
                                    </form>
                                </div>
                            )}

                            {/* Feedback List */}
                            {feedbackLoading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="animate-pulse">
                                            <div className="flex items-start">
                                                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3" />
                                                <div className="flex-1">
                                                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                                                    <div className="h-3 bg-gray-200 rounded w-1/3 mb-3" />
                                                    <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                                                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : feedbacks.length > 0 ? (
                                <div className="space-y-6">
                                    {feedbacks.map((feedback) => (
                                        <div key={feedback._id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                            <div className="flex items-start">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                                                    <FiUser className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="font-medium text-gray-900">
                                                            {feedback.user?.firstName} {feedback.user?.lastName}
                                                        </h4>
                                                        <span className="text-sm text-gray-500">{formatFeedbackDate(feedback.createdAt)}</span>
                                                    </div>
                                                    <div className="flex my-1">
                                                        {renderStaticStarRating(feedback.rating)}
                                                    </div>
                                                    <p className="text-gray-700 mt-2">{feedback.comment}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Pagination */}
                                    {totalFeedbackPages > 1 && (
                                        <div className="flex justify-center mt-6">
                                            <nav className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleFeedbackPageChange(feedbackPage - 1)}
                                                    disabled={feedbackPage === 1}
                                                    className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
                                                >
                                                    Previous
                                                </button>
                                                <span className="text-gray-600">
                                                    Page {feedbackPage} of {totalFeedbackPages}
                                                </span>
                                                <button
                                                    onClick={() => handleFeedbackPageChange(feedbackPage + 1)}
                                                    disabled={feedbackPage === totalFeedbackPages}
                                                    className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
                                                >
                                                    Next
                                                </button>
                                            </nav>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <FiMessageSquare className="w-12 h-12 mx-auto mb-4 opacity-30" />
                                    <p>No reviews yet. Be the first to share your experience!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Project Stats */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-lg font-semibold mb-4">Project Stats</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <span className="text-sm text-gray-500">Total Units</span>
                                    <p className="text-lg font-semibold">{project.projectType || 'N/A'}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <span className="text-sm text-gray-500">Available Units</span>
                                    <p className="text-lg font-semibold">{project.availableUnits || 'N/A'}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <span className="text-sm text-gray-500">Type</span>
                                    <p className="text-lg font-semibold">{project.projectType || 'N/A'}</p>
                                </div>
                            </div>

                            {project.isUpcomming && (
                                <div className="mt-4 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                    <p className="text-yellow-700 font-medium">Upcoming Project</p>
                                    <p className="text-sm text-yellow-600 mt-1">This project is coming soon.</p>
                                </div>
                            )}
                        </div>

                        {/* Generate Quary */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-lg font-semibold mb-4">Interested in this project?</h3>
                            <p className="text-gray-600 mb-4">Contact the developer for more information about this project.</p>
                            <button
                                onClick={handleGenerateQuery}
                                className="w-full bg-[#3a78ff] hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
                            >
                                <FiMail className="mr-2" />
                                Generate Quary
                            </button>
                        </div>

                        {/* Location Info */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-lg font-semibold mb-4">Location</h3>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <FiMapPin className="w-5 h-5 text-gray-500 mr-2 mt-0.5" />
                                    <div>
                                        <p className="text-gray-800">{project.location?.locality}, {project.location?.city}</p>
                                        <p className="text-gray-600">{project.location?.state}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                    <CardCarousel
                        title="Similar Projects You May Like"
                        className="mt-10 px-3 md:px-10 pb-5 md:pb-10"
                    >
                        {relatedProjects.map((relatedProject, index) => (
                            <div key={index} className="px-2">
                                <Card
                                    card={{
                                        image: relatedProject.images && relatedProject.images.length > 0 
                                            ? `${process.env.REACT_APP_backendUrl}/storage/${relatedProject.images[0]}` 
                                            : 'https://via.placeholder.com/400x300',
                                        title: relatedProject.projectName,
                                        price: relatedProject.price || "Price on request",
                                        location: `${relatedProject.location?.city || ''}, ${relatedProject.location?.state || ''}`,
                                        details: relatedProject.description?.substring(0, 100) + '...' || '',
                                        _id: relatedProject._id,
                                        transactionType: relatedProject.projectType
                                    }}
                                />
                            </div>
                        ))}
                    </CardCarousel>
                )}

                {/* Query Confirmation Modal */}
                {showConfirmation && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 max-w-md w-full">
                            <h3 className="text-xl font-semibold mb-4">Generate Quary</h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to generate a query for this project? The developer will contact you using your registered email and phone number.
                            </p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={handleCancelQuery}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmQuery}
                                    disabled={queryLoading}
                                    className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {queryLoading ? 'Processing...' : 'Confirm'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        
    );
};

export default ProjectProfile;