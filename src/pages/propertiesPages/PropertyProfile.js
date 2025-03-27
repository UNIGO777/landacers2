import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { cardsData, images } from '../../tempData/data';
import PropertyProfileLoader from '../../components/loaders/PropertyProfileLoader';
import MapImgae from '../../Assets/Images/image 3.png'
import { FiMapPin, FiHome, FiLayers, FiCheck, FiMail, FiPhone, FiUser, FiHeart, FiDroplet, FiLoader, FiUsers, FiCoffee, FiMessageSquare, FiStar } from 'react-icons/fi';
import Card from '../../components/card/Card';
import CardCarousel from '../../components/cardCarousel/CardCarousel';

import axios from 'axios';
import { toast } from 'react-toastify';
import { AlertOctagon, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const PropertyProfile = ({ setLoginOpen }) => {
    const [searchParams] = useSearchParams();
    const propertyId = searchParams.get('propertyId');
    const [activeMediaIndex, setActiveMediaIndex] = useState(0);
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        agreeToTerms: false
    });
    const [similarProperties, setSimilarProperties] = useState([]);
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

    // Fetch property data
    useEffect(() => {
        const fetchPropertyData = async () => {
            if (!propertyId) {
                setError('Property ID is missing');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_backendUrl}/api/properties/${propertyId}`);
                setProperty(response.data);

                // Fetch similar properties
                try {
                    const similarResponse = await axios.get(`${process.env.REACT_APP_backendUrl}/api/properties/similar/${propertyId}`);
                    setSimilarProperties(similarResponse.data.data);
                   
                } catch (err) {
                    console.error('Error fetching similar properties:', err);
                    setSimilarProperties(cardsData.slice(0, 3)); // Fallback to dummy data
                }

            } catch (err) {
                console.error('Error fetching property:', err);
                setError('Failed to load property details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyData();
    }, [propertyId]);

    // Fetch property feedbacks
    useEffect(() => {
        const fetchPropertyFeedbacks = async () => {
            if (!propertyId) return;

            try {
                setFeedbackLoading(true);
                const response = await axios.get(
                    `${process.env.REACT_APP_backendUrl}/api/feedback/property/${propertyId}?page=${feedbackPage}`
                );

                if (response.data) {
                    setFeedbacks(response.data.data.results || []);
                    setTotalFeedbackPages(response.data.data.totalPages || 1);
                }
            } catch (err) {
                console.error('Error fetching property feedbacks:', err);
                // Don't show error toast for feedbacks as it's not critical
            } finally {
                setFeedbackLoading(false);
            }
        };

        fetchPropertyFeedbacks();
    }, [propertyId, feedbackPage]);





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
        // Only validate terms agreement


        try {
            setQueryLoading(true);
            const token = localStorage.getItem('token');

            const response = await axios.get(
                `${process.env.REACT_APP_backendUrl}/api/quary/property/create/${propertyId}`,
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
                    feedbackType: 'property',
                    propertyId,
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
        return <PropertyProfileLoader />;
    }

    // Error state
    if (error || !property) {
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
                    className="bg-black/10 rounded-2xl p-8 max-w-md w-full  relative overflow-hidden"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                        className="absolute top-0 right-0 w-32 h-32  rounded-full -mr-16 -mt-16"
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
                                {error || 'Property not found. Please try again later.'}
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

    // Prepare property data
    const propertyImages = property.propertyMedia?.photos?.map(photo =>
        `${process.env.REACT_APP_backendUrl}/storage/${photo}`
    ) || images;

    const propertyVideo = property.propertyMedia?.video
        ? `${process.env.REACT_APP_backendUrl}/storage/${property.propertyMedia.video}`
        : null;

    // Get property price based on transaction type
    const getPropertyPrice = () => {
        if (!property.pricingDetails) return 'Price on request';

        if (property.transactionType === 'Sell') {
            return `₹${property.pricingDetails.salePrice?.toLocaleString() || 'Price on request'}`;
        } else if (property.transactionType === 'Rent') {
            return `₹${property.pricingDetails.rent?.toLocaleString() || 'Price on request'}/month`;
        } else if (property.transactionType === 'PG') {
            return `₹${property.pricingDetails.pgPrice?.toLocaleString() || 'Price on request'}/month`;
        }

        return 'Price on request';
    };

    // Get property size
    const getPropertySize = () => {
        if (!property.propertyDetailSchemaId?.refId?.areaDetails) return 'Area not specified';

        const areaDetails = property.propertyDetailSchemaId.refId.areaDetails;

        if (areaDetails.plotArea) {
            return `${areaDetails.plotArea} ${areaDetails.areaUnitForPlot || 'sq.ft'}`;
        } else if (areaDetails.carpetArea) {
            return `${areaDetails.carpetArea} ${areaDetails.areaUnitForCarpet || 'sq.ft'}`;
        } else if (areaDetails.builtUpArea) {
            return `${areaDetails.builtUpArea} ${areaDetails.areaUnitForBuiltUp || 'sq.ft'}`;
        }

        return 'Area not specified';
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Image Section with Overlay */}
            <div className="relative h-[70vh] bg-gray-900">
                {propertyImages.length > 0 ? (
                    <img
                        src={propertyImages[activeMediaIndex]}
                        alt="Property"
                        className="w-full h-full object-cover opacity-80"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        <p className="text-gray-400">No images available</p>
                    </div>
                )}

                {/* Overlay with property title and price */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 flex flex-col justify-end p-8 md:p-16">
                    <div className="container mx-auto">
                        <div className="max-w-4xl">
                            <span className="inline-block px-4 py-1 bg-white/20 text-white text-sm font-semibold rounded-full mb-4">
                                {property.propertyType || 'Property'}
                            </span>
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{property.propertyTitle || 'Untitled Property'}</h1>
                            <div className="flex items-center text-white/90 mb-2">
                                <FiMapPin className="w-5 h-5 mr-2" />
                                <span>
                                    {property.locationSchemaId ?
                                        `${property.locationSchemaId.locality || ''}, 
                                        ${property.locationSchemaId.city || ''}, 
                                        ${property.locationSchemaId.state || ''}` :
                                        'Location not specified'}
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-6 mt-6">
                                <span className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg text-2xl font-bold">
                                    {getPropertyPrice()}
                                </span>
                                <div className="flex gap-4">
                                    {property.propertyDetailSchemaId?.refId?.bedrooms && (
                                        <div className="flex items-center bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                                            <span className="font-semibold mr-2">{property.propertyDetailSchemaId.refId.bedrooms}</span>
                                            <span>Bedrooms</span>
                                        </div>
                                    )}
                                    {property.propertyDetailSchemaId?.refId?.bathrooms && (
                                        <div className="flex items-center bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                                            <span className="font-semibold mr-2">{property.propertyDetailSchemaId.refId.bathrooms}</span>
                                            <span>Bathrooms</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Gallery Thumbnails */}
            <div className="bg-white border-b shadow-sm  top-0 ">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex gap-3 pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                        {propertyImages.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index}`}
                                className={`h-16 w-24 cursor-pointer object-cover rounded-md transition-all ${activeMediaIndex === index ? 'ring-2 ring-[#2c5fb7] scale-105' : 'opacity-70 hover:opacity-100'
                                    }`}
                                onClick={() => setActiveMediaIndex(index)}
                            />
                        ))}
                        {propertyVideo && (
                            <div
                                className="relative h-16 w-24 bg-gray-900 rounded-md flex items-center justify-center cursor-pointer"
                                onClick={() => window.open(propertyVideo, '_blank')}
                            >
                                <div className="absolute inset-0 opacity-70">
                                    <img
                                        src={propertyImages[0] || 'https://via.placeholder.com/300x200'}
                                        alt="Video thumbnail"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-8 h-8 bg-[#3a78ff] rounded-full flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 mt-12">
                {/* Main Details Section */}
                <div className="md:col-span-2 space-y-8">
                    <div className="border-b pb-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold text-gray-800">{property.propertyTitle || 'Untitled Property'}</h1>
                            <span className="bg-black/10 backdrop-blur-sm text-primary px-4 py-2 rounded-full text-lg">
                                {getPropertyPrice()}
                            </span>
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <div className="flex items-center text-gray-600">
                                    <FiHome className="w-5 h-5 mr-2 text-primary" />
                                    <span><strong>Type:</strong> {property.propertyType || 'Not specified'}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <FiMapPin className="w-5 h-5 mr-2 text-primary" />
                                    <span>
                                        {property.locationSchemaId ?
                                            `${property.locationSchemaId.locality || ''}, 
                                            ${property.locationSchemaId.city || ''}, 
                                            ${property.locationSchemaId.state || ''}` :
                                            'Location not specified'}
                                    </span>
                                </div>
                                {property.propertyDetailSchemaId?.refId?.availabilityStatus && (
                                    <div className="flex items-center text-gray-600">
                                        <FiLoader className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Status:</strong> {property.propertyDetailSchemaId.refId.availabilityStatus}</span>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-3 ">
                                <div className="flex items-center text-gray-600">
                                    <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                    <span>{getPropertySize()}</span>
                                </div>
                                {/* Residential Property Details */}
                                {['FlatApartment', 'IndependentHouseVilla', 'IndependentBuilderFloor', 'RKStudioApartment', 'ServicedApartment', 'Farmhouse'].includes(property.propertyType) && (
                                    <div className="flex flex-wrap gap-3">
                                        {property.propertyDetailSchemaId?.refId?.bedrooms && (
                                            <span className="bg-gray-100 px-3 py-1 rounded-lg">🛏 {property.propertyDetailSchemaId.refId.bedrooms} Beds</span>
                                        )}
                                        {property.propertyDetailSchemaId?.refId?.bathrooms && (
                                            <span className="bg-gray-100 px-3 py-1 rounded-lg">🚿 {property.propertyDetailSchemaId.refId.bathrooms} Baths</span>
                                        )}
                                        {property.propertyDetailSchemaId?.refId?.balconies && (
                                            <span className="bg-gray-100 px-3 py-1 rounded-lg">🏗 {property.propertyDetailSchemaId.refId.balconies} Balconies</span>
                                        )}
                                        {property.propertyDetailSchemaId?.refId?.furnishing && (
                                            <span className="bg-gray-100 px-3 py-1 rounded-lg">🪑 {property.propertyDetailSchemaId.refId.furnishing}</span>
                                        )}
                                    </div>
                                )}
                                {/* Office Property Details */}
                                {property.propertyType === 'Office' && (
                                    <div className="flex flex-wrap gap-3">
                                        {property.propertyDetailSchemaId?.refId?.WhatKindOfOfficeIsit && (
                                            <span className="bg-gray-100 px-3 py-1 rounded-lg">🏢 {property.propertyDetailSchemaId.refId.WhatKindOfOfficeIsit}</span>
                                        )}
                                        {property.propertyDetailSchemaId?.refId?.cabins && (
                                            <span className="bg-gray-100 px-3 py-1 rounded-lg">🚪 {property.propertyDetailSchemaId.refId.cabins} Cabins</span>
                                        )}
                                        {property.propertyDetailSchemaId?.refId?.meetingRooms && (
                                            <span className="bg-gray-100 px-3 py-1 rounded-lg">👥 {property.propertyDetailSchemaId.refId.meetingRooms} Meeting Rooms</span>
                                        )}
                                    </div>
                                )}
                                {/* Retail Property Details */}
                                {property.propertyType === 'Retail' && property.propertyDetailSchemaId?.refId && (
                                    <div className="space-y-4 mt-8">
                                        <h2 className="text-2xl font-semibold text-gray-800">Retail Details</h2>
                                        <div className="bg-white p-6 rounded-xl shadow-sm">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-4">
                                                    {property.propertyDetailSchemaId.refId.retailType && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiHome className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Retail Type:</strong> {property.propertyDetailSchemaId.refId.retailType}</span>
                                                        </div>
                                                    )}

                                                    {property.propertyDetailSchemaId.refId.locationType && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiMapPin className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Location Type:</strong> {property.propertyDetailSchemaId.refId.locationType}</span>
                                                        </div>
                                                    )}

                                                    {property.propertyDetailSchemaId.refId.entranceWidth && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiHome className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Entrance Width:</strong> {property.propertyDetailSchemaId.refId.entranceWidth}</span>
                                                        </div>
                                                    )}

                                                    {property.propertyDetailSchemaId.refId.ceilingHeight && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiHome className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Ceiling Height:</strong> {property.propertyDetailSchemaId.refId.ceilingHeight}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="space-y-4">
                                                    {property.propertyDetailSchemaId.refId.totalFloors && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Total Floors:</strong> {property.propertyDetailSchemaId.refId.totalFloors}</span>
                                                        </div>
                                                    )}

                                                    {property.propertyDetailSchemaId.refId.propertyOnFloor && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Property On Floor:</strong> {property.propertyDetailSchemaId.refId.propertyOnFloor}</span>
                                                        </div>
                                                    )}

                                                    {property.propertyDetailSchemaId.refId.washrooms && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiDroplet className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Washrooms:</strong> {property.propertyDetailSchemaId.refId.washrooms}</span>
                                                        </div>
                                                    )}

                                                    {property.propertyDetailSchemaId.refId.parkingType && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiHome className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Parking Type:</strong> {property.propertyDetailSchemaId.refId.parkingType}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {property.propertyDetailSchemaId.refId.suitableForBusinessTypes && (
                                                <div className="mt-6">
                                                    <h3 className="font-medium text-gray-700 mb-3">Suitable for Business Types</h3>
                                                    <p className="text-gray-600">{property.propertyDetailSchemaId.refId.suitableForBusinessTypes}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Storage Property Details Section */}
                                {property.propertyType === 'Storage' && property.propertyDetailSchemaId?.refId && (
                                    <div className="space-y-4 mt-8">
                                        <h2 className="text-2xl font-semibold text-gray-800">Storage Details</h2>
                                        <div className="bg-white p-6 rounded-xl shadow-sm">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-4">
                                                    {property.propertyDetailSchemaId.refId.StorageType && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiHome className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Storage Type:</strong> {property.propertyDetailSchemaId.refId.StorageType}</span>
                                                        </div>
                                                    )}

                                                    {property.propertyDetailSchemaId.refId.areaDetails?.plotArea && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Plot Area:</strong> {property.propertyDetailSchemaId.refId.areaDetails.plotArea} {property.propertyDetailSchemaId.refId.areaDetails.areaUnitForPlot}</span>
                                                        </div>
                                                    )}

                                                    {property.propertyDetailSchemaId.refId.areaDetails?.carpetArea && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Carpet Area:</strong> {property.propertyDetailSchemaId.refId.areaDetails.carpetArea} {property.propertyDetailSchemaId.refId.areaDetails.areaUnitForCarpet}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="space-y-4">
                                                    {property.propertyDetailSchemaId.refId.areaDetails?.builtUpArea && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Built-Up Area:</strong> {property.propertyDetailSchemaId.refId.areaDetails.builtUpArea} {property.propertyDetailSchemaId.refId.areaDetails.areaUnitForBuiltUp}</span>
                                                        </div>
                                                    )}

                                                    {property.propertyDetailSchemaId.refId.washrooms && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiDroplet className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Washrooms:</strong> {property.propertyDetailSchemaId.refId.washrooms}</span>
                                                        </div>
                                                    )}

                                                    {property.propertyDetailSchemaId.refId.availabilityStatus && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiLoader className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Availability Status:</strong> {property.propertyDetailSchemaId.refId.availabilityStatus}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Industry Property Details Section */}
                                {property.propertyType === 'Industry' && property.propertyDetailSchemaId?.refId && (
                                    <div className="space-y-4 mt-8">
                                        <h2 className="text-2xl font-semibold text-gray-800">Industry Details</h2>
                                        <div className="bg-white p-6 rounded-xl shadow-sm">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-4">
                                                    {property.propertyDetailSchemaId.refId.IndustryType && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiHome className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Industry Type:</strong> {property.propertyDetailSchemaId.refId.IndustryType}</span>
                                                        </div>
                                                    )}

                                                    {property.propertyDetailSchemaId.refId.areaDetails?.plotArea && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Plot Area:</strong> {property.propertyDetailSchemaId.refId.areaDetails.plotArea} {property.propertyDetailSchemaId.refId.areaDetails.areaUnitForPlot}</span>
                                                        </div>
                                                    )}

                                                    {property.propertyDetailSchemaId.refId.areaDetails?.carpetArea && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Carpet Area:</strong> {property.propertyDetailSchemaId.refId.areaDetails.carpetArea} {property.propertyDetailSchemaId.refId.areaDetails.areaUnitForCarpet}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="space-y-4">
                                                    {property.propertyDetailSchemaId.refId.areaDetails?.builtUpArea && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Built-Up Area:</strong> {property.propertyDetailSchemaId.refId.areaDetails.builtUpArea} {property.propertyDetailSchemaId.refId.areaDetails.areaUnitForBuiltUp}</span>
                                                        </div>
                                                    )}

                                                    {property.propertyDetailSchemaId.refId.washrooms && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiDroplet className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Washrooms:</strong> {property.propertyDetailSchemaId.refId.washrooms}</span>
                                                        </div>
                                                    )}

                                                    {property.propertyDetailSchemaId.refId.availabilityStatus && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiLoader className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Availability Status:</strong> {property.propertyDetailSchemaId.refId.availabilityStatus}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Hospitality Property Details Section */}
                                {property.propertyType === 'Hospitality' && property.propertyDetailSchemaId?.refId && (
                                    <div className="space-y-4 mt-8">
                                        <h2 className="text-2xl font-semibold text-gray-800">Hospitality Details</h2>
                                        <div className="bg-white p-6 rounded-xl shadow-sm">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-4">
                                                    {property.propertyDetailSchemaId.refId.HospitalityType && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiHome className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Hospitality Type:</strong> {property.propertyDetailSchemaId.refId.HospitalityType}</span>
                                                        </div>
                                                    )}

                                                    {property.propertyDetailSchemaId.refId.totalRooms && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiHome className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Total Rooms:</strong> {property.propertyDetailSchemaId.refId.totalRooms}</span>
                                                        </div>
                                                    )}

                                                    {property.propertyDetailSchemaId.refId.washrooms && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiDroplet className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Washrooms:</strong> {property.propertyDetailSchemaId.refId.washrooms}</span>
                                                        </div>
                                                    )}

                                                    {property.propertyDetailSchemaId.refId.balconies && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiHome className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Balconies:</strong> {property.propertyDetailSchemaId.refId.balconies}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="space-y-4">
                                                    {property.propertyDetailSchemaId.refId.propertyOnFloor && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Property On Floor:</strong> {property.propertyDetailSchemaId.refId.propertyOnFloor}</span>
                                                        </div>
                                                    )}

                                                    {property.propertyDetailSchemaId.refId.washrooms && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiDroplet className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Washrooms:</strong> {property.propertyDetailSchemaId.refId.washrooms}</span>
                                                        </div>
                                                    )}

                                                    {property.propertyDetailSchemaId.refId.balconies && (
                                                        <div className="flex items-center text-gray-600">
                                                            <FiHome className="w-5 h-5 mr-2 text-primary" />
                                                            <span><strong>Balconies:</strong> {property.propertyDetailSchemaId.refId.balconies}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="space-y-8 ">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800">Property Details</h2>
                            <div className="prose max-w-none text-gray-600  md:p-6 rounded-xl ">
                                {property.description ? (
                                    property.description.split('\n').map((line, index) => (
                                        <div key={index} className="flex items-start mb-3">
                                            <FiCheck className="w-4 h-4 text-primary mt-1 mr-2 " />
                                            <p className="whitespace-pre-line">{line.replace('- ', '')}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No description available</p>
                                )}
                            </div>
                        </div>

                        {/* Amenities Section */}
                        {property.amenities && Object.keys(property.amenities).some(key =>
                            Array.isArray(property.amenities[key]) && property.amenities[key].length > 0
                        ) && (
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-semibold text-gray-800">Amenities</h2>
                                    <div className="bg-white p-6 rounded-xl shadow-sm">
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                            {Object.keys(property.amenities).map(amenityType =>
                                                property.amenities[amenityType].length > 0 && (
                                                    <div key={amenityType} className="space-y-3">
                                                        <h3 className="font-medium text-gray-700 capitalize border-b pb-2">{amenityType.replace(/([A-Z])/g, ' $1').trim()}</h3>
                                                        <ul className="space-y-2">
                                                            {property.amenities[amenityType].map((amenity, idx) => (
                                                                <li key={idx} className="flex items-center text-gray-600 hover:text-primary transition-colors">
                                                                    <div className="w-6 h-6 rounded-full bg-[#3a78ff]/10 flex items-center justify-center mr-2">
                                                                        <FiCheck className="w-3 h-3 text-primary flex-shrink-0" />
                                                                    </div>
                                                                    <span>{amenity}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                        {/* Map Section */}

                    </div>
                </div>

                {/* Sidebar - Contact Form */}
                <div className="md:col-span-1  md:p-10">
                    <div className=" rounded-xl -6 sticky top-24">
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Generate Query</h2>

                        {/* Seller Info */}
                        {property.sellerId && (
                            <div className="mb-6 pb-6 border-b">
                                <div className="flex items-center space-x-3 mb-3">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                        <FiUser className="w-6 h-6 text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{property.sellerId.sellerDetails.name || 'Property Seller'}</p>
                                        <p className="text-sm text-gray-500">{property.sellerId.sellerType || 'Seller'}</p>
                                    </div>
                                </div>




                            </div>
                        )}

                        {/* Enquiry Form */}
                        <form className="space-y-4">
                            <div className="text-center mb-4">
                                <p className="text-gray-700 font-medium">Click the button below to generate a query for this property</p>
                                <p className="text-sm text-gray-500 mt-2">The property owner will receive your contact information from your account</p>
                            </div>



                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={handleGenerateQuery}
                                    className="w-full py-3 bg-[#3a78ff] text-white rounded-lg hover:bg-[#2c5fb7] transition-colors flex items-center justify-center"
                                    disabled={queryLoading}
                                >
                                    {queryLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <FiMessageSquare className="w-5 h-5 mr-2" />
                                            Generate Query
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Confirmation Dialog */}
                        {showConfirmation && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                                <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Query Generation</h3>
                                    <p className="text-gray-600 mb-6">Are you sure you want to generate a query for this property? The owner will receive your contact information from your account.</p>
                                    <p className="text-sm text-gray-500 mb-6">Note: You can only make one enquiry for any property in every 48 hours.</p>

                                    <div className="flex flex-col sm:flex-row gap-3 justify-end">
                                        <button
                                            onClick={handleCancelQuery}
                                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleConfirmQuery}
                                            className="px-4 py-2 text-white bg-[#3a78ff] rounded-lg hover:bg-[#3a78ff]-dark transition-colors flex items-center justify-center"
                                            disabled={queryLoading}
                                        >
                                            {queryLoading ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                                                    Generating...
                                                </>
                                            ) : (
                                                'Generate Query'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Office Specific Details Section */}
            {property.propertyType === 'Office' && property.propertyDetailSchemaId?.refId && (
                <div className="space-y-4 mt-8 p-10">
                    <h2 className="text-2xl font-semibold text-gray-800">Office Details</h2>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center text-gray-600">
                                    <FiHome className="w-5 h-5 mr-2 text-primary" />
                                    <span><strong>Office Type:</strong> {property.propertyDetailSchemaId.refId.WhatKindOfOfficeIsit}</span>
                                </div>

                                {property.propertyDetailSchemaId.refId.minSeats && (
                                    <div className="flex items-center text-gray-600">
                                        <FiUser className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Seating Capacity:</strong> {property.propertyDetailSchemaId.refId.minSeats}
                                            {property.propertyDetailSchemaId.refId.maxSeats && ` - ${property.propertyDetailSchemaId.refId.maxSeats}`} seats</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.cabins && (
                                    <div className="flex items-center text-gray-600">
                                        <FiHome className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Cabins:</strong> {property.propertyDetailSchemaId.refId.cabins}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.meetingRooms && (
                                    <div className="flex items-center text-gray-600">
                                        <FiUsers className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Meeting Rooms:</strong> {property.propertyDetailSchemaId.refId.meetingRooms}</span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                {property.propertyDetailSchemaId.refId.washrooms && (
                                    <div className="flex items-center text-gray-600">
                                        <FiDroplet className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Washrooms:</strong> {property.propertyDetailSchemaId.refId.washrooms}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.conferenceRoom && (
                                    <div className="flex items-center text-gray-600">
                                        <FiUsers className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Conference Room:</strong> {property.propertyDetailSchemaId.refId.conferenceRoom}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.pantryType && (
                                    <div className="flex items-center text-gray-600">
                                        <FiCoffee className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Pantry:</strong> {property.propertyDetailSchemaId.refId.pantryType}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.receptionArea && (
                                    <div className="flex items-center text-gray-600">
                                        <FiUser className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Reception Area:</strong> {property.propertyDetailSchemaId.refId.receptionArea}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {property.propertyDetailSchemaId.refId.fireSafetyMeasures &&
                            property.propertyDetailSchemaId.refId.fireSafetyMeasures.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="font-medium text-gray-700 mb-3">Fire Safety Measures</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {property.propertyDetailSchemaId.refId.fireSafetyMeasures.map((measure, index) => (
                                            <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                                                {measure}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            )}

            {/* Residential Property Details Section */}
            {['FlatApartment', 'IndependentHouseVilla', 'IndependentBuilderFloor', 'RKStudioApartment', 'ServicedApartment', 'Farmhouse'].includes(property.propertyType) && property.propertyDetailSchemaId?.refId && (
                <div className="space-y-4 mt-8 p-10">
                    <h2 className="text-2xl font-semibold text-gray-800">{property.propertyType.replace(/([A-Z])/g, ' $1').trim()} Details</h2>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                {property.propertyDetailSchemaId.refId.bedrooms && (
                                    <div className="flex items-center text-gray-600">
                                        <FiHome className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Bedrooms:</strong> {property.propertyDetailSchemaId.refId.bedrooms}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.bathrooms && (
                                    <div className="flex items-center text-gray-600">
                                        <FiDroplet className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Bathrooms:</strong> {property.propertyDetailSchemaId.refId.bathrooms}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.balconies && (
                                    <div className="flex items-center text-gray-600">
                                        <FiHome className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Balconies:</strong> {property.propertyDetailSchemaId.refId.balconies}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.furnishing && (
                                    <div className="flex items-center text-gray-600">
                                        <FiHome className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Furnishing:</strong> {property.propertyDetailSchemaId.refId.furnishing}</span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                {property.propertyDetailSchemaId.refId.totalFloors && (
                                    <div className="flex items-center text-gray-600">
                                        <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Total Floors:</strong> {property.propertyDetailSchemaId.refId.totalFloors}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.floorNumber && (
                                    <div className="flex items-center text-gray-600">
                                        <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Floor Number:</strong> {property.propertyDetailSchemaId.refId.floorNumber}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.propertyAge !== undefined && (
                                    <div className="flex items-center text-gray-600">
                                        <FiHome className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Property Age:</strong> {property.propertyDetailSchemaId.refId.propertyAge} years</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.reservedParking && (
                                    <div className="flex items-center text-gray-600">
                                        <FiHome className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Parking:</strong> {property.propertyDetailSchemaId.refId.reservedParking}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {property.propertyDetailSchemaId.refId.otherRooms &&
                            property.propertyDetailSchemaId.refId.otherRooms.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="font-medium text-gray-700 mb-3">Other Rooms</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {property.propertyDetailSchemaId.refId.otherRooms.map((room, index) => (
                                            <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                                                {room}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            )}

            {/* Land/Plot Details Section */}
            {['Land', 'Plot'].includes(property.propertyType) && property.propertyDetailSchemaId?.refId && (
                <div className="space-y-4 mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800">{property.propertyType} Details</h2>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                {property.propertyDetailSchemaId.refId.lengthOfPlot && (
                                    <div className="flex items-center text-gray-600">
                                        <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Length:</strong> {property.propertyDetailSchemaId.refId.lengthOfPlot}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.breadthOfPlot && (
                                    <div className="flex items-center text-gray-600">
                                        <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Breadth:</strong> {property.propertyDetailSchemaId.refId.breadthOfPlot}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.floorsAllowed && (
                                    <div className="flex items-center text-gray-600">
                                        <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Floors Allowed:</strong> {property.propertyDetailSchemaId.refId.floorsAllowed}</span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                {property.propertyDetailSchemaId.refId.boundaryWall !== undefined && (
                                    <div className="flex items-center text-gray-600">
                                        <FiHome className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Boundary Wall:</strong> {property.propertyDetailSchemaId.refId.boundaryWall ? 'Yes' : 'No'}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.openSides !== undefined && (
                                    <div className="flex items-center text-gray-600">
                                        <FiHome className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Open Sides:</strong> {property.propertyDetailSchemaId.refId.openSides}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.constructionDone !== undefined && (
                                    <div className="flex items-center text-gray-600">
                                        <FiHome className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Construction Done:</strong> {property.propertyDetailSchemaId.refId.constructionDone ? 'Yes' : 'No'}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.possessionDate && (
                                    <div className="flex items-center text-gray-600">
                                        <FiHome className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Possession Date:</strong> {new Date(property.propertyDetailSchemaId.refId.possessionDate).toLocaleDateString()}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Retail Property Details Section */}
            {property.propertyType === 'Retail' && property.propertyDetailSchemaId?.refId && (
                <div className="space-y-4 mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800">Retail Details</h2>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                {property.propertyDetailSchemaId.refId.retailType && (
                                    <div className="flex items-center text-gray-600">
                                        <FiHome className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Retail Type:</strong> {property.propertyDetailSchemaId.refId.retailType}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.locationType && (
                                    <div className="flex items-center text-gray-600">
                                        <FiMapPin className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Location Type:</strong> {property.propertyDetailSchemaId.refId.locationType}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.entranceWidth && (
                                    <div className="flex items-center text-gray-600">
                                        <FiHome className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Entrance Width:</strong> {property.propertyDetailSchemaId.refId.entranceWidth}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.ceilingHeight && (
                                    <div className="flex items-center text-gray-600">
                                        <FiHome className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Ceiling Height:</strong> {property.propertyDetailSchemaId.refId.ceilingHeight}</span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                {property.propertyDetailSchemaId.refId.totalFloors && (
                                    <div className="flex items-center text-gray-600">
                                        <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Total Floors:</strong> {property.propertyDetailSchemaId.refId.totalFloors}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.propertyOnFloor && (
                                    <div className="flex items-center text-gray-600">
                                        <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Property On Floor:</strong> {property.propertyDetailSchemaId.refId.propertyOnFloor}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.washrooms && (
                                    <div className="flex items-center text-gray-600">
                                        <FiDroplet className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Washrooms:</strong> {property.propertyDetailSchemaId.refId.washrooms}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.parkingType && (
                                    <div className="flex items-center text-gray-600">
                                        <FiHome className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Parking Type:</strong> {property.propertyDetailSchemaId.refId.parkingType}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {property.propertyDetailSchemaId.refId.suitableForBusinessTypes && (
                            <div className="mt-6">
                                <h3 className="font-medium text-gray-700 mb-3">Suitable for Business Types</h3>
                                <p className="text-gray-600">{property.propertyDetailSchemaId.refId.suitableForBusinessTypes}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Storage Property Details Section */}
            {property.propertyType === 'Storage' && property.propertyDetailSchemaId?.refId && (
                <div className="space-y-4 mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800">Storage Details</h2>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                {property.propertyDetailSchemaId.refId.StorageType && (
                                    <div className="flex items-center text-gray-600">
                                        <FiHome className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Storage Type:</strong> {property.propertyDetailSchemaId.refId.StorageType}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.areaDetails?.plotArea && (
                                    <div className="flex items-center text-gray-600">
                                        <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Plot Area:</strong> {property.propertyDetailSchemaId.refId.areaDetails.plotArea} {property.propertyDetailSchemaId.refId.areaDetails.areaUnitForPlot}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.areaDetails?.carpetArea && (
                                    <div className="flex items-center text-gray-600">
                                        <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Carpet Area:</strong> {property.propertyDetailSchemaId.refId.areaDetails.carpetArea} {property.propertyDetailSchemaId.refId.areaDetails.areaUnitForCarpet}</span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                {property.propertyDetailSchemaId.refId.areaDetails?.builtUpArea && (
                                    <div className="flex items-center text-gray-600">
                                        <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Built-Up Area:</strong> {property.propertyDetailSchemaId.refId.areaDetails.builtUpArea} {property.propertyDetailSchemaId.refId.areaDetails.areaUnitForBuiltUp}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.washrooms && (
                                    <div className="flex items-center text-gray-600">
                                        <FiDroplet className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Washrooms:</strong> {property.propertyDetailSchemaId.refId.washrooms}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.availabilityStatus && (
                                    <div className="flex items-center text-gray-600">
                                        <FiLoader className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Availability Status:</strong> {property.propertyDetailSchemaId.refId.availabilityStatus}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Industry Property Details Section */}
            {property.propertyType === 'Industry' && property.propertyDetailSchemaId?.refId && (
                <div className="space-y-4 mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800">Industry Details</h2>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                {property.propertyDetailSchemaId.refId.IndustryType && (
                                    <div className="flex items-center text-gray-600">
                                        <FiHome className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Industry Type:</strong> {property.propertyDetailSchemaId.refId.IndustryType}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.areaDetails?.plotArea && (
                                    <div className="flex items-center text-gray-600">
                                        <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Plot Area:</strong> {property.propertyDetailSchemaId.refId.areaDetails.plotArea} {property.propertyDetailSchemaId.refId.areaDetails.areaUnitForPlot}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.areaDetails?.carpetArea && (
                                    <div className="flex items-center text-gray-600">
                                        <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Carpet Area:</strong> {property.propertyDetailSchemaId.refId.areaDetails.carpetArea} {property.propertyDetailSchemaId.refId.areaDetails.areaUnitForCarpet}</span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                {property.propertyDetailSchemaId.refId.areaDetails?.builtUpArea && (
                                    <div className="flex items-center text-gray-600">
                                        <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Built-Up Area:</strong> {property.propertyDetailSchemaId.refId.areaDetails.builtUpArea} {property.propertyDetailSchemaId.refId.areaDetails.areaUnitForBuiltUp}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.washrooms && (
                                    <div className="flex items-center text-gray-600">
                                        <FiDroplet className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Washrooms:</strong> {property.propertyDetailSchemaId.refId.washrooms}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.availabilityStatus && (
                                    <div className="flex items-center text-gray-600">
                                        <FiLoader className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Availability Status:</strong> {property.propertyDetailSchemaId.refId.availabilityStatus}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Others Property Details Section */}
            {property.propertyType === 'others' && property.propertyDetailSchemaId?.refId && (
                <div className="space-y-4 mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800">Other Property Details</h2>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                {property.propertyDetailSchemaId.refId.areaDetails?.plotArea && (
                                    <div className="flex items-center text-gray-600">
                                        <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Plot Area:</strong> {property.propertyDetailSchemaId.refId.areaDetails.plotArea} {property.propertyDetailSchemaId.refId.areaDetails.areaUnitForPlot}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.totalFloors && (
                                    <div className="flex items-center text-gray-600">
                                        <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Total Floors:</strong> {property.propertyDetailSchemaId.refId.totalFloors}</span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                {property.propertyDetailSchemaId.refId.propertyOnFloor && (
                                    <div className="flex items-center text-gray-600">
                                        <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Property On Floor:</strong> {property.propertyDetailSchemaId.refId.propertyOnFloor}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.availabilityStatus && (
                                    <div className="flex items-center text-gray-600">
                                        <FiLoader className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Availability Status:</strong> {property.propertyDetailSchemaId.refId.availabilityStatus}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {property.propertyDetailSchemaId.refId.otherRooms &&
                            property.propertyDetailSchemaId.refId.otherRooms.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="font-medium text-gray-700 mb-3">Other Rooms</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {property.propertyDetailSchemaId.refId.otherRooms.map((room, index) => (
                                            <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                                                {room}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            )}

            {/* Hospitality Property Details Section */}
            {property.propertyType === 'Hospitality' && property.propertyDetailSchemaId?.refId && (
                <div className="space-y-4 mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800">Hospitality Details</h2>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                {property.propertyDetailSchemaId.refId.HospitalityType && (
                                    <div className="flex items-center text-gray-600">
                                        <FiHome className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Hospitality Type:</strong> {property.propertyDetailSchemaId.refId.HospitalityType}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.totalRooms && (
                                    <div className="flex items-center text-gray-600">
                                        <FiHome className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Total Rooms:</strong> {property.propertyDetailSchemaId.refId.totalRooms}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.washrooms && (
                                    <div className="flex items-center text-gray-600">
                                        <FiDroplet className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Washrooms:</strong> {property.propertyDetailSchemaId.refId.washrooms}</span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                {property.propertyDetailSchemaId.refId.propertyOnFloor && (
                                    <div className="flex items-center text-gray-600">
                                        <FiLayers className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Property On Floor:</strong> {property.propertyDetailSchemaId.refId.propertyOnFloor}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.balconies && (
                                    <div className="flex items-center text-gray-600">
                                        <FiHome className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Balconies:</strong> {property.propertyDetailSchemaId.refId.balconies}</span>
                                    </div>
                                )}

                                {property.propertyDetailSchemaId.refId.availabilityStatus && (
                                    <div className="flex items-center text-gray-600">
                                        <FiLoader className="w-5 h-5 mr-2 text-primary" />
                                        <span><strong>Availability Status:</strong> {property.propertyDetailSchemaId.refId.availabilityStatus}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Feedback Section */}
            <div className="mt-16 ">
                <div className=" mx-auto w-[93%]">
                    <div className=" rounded-xl bg-white overflow-hidden ">
                        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800">Property Reviews & Feedback</h2>
                                    <p className="text-sm text-gray-500 mt-1">See what others are saying about this property</p>
                                </div>
                                {!showFeedbackForm && (
                                    <button
                                        onClick={() => setShowFeedbackForm(true)}
                                        className="px-4 py-2 bg-[#3a78ff] text-white rounded-lg hover:bg-[#2c5fb7] transition-colors flex items-center shadow-sm"
                                    >
                                        <FiStar className="mr-2" />
                                        Write a Review
                                    </button>
                                )}
                            </div>

                            {/* Feedback Form */}
                            {showFeedbackForm && (
                                <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-medium text-gray-800">Share Your Experience</h3>
                                        <button
                                            onClick={() => setShowFeedbackForm(false)}
                                            className="text-gray-500 hover:text-gray-700 bg-gray-200 rounded-full p-1.5 transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        </button>
                                    </div>

                                    <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                                            <div className="flex space-x-1 bg-white p-3 rounded-lg border border-gray-200">
                                                {renderStarRating(feedbackFormData.rating)}
                                                <span className="ml-2 text-sm text-gray-500">{feedbackFormData.rating}/5</span>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                                            <textarea
                                                id="comment"
                                                name="comment"
                                                rows="4"
                                                value={feedbackFormData.comment}
                                                onChange={handleFeedbackInputChange}
                                                placeholder="Share your experience with this property..."
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                                required
                                            ></textarea>
                                            <p className="mt-1 text-xs text-gray-500">Your honest feedback helps others make informed decisions</p>
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                                type="button"
                                                onClick={() => setShowFeedbackForm(false)}
                                                className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                                                disabled={feedbackSubmitting}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-[#3a78ff] text-white rounded-lg hover:bg-[#2c5fb7] transition-colors flex items-center"
                                                disabled={feedbackSubmitting}
                                            >
                                                {feedbackSubmitting ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Submitting...
                                                    </>
                                                ) : 'Submit Review'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>

                        {/* Feedback List */}
                        <div className="p-6">
                            {feedbackLoading ? (
                                <div className="flex justify-center items-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#3a78ff]"></div>
                                </div>
                            ) : feedbacks.length > 0 ? (
                                <div className="">
                                    {feedbacks.map((feedback) => (
                                        <div key={feedback._id} className="border-b pb-6 last:border-b-0 last:pb-0 hover:bg-gray-50 p-2  rounded-lg transition-colors">
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                                                    <FiUser className="h-5 w-5 text-blue-500" />
                                                </div>
                                                <div className="ml-3 flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="text-sm font-medium text-gray-900">{feedback.user?.firstName} {feedback.user?.lastName}</h4>
                                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{formatFeedbackDate(feedback.createdAt)}</span>
                                                    </div>
                                                    <div className="flex items-center mt-1">
                                                        <div className="flex">
                                                            {renderStaticStarRating(feedback.rating)}
                                                        </div>
                                                        <span className="ml-2 text-xs text-gray-500">{feedback.rating}/5</span>
                                                    </div>
                                                    <p className="mt-2 text-sm text-gray-600">{feedback.comment}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Pagination */}
                                    {totalFeedbackPages < 1 && (
                                        <div className="flex justify-center mt-6">
                                            <nav className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleFeedbackPageChange(feedbackPage - 1)}
                                                    disabled={feedbackPage === 1}
                                                    className={`px-3 py-1 rounded-md ${feedbackPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                                >
                                                    Previous
                                                </button>

                                                {[...Array(totalFeedbackPages)].map((_, index) => (
                                                    <button
                                                        key={index + 1}
                                                        onClick={() => handleFeedbackPageChange(index + 1)}
                                                        className={`px-3 py-1 rounded-md ${feedbackPage === index + 1 ? 'bg-[#3a78ff] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                                    >
                                                        {index + 1}
                                                    </button>
                                                ))}

                                                <button
                                                    onClick={() => handleFeedbackPageChange(feedbackPage + 1)}
                                                    disabled={feedbackPage === totalFeedbackPages}
                                                    className={`px-3 py-1 rounded-md ${feedbackPage === totalFeedbackPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                                >
                                                    Next
                                                </button>
                                            </nav>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-8 bg-gray-50 rounded-lg">
                                    <FiMessageSquare className="mx-auto h-12 w-12 text-gray-300" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews yet</h3>
                                    <p className="mt-1 text-sm text-gray-500">Be the first to share your experience with this property.</p>
                                    {!showFeedbackForm && (
                                        <div className="mt-6">
                                            <button
                                                onClick={() => setShowFeedbackForm(true)}
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#3a78ff] hover:bg-[#2c5fb7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Write a Review
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Similar Properties Section */}
            <div className="mt-10 ">
                {similarProperties.length > 0 && (
                    <CardCarousel
                        title="Similar Properties"
                        className="mt-10 px-3 md:px-10 pb-5 md:pb-10"
                    >
                        {similarProperties.map((property, index) => (
                            <div key={index} className="px-2">
                                <Card
                                    card={{
                                        image: `${process.env.REACT_APP_backendUrl}/storage/${property.propertyMedia.photos[0]}`,
                                        title: property.propertyTitle,
                                        price: property?.pricingDetails ?
                                            property?.transactionType === "Sell" ?
                                                property?.pricingDetails?.salePrice :
                                                property?.transactionType === "Rent" ?
                                                    property?.pricingDetails?.rent :
                                                    property?.pricingDetails?.pgPrice : "Price on request",
                                        location: `${property?.locationSchemaId?.locality || ''}, ${property?.locationSchemaId?.city || ''}`,
                                        _id: property?._id,
                                        transactionType: property.transactionType
                                    }}
                                />
                            </div>
                        ))}
                    </CardCarousel>
                )}
            </div>
        </div>
    )
}

export default PropertyProfile