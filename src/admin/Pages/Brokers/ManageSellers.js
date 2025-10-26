import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaSearch, FaUserTie, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFilter, FaEllipsisV, FaTimes, FaBuilding, FaHome } from "react-icons/fa"
import axios from "axios"
import { toast } from "react-toastify"
import Layout from "../Layout"
import ADMIN_API_ROUTES from "../../AdminRequestPath"
import { useNavigate } from "react-router-dom"

export default function BrokerManagement() {
  const navigate = useNavigate()
  const [sellers, setSellers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredSellers, setFilteredSellers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sellersPerPage] = useState(10)
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" })
  const [filterStatus, setFilterStatus] = useState("active")
  const [filterType, setFilterType] = useState("all")
  const [selectedSeller, setSelectedSeller] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [processingAction, setProcessingAction] = useState(false)

  // Fetch sellers
  const fetchSellers = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("adminToken")
      const response = await axios.get(
        `${searchQuery !== '' ? ADMIN_API_ROUTES.SEARCH_SALLERS(filterStatus, filterType , currentPage, sellersPerPage, searchQuery)  : ADMIN_API_ROUTES.GET_SALLERS_BY_STATUS(filterStatus, filterType , currentPage, sellersPerPage)}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      if (response.data) { 
        setSellers(response.data.sellers)
        setFilteredSellers(response.data.sellers)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch Sellers")
    } finally {
      setLoading(false)
    }
  }

  // Search sellers
// ... existing code ...





  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    fetchSellers()
  }

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value)
  }

  // Sort Sellers
  const requestSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  // Get sort

  // Handle block/unblock seller
  const handleBlockUnblock = async (sellerId, currentStatus) => {
    try {
      setProcessingAction(true)
      const token = localStorage.getItem("adminToken")
      const endpoint = currentStatus === "active" ? 
        ADMIN_API_ROUTES.BLOCK_SELLER(sellerId) : 
        ADMIN_API_ROUTES.UNBLOCK_SELLER(sellerId)
      
      const response = await axios.put(
        `https://api.landacre.in${endpoint}`,
        { status: currentStatus === "active" ? "blocked" : "active" },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      if (response.data) {
        toast.success(`Broker ${currentStatus === "active" ? "blocked" : "activated"} successfully`)
        fetchSellers()
        setConfirmationModal(null)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update broker status")
    } finally {
      setProcessingAction(false)
    }
  }
  
  // Show confirmation modal for block/unblock action
  const showConfirmation = (seller, action) => {
    setConfirmationModal({
      seller,
      action
    })
  }

  // Pagination
  const indexOfLastSeller = currentPage * sellersPerPage
  const indexOfFirstSeller = (currentPage - 1) * sellersPerPage + 1
  const currentSellers = filteredSellers
  const totalPages = Math.ceil(filteredSellers.length / sellersPerPage)

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
      fetchSellers()
    }
  }

  useEffect(() => {
    fetchSellers()
  }, [filterStatus, filterType])

  return (
    <Layout>
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Seller Management</h2>
            <p className="mt-2 text-sm text-gray-600">
              View and manage all Sellers registered on the platform
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={fetchSellers }
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Refresh Sellers
            </button>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm">
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
                  placeholder="Search Sellers by name, email or phone..."
                />
                <button
                  type="submit"
                  className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-600 rounded-r-lg border border-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  <FaSearch className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FaFilter className="w-4 h-4 text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={handleFilterChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                >
                  <option value="active">Active Sellers</option>
                  <option value="blocked">Blocked Sellers</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <FaUserTie className="w-4 h-4 text-gray-500" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                >
                  <option value="all">All Types</option>
                  <option value="Agent">Sellers</option>
                  <option value="Individual">Individual</option>
                  <option value="Builder">Builders</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer"
                    
                  >
                    <div className="flex text-xs items-center justify-center">
                      Name
                      {sortConfig.key === "firstName" && (
                        <span className="ml-1">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer"
                    onClick={() => requestSort("email")}
                  >
                    <div className="flex text-xs items-center justify-center">
                      Email
                      {sortConfig.key === "email" && (
                        <span className="ml-1">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-md font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer"
                    
                  >
                    <div className="flex text-xs items-center justify-center">
                      Seller type
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-md font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer"
                    onClick={() => requestSort("phoneNumber")}
                  >
                    <div className="flex text-xs items-center justify-center">
                      Phone
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer"
                    onClick={() => requestSort("createdAt")}
                  >
                    <div className="flex text-xs items-center justify-center">
                      Joined Date
                      
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer"
                    
                  >
                    <div className="flex text-xs items-center">
                      Status
                      
                    </div>
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
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
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
                ) : currentSellers.length > 0 ? (
                  currentSellers.map((seller) => (
                    <tr key={seller._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            {seller?.sellerDetails?.profilePicture && seller?.sellerDetails?.profilePicture !== "" ? (
                              <img
                                className="object-cover w-10 h-10 rounded-full"
                                src={`https://api.landacre.in/storage/${seller?.sellerDetails?.profilePicture}`}
                                alt={`${seller?.sellerDetails?.name}`}
                              />
                            ) : (
                              <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-200 rounded-full">
                                <FaUserTie className="w-5 h-5 text-blue-500" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {`${seller?.sellerDetails?.name}`}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-900">{seller?.sellerDetails?.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-900">{seller?.sellerType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-900">{seller?.sellerDetails?.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-500">
                          {new Date(seller.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${seller.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {seller.status === "active" ? "Active" : "Blocked"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => setSelectedSeller(seller)}
                            className="px-3 py-1 font-medium rounded-md bg-blue-500 text-white hover:bg-blue-600"
                          >
                            Details
                          </button>
                          
                          {seller.status === "active" ? (
                            <button
                              onClick={() => showConfirmation(seller, "block")}
                              className="px-3 py-1 font-medium rounded-md bg-red-100 text-red-600 hover:bg-red-200"
                            >
                              Block
                            </button>
                          ) : (
                            <button
                              onClick={() => showConfirmation(seller, "unblock")}
                              className="px-3 py-1 font-medium rounded-md bg-green-100 text-green-600 hover:bg-green-200"
                            >
                              Unblock
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center whitespace-nowrap">
                      <div className="text-sm text-gray-500">No sellers found</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredSellers.length > 0 && (
            <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
              <div className="flex items-center">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstSeller}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastSeller, filteredSellers.length)}
                  </span>{" "}
                  of <span className="font-medium">{filteredSellers.length}</span> sellers
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
                    &laquo;
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                        currentPage === index + 1
                          ? "z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 text-gray-400 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    &raquo;
                  </button>
                </nav>
              </div>
            </div>
          )}
        </div>

        {/* Seller Details Modal */}
        <AnimatePresence>
          {selectedSeller && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"
              onClick={() => setSelectedSeller(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl p-6 mx-4 bg-white rounded-lg shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedSeller(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={20} />
                </button>

                <h2 className="mb-4 text-2xl font-bold text-gray-800">{selectedSeller?.sellerDetails?.name}'s Details</h2>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {selectedSeller?.sellerDetails?.profilePicture ? (
                        <img
                          className="object-cover w-20 h-20 rounded-full"
                          src={`https://api.landacre.in/storage/${selectedSeller?.sellerDetails?.profilePicture}`}
                          alt={selectedSeller?.sellerDetails?.name}
                        />
                      ) : (
                        <div className="flex items-center justify-center w-20 h-20 text-white bg-blue-500 rounded-full">
                          <FaUserTie size={32} />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{selectedSeller?.sellerDetails?.name}</h3>
                      <p className="text-gray-600">{selectedSeller?.sellerType}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <FaEnvelope className="text-gray-500" />
                      <span>{selectedSeller?.sellerDetails?.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaPhone className="text-gray-500" />
                      <span>{selectedSeller?.sellerDetails?.phone}</span>
                    </div>
                    {selectedSeller?.sellerDetails?.address && (
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-gray-500" />
                        <span>{selectedSeller?.sellerDetails?.address}</span>
                      </div>
                    )}
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="mb-2 text-lg font-semibold">Additional Information</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Status</p>
                          <p className="font-medium">
                            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${selectedSeller?.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                              {selectedSeller?.status === "active" ? "Active" : "Blocked"}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Joined Date</p>
                          <p className="font-medium">{new Date(selectedSeller?.createdAt).toLocaleDateString()}</p>
                        </div>
                        {selectedSeller?.sellerDetails?.companyName && (
                          <div>
                            <p className="text-sm text-gray-500">Company Name</p>
                            <p className="font-medium">{selectedSeller?.sellerDetails?.companyName}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {selectedSeller?.status === "active" && (
                    <div className="flex flex-wrap gap-3 col-span-1 md:col-span-2">
                      <button
                        onClick={() => navigate(`/admin/sellers/${selectedSeller._id}/properties`)}
                        className="flex items-center px-4 py-2  text-blue-500 rounded-md hover:bg-blue-100"
                      >
                        <FaHome className="mr-2" />
                        See sallers's Properties
                      </button>
                      
                      {selectedSeller?.sellerType === "Builder" && (
                        <button
                          onClick={() => navigate(`/admin/sellers/${selectedSeller._id}/projects`)}
                          className="flex items-center px-4 py-2  text-green-500 rounded-md hover:bg-green-100"
                        >
                          <FaBuilding className="mr-2" />
                          See sallers's Projects
                        </button>
                      )}
                      {selectedSeller.status === "active" &&
                          <button
                            onClick={() => handleBlockUnblock(selectedSeller._id, selectedSeller.status)}
                            className="px-3 py-1 font-medium rounded-md text-red-600  hover:bg-red-100 hover:text-red-500"
                          >
                            Block
                          </button>}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirmation Modal */}
        <AnimatePresence>
          {confirmationModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"
              onClick={() => !processingAction && setConfirmationModal(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="mb-4 text-xl font-bold text-gray-800">
                  {confirmationModal.action === "block" ? "Block Seller" : "Unblock Seller"}
                </h3>
                <p className="mb-6 text-gray-600">
                  Are you sure you want to {confirmationModal.action === "block" ? "block" : "unblock"} seller{" "}
                  <span className="font-semibold">{confirmationModal.seller?.sellerDetails?.name}</span>?
                  {confirmationModal.action === "block" && (
                    <span className="block mt-2 text-sm text-red-500">
                      This will prevent them from accessing the platform and listing properties.
                    </span>
                  )}
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => !processingAction && setConfirmationModal(null)}
                    disabled={processingAction}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleBlockUnblock(confirmationModal.seller._id, confirmationModal.seller.status)}
                    disabled={processingAction}
                    className={`px-4 py-2 text-sm font-medium text-white rounded-md disabled:opacity-50 ${confirmationModal.action === "block" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                  >
                    {processingAction ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </div>
                    ) : confirmationModal.action === "block" ? (
                      "Block"
                    ) : (
                      "Unblock"
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Layout>
  )
}

