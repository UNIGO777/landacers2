import React, { useState, useEffect, Fragment } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaEye,
  FaCalendarAlt,
  FaDollarSign,
  FaTimes,
  FaFilter,
  FaMapMarkerAlt,
  FaUser,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaSearch,
  FaBuilding,
  FaHome,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaTrash,
  FaStar
} from "react-icons/fa"
import Layout from "../../../Layout"
import axios from "axios"
import { toast } from "react-toastify"
import ADMIN_API_ROUTES from "../../../../AdminRequestPath"
import StateNames from '../../../../../Assets/StaticData/StateName'
import Cities from '../../../../../Assets/DynamicData/CityFatch'

const ManageProperties = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [propertiesPerPage] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [totalProperties, setTotalProperties] = useState(0)

  // State for confirmation modals
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [showApproveConfirmation, setShowApproveConfirmation] = useState(false)
  const [propertyToAction, setPropertyToAction] = useState(null)
  const [actionLoading, setActionLoading] = useState(false)
  
  // State for featured property modal
  const [showFeaturedModal, setShowFeaturedModal] = useState(false)
  const [featuredEndDate, setFeaturedEndDate] = useState("")
  const [dateError, setDateError] = useState("")

  // State for filters
  const [filters, setFilters] = useState({
    propertyType: "",
    status: "active",
    state: "",
    city: "",
    minPrice: "",
    maxPrice: "",
  })

  // State for city and state inputs
  const [stateInput, setStateInput] = useState('')
  const [filteredStates, setFilteredStates] = useState([])
  const [cityInput, setCityInput] = useState('')
  const [filteredCities, setFilteredCities] = useState([])
  const [filteredCitiesForFilter, setFilteredCitiesForFilter] = useState([])
  const [isCityDisabled, setIsCityDisabled] = useState(true)

  const propertyTypes = [
    { value: 'FlatApartment', label: 'Flat/Apartment' },
    { value: 'IndependentHouseVilla', label: 'Independent House/Villa' },
    { value: 'IndependentBuilderFloor', label: 'Independent/Builder Floor' },
    { value: 'Plot', label: 'Plot' },
    { value: 'Land', label: 'Land' },
    { value: 'RKStudioApartment', label: '1 RK/Studio Apartment' },
    { value: 'ServicedApartment', label: 'Serviced Apartment' },
    { value: 'Farmhouse', label: 'Farmhouse' },
    { value: 'Office', label: 'Office' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Storage', label: 'Storage' },
    { value: 'Industry', label: 'Industry' },
    { value: 'Hospitality', label: 'Hospitality' },
    { value: 'others', label: 'Others' }
  ]

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'sold', label: 'Sold' },
    { value: 'blocked', label: 'Blocked' },
    { value: 'requested', label: 'Requested' }
  ]

  // Fetch properties
  const fetchProperties = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("adminToken")

      const params = {
        propertyType: filters.propertyType,
        status: filters.status,
        city: filters.city,
        state: filters.state,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        page: currentPage
      }

      if (searchQuery) {
        params.query = searchQuery
      }

      const response = await axios.get(
        `${ADMIN_API_ROUTES.SEARCH_PROPERTIES(params)}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      if (response.data) {
        setProperties(response.data.data || [])
        setTotalPages(response.data.pagination?.totalPages || 1)
        setTotalProperties(response.data.pagination?.totalProperties || 0)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch properties")
      setProperties([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [currentPage, filters.status, filters.propertyType])

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchProperties()
  }

  // Handle filter change
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
    setCurrentPage(1)
  }

  // Handle state input change
  const handleStateInputChange = (event) => {
    const inputValue = event.target.value
    setStateInput(inputValue)
    if (inputValue) {
      const filtered = StateNames.filter(state =>
        state.toLowerCase().includes(inputValue.toLowerCase())
      )
      setFilteredStates(filtered)
    } else {
      setFilteredStates([])
    }
  }

  // Handle state selection
  const handleStateSelect = (state) => {
    setStateInput(state)
    setFilters(prev => ({ ...prev, state }))
    setFilteredStates([])
    setIsCityDisabled(false)
    setCityInput('')
    setFilters(prev => ({ ...prev, city: '' }))
    const filteredCities = Cities.filter(city => city.state === state)
    setFilteredCities(filteredCities)
    setFilteredCitiesForFilter(filteredCities)
  }

  // Handle city input change
  const handleCityInputChange = (event) => {
    const inputValue = event.target.value
    setCityInput(inputValue)
    if (inputValue) {
      const filtered = filteredCitiesForFilter.filter(city =>
        city.name.toLowerCase().includes(inputValue.toLowerCase())
      )
      setFilteredCities(filtered)
    } else {
      setFilteredCities([])
    }
  }

  // Handle city selection
  const handleCitySelect = (city) => {
    setCityInput(city)
    setFilters(prev => ({ ...prev, city }))
    setFilteredCities([])
  }

  // Pagination
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "sold":
        return "bg-blue-100 text-blue-800"
      case "blocked":
        return "bg-red-100 text-red-800"
      case "requested":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Open delete confirmation modal
  const openDeleteConfirmation = (property) => {
    setPropertyToAction(property)
    setShowDeleteConfirmation(true)
  }

  // Open approve confirmation modal
  const openApproveConfirmation = (property) => {
    setPropertyToAction(property)
    setShowApproveConfirmation(true)
  }
  
  // Open feature property modal
  const openFeatureModal = (property) => {
    setPropertyToAction(property)
    setShowFeaturedModal(true)
    setFeaturedEndDate("")
    setDateError("")
  }

  // Handle property approval
  const handleApproveProperty = async () => {
    if (!propertyToAction) return

    try {
      setActionLoading(true)
      const token = localStorage.getItem("adminToken")
      await axios.put(
        `${ADMIN_API_ROUTES.APPROVE_PROPERTY(propertyToAction._id)}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      toast.success("Property approved successfully")
      fetchProperties()
      setSelectedProperty(null)
      setShowApproveConfirmation(false)
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to approve property")
    } finally {
      setActionLoading(false)
      setPropertyToAction(null)
    }
  }

  // Handle property deletion
  const handleDeleteProperty = async () => {
    if (!propertyToAction) return

    try {
      setActionLoading(true)
      const token = localStorage.getItem("adminToken")
      await axios.delete(
        `${ADMIN_API_ROUTES.DELETE_PROPERTY(propertyToAction._id)}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      toast.success("Property deleted successfully")
      fetchProperties()
      setSelectedProperty(null)
      setShowDeleteConfirmation(false)
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete property")
    } finally {
      setActionLoading(false)
      setPropertyToAction(null)
    }
  }
  
  // Handle featuring a property
  const handleFeatureProperty = async () => {
    // Validate date format
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(featuredEndDate)) {
      setDateError('Invalid date format. Use DD/MM/YYYY');
      return;
    }

    // Parse date components
    const [day, month, year] = featuredEndDate.split('/').map(Number);
    const parsedEndDate = new Date(year, month - 1, day);
    
    // Check if date components match input (prevent Date auto-correction)
    if (parsedEndDate.getDate() !== day || 
        parsedEndDate.getMonth() + 1 !== month || 
        parsedEndDate.getFullYear() !== year) {
      setDateError('Invalid date values');
      return;
    }

    // Check if date is in future
    const now = new Date();
    if (parsedEndDate <= now) {
      setDateError('End date must be in the future');
      return;
    }

    try {
      setActionLoading(true);
      const token = localStorage.getItem("adminToken");
      
      const response = await axios.post(
        `${ADMIN_API_ROUTES.CREATE_FEATURED_ITEM}`,
        {
          itemType: 'Property',
          itemId: propertyToAction._id,
          endDate: featuredEndDate
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data) {
        toast.success("Property marked as featured successfully");
        fetchProperties(); // Refresh the list
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to mark property as featured");
      if (error.response?.data?.message) {
        setDateError(error.response.data.message);
      }
    } finally {
      setActionLoading(false);
      setShowFeaturedModal(false);
      setPropertyToAction(null);
    }
  }

  return (
    <Layout>
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Property Management</h2>
            <p className="mt-2 text-sm text-gray-600">
              View and manage all properties listed on the platform
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={fetchProperties}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Refresh Properties
            </button>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm">
          {/* Search and Filters */}
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <form onSubmit={handleSearchSubmit} className="flex w-full max-w-md">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaSearch className="w-4 h-4 text-gray-500" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search properties by title, location..."
                />
                <button
                  type="submit"
                  className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-600 rounded-r-lg border border-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  <FaSearch className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="flex gap-2   items-center space-x-1">
              <div className="flex items-center space-x-2 ">
                <FaFilter className="w-4 h-4 text-gray-500" />
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center  space-x-2">
                <FaHome className="w-4 h-4 text-gray-500" />
                <select
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange("propertyType", e.target.value)}
                  className="bg-gray-50 border  border-gray-300 max-w-[75%] md:max-w-[100%] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                >
                  <option value="">All Property Types</option>
                  {propertyTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Location Filters */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                placeholder="Search state..."
                value={stateInput}
                onChange={handleStateInputChange}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              {filteredStates.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
                  {filteredStates.map((state) => (
                    <div
                      key={state}
                      className="px-4 py-2 text-gray-600 hover:bg-blue-50 cursor-pointer transition-colors border-b last:border-b-0 text-sm"
                      onClick={() => handleStateSelect(state)}
                    >
                      {state}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                placeholder="Search city..."
                value={cityInput}
                onChange={handleCityInputChange}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:opacity-50"
                disabled={isCityDisabled}
              />
              {filteredCities.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
                  {filteredCities.map((city) => (
                    <div
                      key={city.name}
                      className="px-4 py-2 text-gray-600 hover:bg-blue-50 cursor-pointer transition-colors border-b last:border-b-0 text-sm"
                      onClick={() => handleCitySelect(city.name)}
                    >
                      {city.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Price Range Filters */}


          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                setFilters({
                  propertyType: "",
                  status: "active",
                  state: "",
                  city: "",

                });
                setStateInput("");
                setCityInput("");
                setIsCityDisabled(true);
                setCurrentPage(1);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 mr-2"
            >
              Reset Filters
            </button>
            <button
              onClick={fetchProperties}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>

          {/* Properties Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Property
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  [...Array(5)].map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                          <div className="ml-4">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
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
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                      </td>
                    </tr>
                  ))
                ) : properties.length > 0 ? (
                  properties.map((property) => (
                    <tr key={property._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {property?.propertyMedia?.photos && property.propertyMedia.photos.length > 0 ? (
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={`https://api.landacre.in/storage/${property.propertyMedia.photos[0]}`}
                                alt={property.propertyTitle}
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <FaHome className="text-gray-500" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{property.propertyTitle}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {property.locationSchemaId?.city}, {property?.locationSchemaId?.state && `${property?.locationSchemaId?.state},`} {property.locationSchemaId?.locality}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{property.propertyType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          ₹{property.pricingDetails?.salePrice?.toLocaleString() ||
                            property.pricingDetails?.rent?.toLocaleString() ||
                            property.pricingDetails?.pgPrice?.toLocaleString() || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(property.status)}`}>
                          {property.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => setSelectedProperty(property)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View
                          </button>
                          

                          
                          

                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center whitespace-nowrap">
                      <div className="text-sm text-gray-500">No properties found</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {properties.length > 0 && (
            <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
              <div className="flex items-center">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{((currentPage - 1) * propertiesPerPage) + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * propertiesPerPage, totalProperties)}
                  </span>{" "}
                  of <span className="font-medium">{totalProperties}</span> properties
                </p>
              </div>
              <div>
                <nav className="inline-flex -space-x-px rounded-md shadow-sm isolate" aria-label="Pagination">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 text-gray-400 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    <FaChevronLeft className="h-5 w-5" />
                  </button>
                  {[...Array(Math.min(5, totalPages))].map((_, index) => {
                    const pageNumber = currentPage <= 3
                      ? index + 1
                      : currentPage >= totalPages - 2
                        ? totalPages - 4 + index
                        : currentPage - 2 + index;

                    if (pageNumber > 0 && pageNumber <= totalPages) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => paginate(pageNumber)}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === pageNumber
                            ? "z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                            }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    }
                    return null;
                  })}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 text-gray-400 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    <FaChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          )}
        </div>

        {/* Property Details Modal */}
        <AnimatePresence>
          {selectedProperty && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 -top-10 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"
              onClick={() => setSelectedProperty(null)}
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
                  onClick={() => setSelectedProperty(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={20} />
                </button>

                <h2 className="mb-4 text-2xl font-bold text-gray-800">{selectedProperty.propertyTitle}</h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    {selectedProperty.propertyMedia?.photos && selectedProperty.propertyMedia.photos.length > 0 ? (
                      <img
                        src={`https://api.landacre.in/storage/${selectedProperty.propertyMedia.photos[0]}`}
                        alt={selectedProperty.propertyTitle}
                        className="object-cover w-full h-64 mb-4 rounded-lg"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-64 mb-4 bg-gray-200 rounded-lg">
                        <FaHome size={64} className="text-gray-400" />
                      </div>
                    )}

                    {selectedProperty.propertyMedia?.photos && selectedProperty.propertyMedia.photos.length > 1 && (
                      <div className="grid grid-cols-3 gap-2">
                        {selectedProperty.propertyMedia.photos.slice(1, 4).map((photo, index) => (
                          <img
                            key={index}
                            src={`https://api.landacre.in/storage/${photo}`}
                            alt={`${selectedProperty.propertyTitle} - Image ${index + 2}`}
                            className="object-cover w-full h-20 rounded-lg"
                          />
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center">
                        <FaUser className="mr-2" /> Seller Information
                      </h3>
                      <div className="space-y-2">
                        <p className="text-gray-700">
                          <span className="font-medium">Name:</span> {selectedProperty.sellerId?.sellerDetails?.name || 'N/A'}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Email:</span> {selectedProperty.sellerId?.sellerDetails?.email || 'N/A'}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Commercial Property:</span> {selectedProperty.isCommercial ? 'Yes' : 'No'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="mb-4 text-gray-600">{selectedProperty.description}</p>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-700">Location</h3>
                        <p className="text-gray-600"><span className="font-medium">State:</span> {selectedProperty.locationSchemaId?.state}</p>
                        <p className="text-gray-600"><span className="font-medium">City:</span> {selectedProperty.locationSchemaId?.city}</p>
                        <p className="text-gray-600"><span className="font-medium">Locality:</span> {selectedProperty.locationSchemaId?.locality}</p>
                        {selectedProperty.locationSchemaId?.subLocality && (
                          <p className="text-gray-600"><span className="font-medium">Sub-locality:</span> {selectedProperty.locationSchemaId.subLocality}</p>
                        )}
                        {selectedProperty.locationSchemaId?.apartmentSociety && (
                          <p className="text-gray-600"><span className="font-medium">Society/Apartment:</span> {selectedProperty.locationSchemaId.apartmentSociety}</p>
                        )}
                        {selectedProperty.locationSchemaId?.houseNo && (
                          <p className="text-gray-600"><span className="font-medium">House/Flat No:</span> {selectedProperty.locationSchemaId.houseNo}</p>
                        )}
                      </div>

                      <div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-700">Basic Details</h3>
                        <p className="text-gray-600"><span className="font-medium">Type:</span> {selectedProperty.propertyType}</p>
                        <p className="text-gray-600"><span className="font-medium">Transaction:</span> {selectedProperty.transactionType}</p>
                        <p className="text-gray-600"><span className="font-medium">Status:</span> {selectedProperty.status}</p>
                        <p className="text-gray-600"><span className="font-medium">Available From:</span> {new Date(selectedProperty.availableFrom).toLocaleDateString()}</p>
                        <p className="text-gray-600"><span className="font-medium">Facing Direction:</span> {selectedProperty.facingDirection}</p>
                        <p className="text-gray-600"><span className="font-medium">Listed on:</span> {new Date(selectedProperty.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className="mb-2 text-lg font-semibold text-gray-700">Price Details</h3>
                      {selectedProperty.transactionType === 'Sell' ? (
                        <p className="text-xl font-bold text-green-600">
                          ₹{selectedProperty.pricingDetails?.salePrice?.toLocaleString()}
                        </p>
                      ) : selectedProperty.transactionType === 'Rent' ? (
                        <>
                          <p className="text-xl font-bold text-green-600">
                            ₹{selectedProperty.pricingDetails?.rent?.toLocaleString()}/month
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Security Deposit:</span> ₹{selectedProperty.pricingDetails?.securityDeposit?.toLocaleString()}
                          </p>
                          {selectedProperty.willingToRentOut && (
                            <p className="text-gray-600">
                              <span className="font-medium">Willing to Rent Out to:</span> {selectedProperty.willingToRentOut}
                            </p>
                          )}
                        </>
                      ) : (
                        <>
                          <p className="text-xl font-bold text-green-600">
                            ₹{selectedProperty.pricingDetails?.pgPrice?.toLocaleString()}/month
                          </p>
                          {selectedProperty.pricingDetails?.foodIncluded && (
                            <p className="text-gray-600">
                              <span className="font-medium">Food Included:</span> Yes
                            </p>
                          )}
                          {selectedProperty.availableFor && (
                            <p className="text-gray-600">
                              <span className="font-medium">Available For:</span> {selectedProperty.availableFor}
                            </p>
                          )}
                          {selectedProperty.suitableFor && (
                            <p className="text-gray-600">
                              <span className="font-medium">Suitable For:</span> {selectedProperty.suitableFor}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                    
                    {/* Property Type Specific Details */}
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Property Specific Details
                      </h3>
                      
                      {selectedProperty.propertyDetailSchemaId?.refId && (
                        <div className="space-y-2">
                          {/* Residential Properties */}
                          {['FlatApartment', 'IndependentHouseVilla', 'IndependentBuilderFloor', 'RKStudioApartment', 'ServicedApartment', 'Farmhouse'].includes(selectedProperty.propertyType) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {selectedProperty.propertyDetailSchemaId.refId.bedrooms && (
                                <p className="text-gray-700"><span className="font-medium">Bedrooms:</span> {selectedProperty.propertyDetailSchemaId.refId.bedrooms}</p>
                              )}
                              {selectedProperty.propertyDetailSchemaId.refId.bathrooms && (
                                <p className="text-gray-700"><span className="font-medium">Bathrooms:</span> {selectedProperty.propertyDetailSchemaId.refId.bathrooms}</p>
                              )}
                              {selectedProperty.propertyDetailSchemaId.refId.balconies && (
                                <p className="text-gray-700"><span className="font-medium">Balconies:</span> {selectedProperty.propertyDetailSchemaId.refId.balconies}</p>
                              )}
                              {selectedProperty.propertyDetailSchemaId.refId.totalFloors && (
                                <p className="text-gray-700"><span className="font-medium">Total Floors:</span> {selectedProperty.propertyDetailSchemaId.refId.totalFloors}</p>
                              )}
                              {selectedProperty.propertyDetailSchemaId.refId.floorNumber && (
                                <p className="text-gray-700"><span className="font-medium">Floor Number:</span> {selectedProperty.propertyDetailSchemaId.refId.floorNumber}</p>
                              )}
                              {selectedProperty.propertyDetailSchemaId.refId.propertyOnFloor && (
                                <p className="text-gray-700"><span className="font-medium">Property On Floor:</span> {selectedProperty.propertyDetailSchemaId.refId.propertyOnFloor}</p>
                              )}
                              {selectedProperty.propertyDetailSchemaId.refId.furnishing && (
                                <p className="text-gray-700"><span className="font-medium">Furnishing:</span> {selectedProperty.propertyDetailSchemaId.refId.furnishing}</p>
                              )}
                              {selectedProperty.propertyDetailSchemaId.refId.reservedParking && (
                                <p className="text-gray-700"><span className="font-medium">Parking:</span> {selectedProperty.propertyDetailSchemaId.refId.reservedParking}</p>
                              )}
                              {selectedProperty.propertyDetailSchemaId.refId.availabilityStatus && (
                                <p className="text-gray-700"><span className="font-medium">Availability:</span> {selectedProperty.propertyDetailSchemaId.refId.availabilityStatus}</p>
                              )}
                              {selectedProperty.propertyDetailSchemaId.refId.propertyAge && (
                                <p className="text-gray-700"><span className="font-medium">Property Age:</span> {selectedProperty.propertyDetailSchemaId.refId.propertyAge} years</p>
                              )}
                              {selectedProperty.propertyDetailSchemaId.refId.floorType && (
                                <p className="text-gray-700"><span className="font-medium">Floor Type:</span> {selectedProperty.propertyDetailSchemaId.refId.floorType}</p>
                              )}
                            </div>
                          )}
                          
                          {/* Land and Plot Properties */}
                          {['Land', 'Plot'].includes(selectedProperty.propertyType) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {selectedProperty.propertyDetailSchemaId.refId.plotType && (
                                <p className="text-gray-700"><span className="font-medium">Plot Type:</span> {selectedProperty.propertyDetailSchemaId.refId.plotType}</p>
                              )}
                              {selectedProperty.propertyDetailSchemaId.refId.landType && (
                                <p className="text-gray-700"><span className="font-medium">Land Type:</span> {selectedProperty.propertyDetailSchemaId.refId.landType}</p>
                              )}
                              {selectedProperty.propertyDetailSchemaId.refId.commercialType && (
                                <p className="text-gray-700"><span className="font-medium">Commercial Type:</span> {selectedProperty.propertyDetailSchemaId.refId.commercialType}</p>
                              )}
                              {selectedProperty.propertyDetailSchemaId.refId.lengthOfPlot && (
                                <p className="text-gray-700"><span className="font-medium">Length:</span> {selectedProperty.propertyDetailSchemaId.refId.lengthOfPlot}</p>
                              )}
                              {selectedProperty.propertyDetailSchemaId.refId.breadthOfPlot && (
                                <p className="text-gray-700"><span className="font-medium">Breadth:</span> {selectedProperty.propertyDetailSchemaId.refId.breadthOfPlot}</p>
                              )}
                              {selectedProperty.propertyDetailSchemaId.refId.floorsAllowed && (
                                <p className="text-gray-700"><span className="font-medium">Floors Allowed:</span> {selectedProperty.propertyDetailSchemaId.refId.floorsAllowed}</p>
                              )}
                              {selectedProperty.propertyDetailSchemaId.refId.boundaryWall !== undefined && (
                                <p className="text-gray-700"><span className="font-medium">Boundary Wall:</span> {selectedProperty.propertyDetailSchemaId.refId.boundaryWall ? 'Yes' : 'No'}</p>
                              )}
                              {selectedProperty.propertyDetailSchemaId.refId.openSides && (
                                <p className="text-gray-700"><span className="font-medium">Open Sides:</span> {selectedProperty.propertyDetailSchemaId.refId.openSides}</p>
                              )}
                              {selectedProperty.propertyDetailSchemaId.refId.constructionDone !== undefined && (
                                <p className="text-gray-700"><span className="font-medium">Construction Done:</span> {selectedProperty.propertyDetailSchemaId.refId.constructionDone ? 'Yes' : 'No'}</p>
                              )}
                              {selectedProperty.propertyDetailSchemaId.refId.possessionDate && (
                                <p className="text-gray-700"><span className="font-medium">Possession Date:</span> {new Date(selectedProperty.propertyDetailSchemaId.refId.possessionDate).toLocaleDateString()}</p>
                              )}
                            </div>
                          )}
                          
                          {/* Commercial Properties */}
                          {['Office', 'Retail', 'Storage', 'Industry', 'Hospitality'].includes(selectedProperty.propertyType) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {/* Office Specific */}
                              {selectedProperty.propertyType === 'Office' && (
                                <>
                                  {selectedProperty.propertyDetailSchemaId.refId.WhatKindOfOfficeIsit && (
                                    <p className="text-gray-700"><span className="font-medium">Office Type:</span> {selectedProperty.propertyDetailSchemaId.refId.WhatKindOfOfficeIsit}</p>
                                  )}
                                  {selectedProperty.propertyDetailSchemaId.refId.constructionStatus && (
                                    <p className="text-gray-700"><span className="font-medium">Construction Status:</span> {selectedProperty.propertyDetailSchemaId.refId.constructionStatus}</p>
                                  )}
                                  {selectedProperty.propertyDetailSchemaId.refId.minSeats && (
                                    <p className="text-gray-700"><span className="font-medium">Min Seats:</span> {selectedProperty.propertyDetailSchemaId.refId.minSeats}</p>
                                  )}
                                  {selectedProperty.propertyDetailSchemaId.refId.maxSeats && (
                                    <p className="text-gray-700"><span className="font-medium">Max Seats:</span> {selectedProperty.propertyDetailSchemaId.refId.maxSeats}</p>
                                  )}
                                  {selectedProperty.propertyDetailSchemaId.refId.cabins && (
                                    <p className="text-gray-700"><span className="font-medium">Cabins:</span> {selectedProperty.propertyDetailSchemaId.refId.cabins}</p>
                                  )}
                                  {selectedProperty.propertyDetailSchemaId.refId.meetingRooms && (
                                    <p className="text-gray-700"><span className="font-medium">Meeting Rooms:</span> {selectedProperty.propertyDetailSchemaId.refId.meetingRooms}</p>
                                  )}
                                </>
                              )}
                              
                              {/* Retail Specific */}
                              {selectedProperty.propertyType === 'Retail' && (
                                <>
                                  {selectedProperty.propertyDetailSchemaId.refId.retailType && (
                                    <p className="text-gray-700"><span className="font-medium">Retail Type:</span> {selectedProperty.propertyDetailSchemaId.refId.retailType}</p>
                                  )}
                                  {selectedProperty.propertyDetailSchemaId.refId.locationType && (
                                    <p className="text-gray-700"><span className="font-medium">Location Type:</span> {selectedProperty.propertyDetailSchemaId.refId.locationType}</p>
                                  )}
                                  {selectedProperty.propertyDetailSchemaId.refId.entranceWidth && (
                                    <p className="text-gray-700"><span className="font-medium">Entrance Width:</span> {selectedProperty.propertyDetailSchemaId.refId.entranceWidth}</p>
                                  )}
                                  {selectedProperty.propertyDetailSchemaId.refId.ceilingHeight && (
                                    <p className="text-gray-700"><span className="font-medium">Ceiling Height:</span> {selectedProperty.propertyDetailSchemaId.refId.ceilingHeight}</p>
                                  )}
                                  {selectedProperty.propertyDetailSchemaId.refId.parkingType && (
                                    <p className="text-gray-700"><span className="font-medium">Parking Type:</span> {selectedProperty.propertyDetailSchemaId.refId.parkingType}</p>
                                  )}
                                </>
                              )}
                              
                              {/* Storage Specific */}
                              {selectedProperty.propertyType === 'Storage' && (
                                <>
                                  {selectedProperty.propertyDetailSchemaId.refId.StorageType && (
                                    <p className="text-gray-700"><span className="font-medium">Storage Type:</span> {selectedProperty.propertyDetailSchemaId.refId.StorageType}</p>
                                  )}
                                  {selectedProperty.propertyDetailSchemaId.refId.washrooms && (
                                    <p className="text-gray-700"><span className="font-medium">Washrooms:</span> {selectedProperty.propertyDetailSchemaId.refId.washrooms}</p>
                                  )}
                                </>
                              )}
                              
                              {/* Industry Specific */}
                              {selectedProperty.propertyType === 'Industry' && (
                                <>
                                  {selectedProperty.propertyDetailSchemaId.refId.IndustryType && (
                                    <p className="text-gray-700"><span className="font-medium">Industry Type:</span> {selectedProperty.propertyDetailSchemaId.refId.IndustryType}</p>
                                  )}
                                  {selectedProperty.propertyDetailSchemaId.refId.washrooms && (
                                    <p className="text-gray-700"><span className="font-medium">Washrooms:</span> {selectedProperty.propertyDetailSchemaId.refId.washrooms}</p>
                                  )}
                                </>
                              )}
                              
                              {/* Hospitality Specific */}
                              {selectedProperty.propertyType === 'Hospitality' && (
                                <>
                                  {selectedProperty.propertyDetailSchemaId.refId.HospitalityType && (
                                    <p className="text-gray-700"><span className="font-medium">Hospitality Type:</span> {selectedProperty.propertyDetailSchemaId.refId.HospitalityType}</p>
                                  )}
                                  {selectedProperty.propertyDetailSchemaId.refId.totalRooms && (
                                    <p className="text-gray-700"><span className="font-medium">Total Rooms:</span> {selectedProperty.propertyDetailSchemaId.refId.totalRooms}</p>
                                  )}
                                  {selectedProperty.propertyDetailSchemaId.refId.washrooms && (
                                    <p className="text-gray-700"><span className="font-medium">Washrooms:</span> {selectedProperty.propertyDetailSchemaId.refId.washrooms}</p>
                                  )}
                                  {selectedProperty.propertyDetailSchemaId.refId.furnishing && (
                                    <p className="text-gray-700"><span className="font-medium">Furnishing:</span> {selectedProperty.propertyDetailSchemaId.refId.furnishing}</p>
                                  )}
                                </>
                              )}
                              
                              {/* Common for all commercial properties */}
                              {selectedProperty.propertyDetailSchemaId.refId.availabilityStatus && (
                                <p className="text-gray-700"><span className="font-medium">Availability Status:</span> {selectedProperty.propertyDetailSchemaId.refId.availabilityStatus}</p>
                              )}
                              {selectedProperty.propertyDetailSchemaId.refId.totalFloors && (
                                <p className="text-gray-700"><span className="font-medium">Total Floors:</span> {selectedProperty.propertyDetailSchemaId.refId.totalFloors}</p>
                              )}
                            </div>
                          )}
                          
                          {/* Area Details for all property types */}
                          {selectedProperty.propertyDetailSchemaId.refId.areaDetails && (
                            <div className="mt-3">
                              <h4 className="font-medium text-gray-800 mb-2">Area Details</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {selectedProperty.propertyDetailSchemaId.refId.areaDetails.carpetArea && (
                                  <p className="text-gray-700">
                                    <span className="font-medium">Carpet Area:</span> {selectedProperty.propertyDetailSchemaId.refId.areaDetails.carpetArea} {selectedProperty.propertyDetailSchemaId.refId.areaDetails.areaUnitForCarpet || ''}
                                  </p>
                                )}
                                {selectedProperty.propertyDetailSchemaId.refId.areaDetails.builtUpArea && (
                                  <p className="text-gray-700">
                                    <span className="font-medium">Built-Up Area:</span> {selectedProperty.propertyDetailSchemaId.refId.areaDetails.builtUpArea} {selectedProperty.propertyDetailSchemaId.refId.areaDetails.areaUnitForBuiltUp || ''}
                                  </p>
                                )}
                                {selectedProperty.propertyDetailSchemaId.refId.areaDetails.superBuiltUpArea && (
                                  <p className="text-gray-700">
                                    <span className="font-medium">Super Built-Up Area:</span> {selectedProperty.propertyDetailSchemaId.refId.areaDetails.superBuiltUpArea} {selectedProperty.propertyDetailSchemaId.refId.areaDetails.areaUnitForSuperBuiltUp || ''}
                                  </p>
                                )}
                                {selectedProperty.propertyDetailSchemaId.refId.areaDetails.plotArea && (
                                  <p className="text-gray-700">
                                    <span className="font-medium">Plot Area:</span> {selectedProperty.propertyDetailSchemaId.refId.areaDetails.plotArea} {selectedProperty.propertyDetailSchemaId.refId.areaDetails.areaUnitForPlot || ''}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                          
                          {/* Furnishing Items if available */}
                          {selectedProperty.propertyDetailSchemaId.refId.furnishingItems && selectedProperty.propertyDetailSchemaId.refId.furnishingItems.length > 0 && (
                            <div className="mt-3">
                              <h4 className="font-medium text-gray-800 mb-2">Furnishing Items</h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedProperty.propertyDetailSchemaId.refId.furnishingItems.map((item, index) => {
                                  let items = [];
                                  try {
                                    items = JSON.parse(item);
                                  } catch (e) {
                                    // If parsing fails, use the item as is
                                    if (typeof item === 'string') {
                                      items = [item];
                                    }
                                  }
                                  
                                  return Array.isArray(items) ? items.map((furnishItem, idx) => (
                                    <span key={`${index}-${idx}`} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm">
                                      {furnishItem}
                                    </span>
                                  )) : null;
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {selectedProperty.status === 'requested' && (
                      <div className="flex mt-6 space-x-4">
                        <button
                          onClick={() => openApproveConfirmation(selectedProperty)}
                          className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                        >
                          <FaCheck className="inline mr-2" /> Approve Property
                        </button>
                        <button
                          onClick={() => openDeleteConfirmation(selectedProperty)}
                          className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                        >
                          <FaTrash className="inline mr-2" /> Delete Property
                        </button>
                      </div>
                    )}

                    {selectedProperty.status === 'active' && (
                      <div className="flex mt-6 space-x-4">
                        <button
                          onClick={() => openDeleteConfirmation(selectedProperty)}
                          className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                        >
                          <FaTrash className="inline mr-2" /> Delete Property
                        </button>
                        {selectedProperty.status === "active" && (
                            <button
                              onClick={() => openFeatureModal(selectedProperty)}
                              className="bg-purple-600 flex items-center gap-1 text-white rounded-md px-2 py-2 hover:bg-purple-900 ml-3"
                            >
                              <FaStar></FaStar> Make Featured
                            </button>
                          )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Delete Confirmation Modal */}
                <AnimatePresence>
                  {showDeleteConfirmation && propertyToAction && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"
                    >
                      <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 15 }}
                        className="relative w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h3 className="mb-4 text-xl font-bold text-gray-800">Confirm Deletion</h3>
                        <p className="mb-6 text-gray-600">
                          Are you sure you want to delete the property "{propertyToAction.propertyTitle}"? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-4">
                          <button
                            onClick={() => {
                              setShowDeleteConfirmation(false);
                              setPropertyToAction(null);
                            }}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                            disabled={actionLoading}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleDeleteProperty}
                            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center"
                            disabled={actionLoading}
                          >
                            {actionLoading ? (
                              <>
                                <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Deleting...
                              </>
                            ) : (
                              <>
                                <FaTrash className="inline mr-2" /> Delete Property
                              </>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Approve Confirmation Modal */}
                <AnimatePresence>
                  {showApproveConfirmation && propertyToAction && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"
                    >
                      <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 15 }}
                        className="relative w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h3 className="mb-4 text-xl font-bold text-gray-800">Confirm Approval</h3>
                        <p className="mb-6 text-gray-600">
                          Are you sure you want to approve the property "{propertyToAction.propertyTitle}"? This will make it visible to all users.
                        </p>
                        <div className="flex justify-end space-x-4">
                          <button
                            onClick={() => {
                              setShowApproveConfirmation(false);
                              setPropertyToAction(null);
                            }}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                            disabled={actionLoading}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleApproveProperty}
                            className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center"
                            disabled={actionLoading}
                          >
                            {actionLoading ? (
                              <>
                                <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Approving...
                              </>
                            ) : (
                              <>
                                <FaCheck className="inline mr-2" /> Approve Property
                              </>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Featured Property Modal */}
        <AnimatePresence>
          {showFeaturedModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaStar className="text-yellow-500 mr-2" /> Mark Property as Featured
                </h3>
                <p className="text-gray-600 mb-6">
                  This property will be displayed in the featured section until the specified end date.
                </p>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date (DD/MM/YYYY)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCalendarAlt className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      value={featuredEndDate}
                      onChange={(e) => {
                        setFeaturedEndDate(e.target.value);
                        setDateError("");
                      }}
                      className={`pl-10 w-full px-4 py-2 border ${dateError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                  {dateError && (
                    <p className="mt-1 text-sm text-red-600">{dateError}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Enter a future date in DD/MM/YYYY format (e.g., 31/12/2024)
                  </p>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => {
                      setShowFeaturedModal(false);
                      setPropertyToAction(null);
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    disabled={actionLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleFeatureProperty}
                    className="px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded transition-colors disabled:opacity-50"
                    disabled={actionLoading}
                  >
                    {actionLoading ? "Processing..." : "Confirm"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Layout>
  );
};



export default ManageProperties
