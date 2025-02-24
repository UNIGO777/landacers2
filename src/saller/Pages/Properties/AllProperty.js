import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
} from "react-icons/fa"
import Layout from "../../Layout"
import { PropertiesData, getTypeIcon } from "../../data/PropertiesData"

const AllBrokerProperties = () => {
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [filters, setFilters] = useState({
    type: "",
    status: "",
    state: "",
    district: "",
    city: "",
    locality: "",
    pincode: "",
  })

  const filteredProperties = useMemo(() => {
    return PropertiesData.filter((property) => {
      return (
        property.ownerType === "Broker" &&
        (filters.type === "" || property.type === filters.type) &&
        (filters.status === "" || property.status === filters.status) &&
        (filters.state === "" || property.location.state === filters.state) &&
        (filters.district === "" || property.location.district === filters.district) &&
        (filters.city === "" || property.location.city === filters.city) &&
        (filters.locality === "" || property.location.locality === filters.locality) &&
        (filters.pincode === "" || property.location.pincode === filters.pincode)
      )
    })
  }, [filters])

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "upcoming":
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
    }))
  }

  const getUniqueValues = (field) => {
    const values = new Set(PropertiesData.filter(property => property.ownerType === "Broker").map((property) => property.location[field]))
    return Array.from(values).sort()
  }

  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-gray-800">Broker Properties</h1>

        {/* Filter Section */}
        <div className="flex flex-wrap items-center mb-6 space-x-4 space-y-2">
          <div className="flex items-center space-x-2">
            <FaFilter className="text-blue-500" />
            <span className="font-semibold text-gray-700">Filters:</span>
          </div>
          <select
            className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
          >
            <option value="">All Types</option>
            <option value="land">Land</option>
            <option value="farmhouse">Farmhouse</option>
            <option value="plot">Plot</option>
          </select>
          <select
            className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="upcoming">Upcoming</option>
          </select>
          <select
            className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.state}
            onChange={(e) => handleFilterChange("state", e.target.value)}
          >
            <option value="">All States</option>
            {getUniqueValues("state").map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <select
            className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.district}
            onChange={(e) => handleFilterChange("district", e.target.value)}
          >
            <option value="">All Districts</option>
            {getUniqueValues("district").map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          <select
            className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.city}
            onChange={(e) => handleFilterChange("city", e.target.value)}
          >
            <option value="">All Cities</option>
            {getUniqueValues("city").map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <select
            className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.locality}
            onChange={(e) => handleFilterChange("locality", e.target.value)}
          >
            <option value="">All Localities</option>
            {getUniqueValues("locality").map((locality) => (
              <option key={locality} value={locality}>
                {locality}
              </option>
            ))}
          </select>
          <select
            className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.pincode}
            onChange={(e) => handleFilterChange("pincode", e.target.value)}
          >
            <option value="">All Pincodes</option>
            {getUniqueValues("pincode").map((pincode) => (
              <option key={pincode} value={pincode}>
                {pincode}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <motion.div
              key={property._id}
              className="overflow-hidden transition-all duration-300 bg-white border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-2xl hover:border-blue-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="relative">
                <img
                  src={property.thumbnailImage || "/placeholder.svg"}
                  alt={property.title}
                  className="object-cover w-full h-48"
                />
                <div
                  className={`absolute top-0 right-0 m-2 px-2 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(
                    property.status,
                  )}`}
                >
                  {property.status}
                </div>
                {property.isUpcoming && (
                  <div className="absolute top-0 left-0 px-2 py-1 m-2 text-xs font-semibold text-white bg-purple-500 rounded-full">
                    Upcoming
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-gray-800">{property.title}</h2>
                  <div className="text-2xl text-blue-500">{React.createElement(getTypeIcon(property.type))}</div>
                </div>
                <p className="mb-4 text-gray-600 line-clamp-2">{property.description}</p>
                <div className="flex items-center mb-2 text-sm text-gray-500">
                  <FaMapMarkerAlt className="mr-2 text-blue-500" />
                  <span>{`${property.location.city}, ${property.location.state}`}</span>
                </div>
                <div className="flex items-center mb-2 text-sm text-gray-500">
                  <FaCalendarAlt className="mr-2 text-blue-500" />
                  <span>
                    {property.isUpcoming
                      ? "Launch: " + property.upcomingDetails?.expectedLaunchDate
                      : "Listed: " + new Date(property.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <FaEye className="mr-1 text-blue-500" />
                    <span>{property.views} views</span>
                  </div>
                  <div className="flex items-center">
                    <FaDollarSign className="mr-1 text-green-500" />
                    <span className="font-semibold text-green-600">
                      {property.isUpcoming
                        ? `${property.upcomingDetails?.priceRange.min.toLocaleString()} - ${property.upcomingDetails?.priceRange.max.toLocaleString()}`
                        : property.price?.toLocaleString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => openPropertyDetails(property)}
                  className="w-full px-4 py-2 mt-4 font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-75"
            onClick={closePropertyDetails}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 15 }}
              className="w-full max-w-4xl p-6 mx-4 overflow-y-auto bg-white rounded-lg max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-gray-800">{selectedProperty.title}</h2>
                <button onClick={closePropertyDetails} className="text-gray-500 hover:text-gray-700">
                  <FaTimes size={24} />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <img
                    src={selectedProperty.thumbnailImage || "/placeholder.svg"}
                    alt={selectedProperty.title}
                    className="object-cover w-full h-64 mb-4 rounded-lg"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    {selectedProperty.images.slice(0, 3).map((image, index) => (
                      <img
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={`${selectedProperty.title} - Image ${index + 1}`}
                        className="object-cover w-full h-20 rounded-lg"
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-4 text-gray-600">{selectedProperty.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="mb-2 text-lg font-semibold text-gray-700">Location</h3>
                      <p className="text-gray-600">{selectedProperty.location.state}</p>
                      <p className="text-gray-600">{selectedProperty.location.district}</p>
                      <p className="text-gray-600">{selectedProperty.location.city}</p>
                      <p className="text-gray-600">{selectedProperty.location.locality}</p>
                      <p className="text-gray-600">{selectedProperty.location.pincode}</p>
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold text-gray-700">Details</h3>
                      <p className="text-gray-600">Type: {selectedProperty.type}</p>
                      <p className="text-gray-600">Status: {selectedProperty.status}</p>
                      <p className="text-gray-600">Views: {selectedProperty.views}</p>
                      {selectedProperty.isUpcoming ? (
                        <p className="text-gray-600">
                          Expected Launch: {selectedProperty.upcomingDetails?.expectedLaunchDate}
                        </p>
                      ) : (
                        <p className="text-gray-600">
                          Listed: {new Date(selectedProperty.createdAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  {selectedProperty.type === "farmhouse" && (
                    <div className="mt-4">
                      <h3 className="mb-2 text-lg font-semibold text-gray-700">Farmhouse Details</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center">
                          <FaBed className="mr-2 text-blue-500" />
                          <span>{selectedProperty.numberOfBedrooms} Bedrooms</span>
                        </div>
                        <div className="flex items-center">
                          <FaBath className="mr-2 text-blue-500" />
                          <span>{selectedProperty.numberOfBathrooms} Bathrooms</span>
                        </div>
                        <div className="flex items-center">
                          <FaRulerCombined className="mr-2 text-blue-500" />
                          <span>{selectedProperty.coveredArea} sqft</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold">Furnished:</span>
                          <span className="ml-2">{selectedProperty.furnishedStatus}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedProperty.type === "land" && (
                    <div className="mt-4">
                      <h3 className="mb-2 text-lg font-semibold text-gray-700">Land Details</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center">
                          <span className="font-semibold">Plot Area:</span>
                          <span className="ml-2">{selectedProperty.plotArea} sqft</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold">Open Sides:</span>
                          <span className="ml-2">{selectedProperty.numberOfOpenSides}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold">Width of Road:</span>
                          <span className="ml-2">{selectedProperty.widthOfRoadFacing} ft</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold">Gated Colony:</span>
                          <span className="ml-2">{selectedProperty.gatedColonyStatus ? "Yes" : "No"}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedProperty.type === "plot" && (
                    <div className="mt-4">
                      <h3 className="mb-2 text-lg font-semibold text-gray-700">Plot Details</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center">
                          <span className="font-semibold">Total Area:</span>
                          <span className="ml-2">{selectedProperty.totalPlotArea} sqft</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold">Available Area:</span>
                          <span className="ml-2">{selectedProperty.availablePlotArea} sqft</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold">Corner Plot:</span>
                          <span className="ml-2">{selectedProperty.cornerPlotStatus ? "Yes" : "No"}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold">Road Width:</span>
                          <span className="ml-2">{selectedProperty.roadFacingWidth} ft</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="mt-6">
                    <h3 className="mb-2 text-lg font-semibold text-gray-700">Price Details</h3>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{selectedProperty.priceDetails?.totalPrice.toLocaleString()}
                    </p>
                    {selectedProperty.priceDetails?.pricePerSqFt && (
                      <p className="text-gray-600">
                        ₹{selectedProperty.priceDetails.pricePerSqFt.toLocaleString()} per sq.ft
                      </p>
                    )}
                    {selectedProperty.priceDetails?.bookingAmount && (
                      <p className="text-gray-600">
                        Booking Amount: ₹{selectedProperty.priceDetails.bookingAmount.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  )
}

export default AllBrokerProperties
