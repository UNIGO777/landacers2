import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaBuilding, FaFilter, FaTrash, FaImage, FaCalendarAlt, FaTimes, FaEye, FaMapMarkerAlt, FaUser, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import ADMIN_API_ROUTES from '../../AdminRequestPath';
import Layout from '../Layout';

const FeaturedItem = () => {
  // State for featured items
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemType, setItemType] = useState('all'); // 'all', 'property', 'project'
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Fetch featured items from API
  const fetchFeaturedItems = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const params = {};
      
      // Add filters to params if selected
      if (itemType !== 'all') {
        params.itemType = itemType === 'property' ? 'Property' : 'Project';
      }
      
      if (showUpcoming) {
        setItemType('project');
        params.upcomming = 'true';
      }
      
      const response = await axios.get(
        `${process.env.REACT_APP_backendUrl}${ADMIN_API_ROUTES.GET_FEATURED_ITEMS(params)}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data) {
        setFeaturedItems(response.data.data || []);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch featured items');
      setFeaturedItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedItems();
  }, [itemType, showUpcoming]);

  // Open delete confirmation modal
  const openDeleteConfirmation = (item) => {
    setItemToDelete(item);
    setShowDeleteConfirmation(true);
  };

  // Handle delete item
  const handleDeleteItem = async () => {
    if (!itemToDelete) return;
    
    try {
      setSubmitting(true);
      const token = localStorage.getItem('adminToken');
      await axios.delete(
        `${process.env.REACT_APP_backendUrl}${ADMIN_API_ROUTES.DELETE_FEATURED_ITEM(itemToDelete._id)}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      toast.success('Featured item deleted successfully');
      fetchFeaturedItems(); // Refresh the list
      setShowDeleteConfirmation(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete featured item');
    } finally {
      setSubmitting(false);
      setItemToDelete(null);
    }
  };

  // Fetch property details
  const fetchPropertyDetails = async (propertyId) => {
    try {
      setLoadingDetails(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(
        `${process.env.REACT_APP_backendUrl}/api/properties/${propertyId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data) {
       
        setPropertyDetails(response.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch property details');
    } finally {
      setLoadingDetails(false);
    }
  };

  // View item details
  const viewItemDetails = (item) => {
    setSelectedItem(item);
    if (item.itemType === 'Property') {
      fetchPropertyDetails(item.itemId._id);
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

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">Featured Items</h1>
          <p className="text-gray-600 mt-2">View and manage featured properties and projects</p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm"
        >
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <FaFilter className="text-gray-500 mr-2" />
              <span className="text-gray-700 font-medium">Filter by:</span>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => setItemType('all')}
                className={`px-4 py-2 rounded-md transition-colors ${itemType === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                All
              </button>
              <button 
                onClick={() => setItemType('property')}
                className={`px-4 py-2 rounded-md transition-colors flex items-center ${itemType === 'property' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <FaHome className="mr-2" /> Properties
              </button>
              <button 
                onClick={() => setItemType('project')}
                className={`px-4 py-2 rounded-md transition-colors flex items-center ${itemType === 'project' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <FaBuilding className="mr-2" /> Projects
              </button>
            </div>
            
            <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showUpcoming} 
                  onChange={() => setShowUpcoming(!showUpcoming)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-700">Show Upcoming Projects Only</span>
              </label>
            </div>
          </div>
          
          <button 
            onClick={fetchFeaturedItems}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Refresh Items
          </button>
        </motion.div>

        {/* Featured Items Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  [...Array(3)].map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                      </td>
                    </tr>
                  ))
                ) : featuredItems.length > 0 ? (
                  featuredItems.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                            {item.itemType === 'Property' ? (
                              <FaHome className="h-5 w-5 text-blue-500" />
                            ) : (
                              <FaBuilding className="h-5 w-5 text-green-500" />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                              {item.itemType === 'Property' 
                                ? item.itemId.propertyTitle || 'Unnamed Property'
                                : item.itemId.projectName || 'Unnamed Project'}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <FaMapMarkerAlt className="mr-1 h-3 w-3" />
                              {item.itemType === 'Property' 
                                ? `${item.itemId.locationSchemaId?.locality || ''}, ${item.itemId.locationSchemaId?.city || ''}` 
                                : `${item.itemId.location?.locality || ''}, ${item.itemId.location?.city || ''}`}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${item.itemType === 'Property' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                          {item.itemType}
                        </span>
                        {item.itemId.isUpcomming && (
                          <span className="ml-2 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Upcoming
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(item.endDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${new Date(item.endDate) > new Date() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {new Date(item.endDate) > new Date() ? 'Active' : 'Expired'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => viewItemDetails(item)}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => openDeleteConfirmation(item)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center whitespace-nowrap">
                      <div className="text-sm text-gray-500">No featured items found</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirmation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-lg w-full max-w-md p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <FaTrash className="mx-auto h-12 w-12 text-red-500 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Featured Item</h3>
                  <p className="text-gray-500 mb-6">
                    Are you sure you want to delete this featured item? This action cannot be undone.
                  </p>
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() => setShowDeleteConfirmation(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteItem}
                      disabled={submitting}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                    >
                      {submitting ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Item Details Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"
              onClick={() => {
                setSelectedItem(null);
                setPropertyDetails(null);
              }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 15 }}
                className="relative w-full max-w-4xl p-6 mx-4 bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    setPropertyDetails(null);
                  }}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={20} />
                </button>

                {selectedItem.itemType === 'Property' ? (
                  // Property Details View
                  loadingDetails ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                  ) : propertyDetails ? (
                    <div>
                      <h2 className="mb-4 text-2xl font-bold text-gray-800">{propertyDetails.propertyTitle}</h2>
                      
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                          {propertyDetails.propertyMedia?.photos && propertyDetails.propertyMedia.photos.length > 0 ? (
                            <img
                              src={`${process.env.REACT_APP_backendUrl}/storage/${propertyDetails.propertyMedia.photos[0]}`}
                              alt={propertyDetails.propertyTitle}
                              className="object-cover w-full h-64 mb-4 rounded-lg"
                            />
                          ) : (
                            <div className="flex items-center justify-center w-full h-64 mb-4 bg-gray-200 rounded-lg">
                              <FaHome size={64} className="text-gray-400" />
                            </div>
                          )}

                          <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center">
                              <FaUser className="mr-2" /> Seller Information
                            </h3>
                            <div className="space-y-2">
                              <p className="text-gray-700">
                                <span className="font-medium">Name:</span> {propertyDetails.sellerId?.sellerDetails?.name || 'N/A'}
                              </p>
                              <p className="text-gray-700">
                                <span className="font-medium">Email:</span> {propertyDetails.sellerId?.sellerDetails?.email || 'N/A'}
                              </p>
                              <p className="text-gray-700">
                                <span className="font-medium">Commercial Property:</span> {propertyDetails.isCommercial ? 'Yes' : 'No'}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="mb-4 text-gray-600">{propertyDetails.description}</p>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h3 className="mb-2 text-lg font-semibold text-gray-700">Location</h3>
                              <p className="text-gray-600"><span className="font-medium">State:</span> {propertyDetails.locationSchemaId?.state}</p>
                              <p className="text-gray-600"><span className="font-medium">City:</span> {propertyDetails.locationSchemaId?.city}</p>
                              <p className="text-gray-600"><span className="font-medium">Locality:</span> {propertyDetails.locationSchemaId?.locality}</p>
                            </div>

                            <div>
                              <h3 className="mb-2 text-lg font-semibold text-gray-700">Basic Details</h3>
                              <p className="text-gray-600"><span className="font-medium">Type:</span> {propertyDetails.propertyType}</p>
                              <p className="text-gray-600"><span className="font-medium">Transaction:</span> {propertyDetails.transactionType}</p>
                              <p className="text-gray-600"><span className="font-medium">Status:</span> {propertyDetails.status}</p>
                              <p className="text-gray-600"><span className="font-medium">Available From:</span> {new Date(propertyDetails.availableFrom).toLocaleDateString()}</p>
                            </div>
                          </div>

                          <div className="mt-4">
                            <h3 className="mb-2 text-lg font-semibold text-gray-700">Price Details</h3>
                            {propertyDetails.transactionType === 'Sell' ? (
                              <p className="text-xl font-bold text-green-600">
                                ₹{propertyDetails.pricingDetails?.salePrice?.toLocaleString()}
                              </p>
                            ) : propertyDetails.transactionType === 'Rent' ? (
                              <p className="text-xl font-bold text-green-600">
                                ₹{propertyDetails.pricingDetails?.rent?.toLocaleString()}/month
                              </p>
                            ) : (
                              <p className="text-xl font-bold text-green-600">
                                ₹{propertyDetails.pricingDetails?.pgPrice?.toLocaleString()}/month
                              </p>
                            )}
                          </div>
                          
                          <div className="mt-4 flex items-center">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                              Featured until: {formatDate(selectedItem.endDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Failed to load property details</p>
                    </div>
                  )
                ) : (
                  // Project Details View
                  <div>
                    <h2 className="mb-4 text-2xl font-bold text-gray-800">{selectedItem.itemId.projectName}</h2>
                    
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        {selectedItem.itemId.images && selectedItem.itemId.images.length > 0 ? (
                          <img
                            src={`${process.env.REACT_APP_backendUrl}/storage/${selectedItem.itemId.images[0]}`}
                            alt={selectedItem.itemId.projectName}
                            className="object-cover w-full h-64 mb-4 rounded-lg"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-64 mb-4 bg-gray-200 rounded-lg">
                            <FaBuilding size={64} className="text-gray-400" />
                          </div>
                        )}

                        <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-200">
                          <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                            <FaUser className="mr-2" /> Builder Information
                          </h3>
                          <div className="space-y-2">
                            <p className="text-gray-700">
                              <span className="font-medium">Builder ID:</span> {selectedItem.itemId.sellerId}
                            </p>
                            <p className="text-gray-700">
                              <span className="font-medium">Status:</span> {selectedItem.itemId.status}
                            </p>
                            <p className="text-gray-700">
                              <span className="font-medium">Upcoming:</span> {selectedItem.itemId.isUpcomming ? 'Yes' : 'No'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="mb-4 text-gray-600">{selectedItem.itemId.description}</p>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-700">Location</h3>
                            <p className="text-gray-600"><span className="font-medium">State:</span> {selectedItem.itemId.location?.state}</p>
                            <p className="text-gray-600"><span className="font-medium">City:</span> {selectedItem.itemId.location?.city}</p>
                            <p className="text-gray-600"><span className="font-medium">Locality:</span> {selectedItem.itemId.location?.locality}</p>
                          </div>

                          <div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-700">Project Details</h3>
                            <p className="text-gray-600"><span className="font-medium">Type:</span> {selectedItem.itemId.projectType}</p>
                            <p className="text-gray-600"><span className="font-medium">Total Units:</span> {selectedItem.itemId.totalUnits}</p>
                            <p className="text-gray-600"><span className="font-medium">Available Units:</span> {selectedItem.itemId.availableUnits}</p>
                          </div>
                        </div>

                        <div className="mt-4">
                          <h3 className="mb-2 text-lg font-semibold text-gray-700">Timeline</h3>
                          <p className="text-gray-600">
                            <span className="font-medium">Launch Date:</span> {formatDate(selectedItem.itemId.launchDate)}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Completion Date:</span> {formatDate(selectedItem.itemId.completionDate)}
                          </p>
                        </div>
                        
                        {selectedItem.itemId.amenities && selectedItem.itemId.amenities.length > 0 && (
                          <div className="mt-4">
                            <h3 className="mb-2 text-lg font-semibold text-gray-700">Amenities</h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedItem.itemId.amenities.map((
                                amenity, index) => (
                                <span key={index} className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-4 flex items-center">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            Featured until: {formatDate(selectedItem.endDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default FeaturedItem;