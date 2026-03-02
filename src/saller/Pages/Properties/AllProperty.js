import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import PropertyListLoader from "../../components/loaders/PropertyListloader"
import notFound from "../../../Assets/Images/NotFound.png"
import {
  FaEye,
  FaCalendarAlt,
  FaDollarSign,
  FaTimes,
  FaFilter,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaChevronLeft,
  FaChevronRight,
  FaTrash,
  FaCheck,
  FaEnvelope,
  FaEdit
} from "react-icons/fa"
import Layout from "../../Layout"
import { getTypeIcon } from "../../data/PropertiesData"
import { propertyTypes } from "../../JsonData/propertyfeilds"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Popup from "../../../components/Popup/Popup"
import EditProperty from "./EditProperty"

const AllProperties = () => {
  const navigate = useNavigate()
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [filters, setFilters] = useState({
    type: "",
    status: "",
    transactionType: "",
    page: 1
  })
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState(null);
  const ITEMS_PER_PAGE = 20

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true)
      try {
        let url = `${process.env.REACT_APP_backendUrl}/api/properties/propertiesbyseller?page=${filters.page}&status=${filters.status || 'active'}`
        if (filters.type) {
          url += `&type=${filters.type}`
        }
        if (filters.transactionType) {
          url += `&transactionType=${filters.transactionType}`
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('sellerToken')}`
          }
        })
        setProperties(response.data.data)
        setTotalCount(response.data.pagination.totalProperties)
      } catch (error) {
        console.error("Error fetching properties:", error)
      }
      setLoading(false)
    }

    fetchProperties()
  }, [filters])

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "requested":
        return "bg-yellow-500"
      case "sold":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const openPropertyDetails = (property) => {
    setSelectedProperty(property)
  }

  const closePropertyDetails = () => {
    setSelectedProperty(null)
  }

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
      page: 1
    }))
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setFilters(prev => ({...prev, page: newPage}))
    }
  }

  const handleMarkAsSold = async (propertyId) => {
    if (window.confirm("Are you sure you want to mark this property as sold?")) {
      try {
        setLoading(true)
        await axios.put(`${process.env.REACT_APP_backendUrl}/api/properties/${propertyId}/mark-sold`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('sellerToken')}`
          }
        })
        window.location.reload()
      } catch (error) {
        console.error("Error marking property as sold:", error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleDeleteProperty = async (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property? This action cannot be undone.")) {
      try {
        setLoading(true)
        await axios.delete(`${process.env.REACT_APP_backendUrl}/api/properties/${propertyId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('sellerToken')}`
          }
        })
        window.location.reload()
      } catch (error) {
        console.error("Error deleting property:", error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleEditProperty = (property) => {
    setPropertyToEdit(property);
    setShowEditPopup(true);
  };

  const handleEditSuccess = () => {
    // Refresh the properties list after successful edit
    const fetchProperties = async () => {
      setLoading(true);
      try {
        let url = `${process.env.REACT_APP_backendUrl}/api/properties/propertiesbyseller?page=${filters.page}&status=${filters.status || 'active'}`;
        if (filters.type) {
          url += `&type=${filters.type}`;
        }
        if (filters.transactionType) {
          url += `&transactionType=${filters.transactionType}`;
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('sellerToken')}`
          }
        });
        setProperties(response.data.data);
        setTotalCount(response.data.pagination.totalProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
      setLoading(false);
    };

    fetchProperties();
    setShowEditPopup(false);
    setPropertyToEdit(null);
    toast.success("Property updated successfully and submitted for admin review");
  };

  return (
    <>
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-8 text-2xl md:text-4xl font-bold text-gray-800">Properties</h1>

        {/* Filter Section */}
        <div className="flex flex-row flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <FaFilter className="text-blue-500" />
            <span className="font-semibold text-gray-700">Filters:</span>
          </div>
          <select
            className="w-full md:w-auto px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
          >
            <option value="">All Types</option>
            {propertyTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.name}
              </option>
            ))}
          </select>
          <select
            className="w-full md:w-auto px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="active">Active</option>
            <option value="requested">Requested</option>
            <option value="sold">Sold</option>
          </select>
          <select
            className="w-full md:w-auto px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.transactionType}
            onChange={(e) => handleFilterChange("transactionType", e.target.value)}
          >
            <option value="">All Transaction Types</option>
            <option value="Sell">Sell</option>
            <option value="Rent">Rent</option>
            <option value="PG">PG</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <PropertyListLoader />
          ) : properties.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <img 
                src={notFound} 
                alt="No properties found"
                className="w-48 h-48 mb-6"
              />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Properties Found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters or add new properties</p>
              <Link 
                to="/saller/property/add" 
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add New Property
              </Link>
            </div>
          ) : (
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {properties.map((property) => (
                  <tr key={property?._id} className="hover:bg-gray-50">
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex items-center">
                        <img 
                          src={`${process.env.REACT_APP_backendUrl}/storage/${property?.propertyMedia?.photos?.[0]}` || "/placeholder.svg"}
                          alt={property?.propertyTitle}
                          className="h-12 w-12 md:h-16 md:w-16 object-cover rounded-lg mr-4"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{property?.propertyTitle}</div>
                          <div className="text-xs md:text-sm text-gray-500">{property?.propertyType}</div>
                          <div className="text-xs md:text-sm text-gray-500">{property?.transactionType}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex items-center text-xs md:text-sm text-gray-500">
                        <FaMapMarkerAlt className="mr-2 text-blue-500" />
                        <span>{`${property?.locationSchemaId?.city}, ${property?.locationSchemaId?.state}`}</span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(property?.status)} text-white`}>
                        {property?.status}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div className="text-xs md:text-sm font-semibold text-green-600">
                        {property?.transactionType === 'Sell' ? 
                          `₹${property?.pricingDetails?.salePrice?.toLocaleString()}` :
                          property?.transactionType === 'PG' ?
                          `₹${property?.pricingDetails?.pgPrice?.toLocaleString()}/month` :
                          `₹${property?.pricingDetails?.rent?.toLocaleString()}/month`
                        }
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openPropertyDetails(property)}
                          className="px-2 md:px-3 py-1 text-xs md:text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                        >
                          <FaEye className="inline mr-1" /> View
                        </button>
                        {(property.status === 'active' || property.status === 'requested') && (
                          <button
                            onClick={() => handleEditProperty(property)}
                            className="px-2 md:px-3 py-1 text-xs md:text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors"
                          >
                            <FaEdit className="inline mr-1" /> Edit
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Pagination Controls */}
          {properties.length > 0 && (
            <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
              <div className="flex justify-between flex-1 sm:hidden">
                <button
                  onClick={() => handlePageChange(filters.page - 1)}
                  disabled={filters.page === 1}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(filters.page + 1)}
                  disabled={filters.page === totalPages}
                  className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{((filters.page - 1) * ITEMS_PER_PAGE) + 1}</span> to{" "}
                    <span className="font-medium">
                      {Math.min(filters.page * ITEMS_PER_PAGE, totalCount)}
                    </span>{" "}
                    of <span className="font-medium">{totalCount}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <button
                      onClick={() => handlePageChange(filters.page - 1)}
                      disabled={filters.page === 1}
                      className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50"
                    >
                      <span className="sr-only">Previous</span>
                      <FaChevronLeft className="w-5 h-5" />
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border ${
                          filters.page === i + 1
                            ? 'z-10 bg-blue-500 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(filters.page + 1)}
                      disabled={filters.page === totalPages}
                      className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50"
                    >
                      <span className="sr-only">Next</span>
                      <FaChevronRight className="w-5 h-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-75 p-4"
            onClick={closePropertyDetails}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 15 }}
              className="w-full max-w-4xl p-4 md:p-6 overflow-y-auto bg-white rounded-lg max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl md:text-3xl font-bold text-gray-800">{selectedProperty?.propertyTitle}</h2>
                <button onClick={closePropertyDetails} className="text-gray-500 hover:text-gray-700">
                  <FaTimes size={24} />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <img
                    src={`${process.env.REACT_APP_backendUrl}/storage/${selectedProperty?.propertyMedia?.photos?.[0]}` || "/placeholder.svg"}
                    alt={selectedProperty?.propertyTitle}
                    className="object-cover w-full h-48 md:h-64 mb-4 rounded-lg"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    {selectedProperty?.propertyMedia?.photos?.slice(0, 4).map((image, index) => (
                      <img
                        key={index}
                        src={`${process.env.REACT_APP_backendUrl}/storage/${image}` || "/placeholder.svg"}
                        alt={`${selectedProperty?.propertyTitle} - Image ${index + 1}`}
                        className="object-cover w-full h-16 md:h-20 rounded-lg"
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-4 text-sm md:text-base text-gray-600">{selectedProperty?.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="mb-2 text-base md:text-lg font-semibold text-gray-700">Location</h3>
                      <p className="text-sm md:text-base text-gray-600">{selectedProperty?.locationSchemaId?.state}</p>
                      <p className="text-sm md:text-base text-gray-600">{selectedProperty?.locationSchemaId?.city}</p>
                      <p className="text-sm md:text-base text-gray-600">{selectedProperty?.locationSchemaId?.locality}</p>
                      <p className="text-sm md:text-base text-gray-600">{selectedProperty?.locationSchemaId?.subLocality}</p>
                      <p className="text-sm md:text-base text-gray-600">{selectedProperty?.locationSchemaId?.apartmentSociety}</p>
                      <p className="text-sm md:text-base text-gray-600">{selectedProperty?.locationSchemaId?.houseNo}</p>
                    </div>
                    <div>
                      <h3 className="mb-2 text-base md:text-lg font-semibold text-gray-700">Details</h3>
                      <p className="text-sm md:text-base text-gray-600">Type: {selectedProperty?.propertyType}</p>
                      <p className="text-sm md:text-base text-gray-600">Transaction: {selectedProperty?.transactionType}</p>
                      <p className="text-sm md:text-base text-gray-600">Status: {selectedProperty?.status}</p>
                      <p className="text-sm md:text-base text-gray-600">Commercial: {selectedProperty?.isCommercial ? 'Yes' : 'No'}</p>
                      <p className="text-sm md:text-base text-gray-600">Facing: {selectedProperty?.facingDirection}</p>
                      <p className="text-sm md:text-base text-gray-600">
                        Available From: {new Date(selectedProperty?.availableFrom).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="mb-2 text-base md:text-lg font-semibold text-gray-700">Price Details</h3>
                    {selectedProperty?.transactionType === 'Sell' ? (
                      <p className="text-xl md:text-2xl font-bold text-green-600">
                        ₹{selectedProperty?.pricingDetails?.salePrice?.toLocaleString()}
                      </p>
                    ) : selectedProperty?.transactionType === 'PG' ? (
                      <>
                        <p className="text-xl md:text-2xl font-bold text-green-600">
                          ₹{selectedProperty?.pricingDetails?.pgPrice?.toLocaleString()}/month
                        </p>
                        <p className="text-sm md:text-base text-gray-600">
                          Security Deposit: ₹{selectedProperty?.pricingDetails?.securityDeposit?.toLocaleString()}
                        </p>
                        <p className="text-sm md:text-base text-gray-600">
                          Food Included: {selectedProperty?.pricingDetails?.foodIncluded ? 'Yes' : 'No'}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-xl md:text-2xl font-bold text-green-600">
                          ₹{selectedProperty?.pricingDetails?.rent?.toLocaleString()}/month
                        </p>
                        <p className="text-sm md:text-base text-gray-600">
                          Security Deposit: ₹{selectedProperty?.pricingDetails?.securityDeposit?.toLocaleString()}
                        </p>
                      </>
                    )}
                  </div>
                  {selectedProperty.status === 'active' && (
                    <div className="flex flex-wrap gap-2 mt-6">
                      <button
                        onClick={() => {
                          handleMarkAsSold(selectedProperty._id);
                          closePropertyDetails();
                        }}
                        className="px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-green-500 border border-green-500 rounded-md hover:bg-green-600 hover:text-white transition-colors"
                      >
                        <FaCheck className="inline mr-1" /> Mark as Sold
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteProperty(selectedProperty._id);
                          closePropertyDetails();
                        }}
                        className="px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-red-500 border border-red-500 rounded-md hover:bg-red-600 hover:text-white transition-colors"
                      >
                        <FaTrash className="inline mr-1" /> Delete
                      </button>
                      <button
                        onClick={() => navigate(`/saller/queries/manage?itemId=${selectedProperty._id}&itemtype=property`)}
                        className="px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-purple-500 border border-purple-500 rounded-md hover:bg-purple-600 hover:text-white transition-colors"
                      >
                        <FaEnvelope className="inline mr-1" /> See Queries
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Property Popup */}
      <Popup isOpen={showEditPopup} onClose={() => setShowEditPopup(false)}>
        {propertyToEdit && (
          <EditProperty 
            property={propertyToEdit} 
            onClose={() => setShowEditPopup(false)} 
            onSuccess={handleEditSuccess}
          />
        )}
      </Popup>
    </>
  )
}

export default AllProperties
