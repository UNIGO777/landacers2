import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import format from "date-fns/format"
import axios from "axios"
import { toast } from "react-toastify"
import QueryListLoader from "../../components/loaders/QueryListLoader"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import QueryDetailLoader from "../../components/loaders/QueryDetailLoader"
import { X } from "lucide-react"
import { useParams, useLocation } from "react-router-dom"
import notFound from '../../../Assets/Images/NotFound.png'



const QueriesManagement = ({isBuilder}) => {
  const [queries, setQueries] = useState([])
  const [loading, setLoading] = useState(false)
  const [detailLoading, setDetailLoading] = useState(false)
  const [searchType, setSearchType] = useState("all")
  const [searchId, setSearchId] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [selectedQuery, setSelectedQuery] = useState(null)
  const [queryDetails, setQueryDetails] = useState(null)
  const [statusFilter, setStatusFilter] = useState("all")
  const queriesPerPage = 20


const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const itemtype = searchParams.get('itemtype');
const itemId = searchParams.get('itemId');



  useEffect(() => {
    if (itemtype && itemId) {
      setSearchType(itemtype)
      setSearchId(itemId)
    }
  }, [searchType])


  useEffect(() => {
    fetchQueries()
  }, [currentPage, searchType, searchId, statusFilter])


  useEffect(() => {
    if (selectedQuery?._id) {
      fetchQueryDetails(selectedQuery._id)
    }
  }, [selectedQuery])


  const fetchQueryDetails = async (queryId) => {
    try {
      setDetailLoading(true)
      const token = localStorage.getItem("sellerToken")
      const response = await axios.get(
        `https://api.landacre.in/api/quary/${queryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (response.data?.data) {
        setQueryDetails(response.data.data)
      } else {
        toast.error("Invalid query details received")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch query details")
      setSelectedQuery(null)
    } finally {
      setDetailLoading(false)
    }
  }


  const fetchQueries = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("sellerToken")
      let url = `https://api.landacre.in/api/quary/seller`
      
      if (itemtype === "property" && itemId) {
        url = `https://api.landacre.in/api/quary/property/${itemId}`
      } else if (itemtype === "project" && itemId) {
        url = `https://api.landacre.in/api/quary/project/${itemId}`
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          page: currentPage,
          itemType: searchType !== "all"? searchType : undefined,
          itemId: searchId || undefined,
          status: statusFilter !== "all" ? statusFilter : "all"
        }
      })
      setQueries(response.data.data.queries)
      setTotalPages(response.data.data.pagination.totalPages)
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch queries")
    } finally {
      setLoading(false)
    }
  }


  const getStatusColor = (status) => {
    switch (status) {
      case "seen": return "bg-blue-400"
      case "unseen": return "bg-red-500"
      default: return "bg-gray-300"
    }
  }


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }


  const getPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  return (
    <div className=" min-h-full py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">Queries Management</h1>

    <div className="flex flex-wrap gap-4 mb-6">
    {isBuilder && <select 
      value={searchType}
      onChange={(e) => {
        setSearchType(e.target.value)
        setSearchId("")
        setCurrentPage(1)
      }}
      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="all">All Queries</option>
      <option value="property">Search by Property</option>
      <option value="project">Search by Project</option>
    </select>}

    <select
        value={statusFilter}
        onChange={(e) => {
          setStatusFilter(e.target.value)
          setCurrentPage(1)
        }}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Status</option>
        <option value="seen">Seen</option>
        <option value="unseen">Unseen</option>
      </select>

      
    </div>

      {loading ? (
        <QueryListLoader />
      ) : !loading && queries.length == 0 ? <><motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      <img 
        src={notFound} 
        alt="No projects found"
        className="w-48 h-48 mb-6"
      />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">No Queries Found</h3>
      <p className="text-gray-500 mb-6">Try adjusting your filters </p>
    </motion.div></> : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left">Subject</th>
                  <th className="p-4 text-left">Subject Name</th>
                  <th className="p-4 text-left">User</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">User Contact</th>
                  <th className="p-4 text-left">Created At</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {queries.map((query) => (
                  <tr key={query._id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{query.item.Itemtype + " Quary" || 'N/A'}</td>
                    <td className="p-4">{query.item.Itemtype === "Property" ? query.item.details.propertyTitle : query.item.details.projectName}</td>
                    <td className="p-4">{`${query.user.firstName} ${query.user.lastName}`}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(query.status)}`}>
                        {query.status}
                      </span>
                    </td>
                    <td className="p-4">{query.user.phoneNumber + " / " + query.user.email || 'N/A'}</td>
                    <td className="p-4">{format(new Date(query.createdAt), "dd MMM yyyy")}</td>
                    <td className="p-4">
                      <button
                        onClick={() => {
                          setQueryDetails(null)
                          setSelectedQuery(query)
                        }}
                        className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
            <div className="flex justify-between flex-1 sm:hidden">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{((currentPage - 1) * queriesPerPage) + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * queriesPerPage, totalPages * queriesPerPage)}
                  </span>{" "}
                  of <span className="font-medium">{totalPages * queriesPerPage}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Previous</span>
                    <FaChevronLeft className="w-5 h-5" />
                  </button>
                  {getPageNumbers().map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border ${
                        currentPage === pageNum
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Next</span>
                    <FaChevronRight className="w-5 h-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </>
      )}

      <AnimatePresence>
        {(selectedQuery || detailLoading) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={() => {
              setSelectedQuery(null)
              setQueryDetails(null)
            }}
          >
            {detailLoading ? (
              <QueryDetailLoader />
            ) : (
              queryDetails && (
                <motion.div
                  className="w-full relative max-w-3xl max-h-[80%] overflow-y-scroll p-6 bg-white rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 className="mb-4 text-2xl font-bold">{queryDetails.item.Itemtype} Query</h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {queryDetails.item.Itemtype === "Property" ? (
                      // Property Details
                      <>
                        <div>
                          <p className="font-semibold">Property Title</p>
                          <p>{queryDetails.item.details.propertyTitle}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Property Type</p>
                          <p>{queryDetails.item.details.propertyType}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Type</p>
                          <p>{queryDetails.item.details.isCommercial ? "Commercial" : "Residential"}</p>
                        </div>
                      </>
                    ) : (
                      // Project Details
                      <>
                        <div>
                          <p className="font-semibold">Project Name</p>
                          <p>{queryDetails.item.details.projectName}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Project Type</p>
                          <p>{queryDetails.item.details.projectType}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Location</p>
                          <p>{`${queryDetails.item.details.location.locality}, ${queryDetails.item.details.location.city}, ${queryDetails.item.details.location.state}`}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Completion Date</p>
                          <p>{format(new Date(queryDetails.item.details.completionDate), "dd MMM yyyy")}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Amenities</p>
                          <p>{JSON.parse(queryDetails.item.details.amenities[0]).join(", ")}</p>
                        </div>
                      </>
                    )}

                    <div>
                      <p className="font-semibold">Query Status</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(queryDetails.status)}`}>
                        {queryDetails.status}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">Item Status</p>
                      <p className="capitalize">{queryDetails.item.details.status}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Created At</p>
                      <p>{format(new Date(queryDetails.createdAt), "dd MMM yyyy HH:mm")}</p>
                    </div>

                    <div className="col-span-2">
                      <p className="font-semibold">Description</p>
                      <p className="mt-1 text-gray-600">{queryDetails.item.details.description}</p>
                    </div>

                    <div className="col-span-2">
                      <p className="font-semibold mb-2">User Details</p>
                      <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded">
                        <div>
                          <p className="text-sm text-gray-600">Name</p>
                          <p className="font-medium">{`${queryDetails.user.firstName} ${queryDetails.user.lastName}`}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Contact</p>
                          <p className="font-medium">{queryDetails.user.phoneNumber}</p>
                          <p className="text-sm text-gray-500">{queryDetails.user.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Handle both property and project images */}
                    {((queryDetails.item.Itemtype === "Property" && queryDetails.item.details.propertyMedia?.images) ||
                      (queryDetails.item.Itemtype === "Project" && queryDetails.item.details.images)) && (
                      <div className="col-span-2">
                        <p className="font-semibold mb-2">{queryDetails.item.Itemtype} Images</p>
                        <div className="grid grid-cols-3 gap-4">
                          {(queryDetails.item.Itemtype === "Property" 
                            ? queryDetails.item.details.propertyMedia.images 
                            : queryDetails.item.details.images
                          ).map((image, index) => (
                            <img 
                              key={index}
                              src={`https://api.landacre.in/storage/${image}`}
                              alt={`${queryDetails.item.Itemtype.toLowerCase()} image ${index + 1}`}
                              className="w-full h-40 object-cover rounded"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Show video only for property type */}
                    {queryDetails.item.Itemtype === "Property" && queryDetails.item.details.propertyMedia?.video && (
                      <div className="col-span-2">
                        <p className="font-semibold mb-2">Property Video</p>
                        <video className="w-full rounded-lg" controls>
                          <source src={`https://api.landacre.in/storage/${queryDetails.item.details.propertyMedia.video}`} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                  </div>

                  <motion.button
                  whileHover={{ scale: 1.1 }}
                    className="px-4 absolute top-4 right-4 py-2 text-black"
                    onClick={() => {
                      setSelectedQuery(null)
                      setQueryDetails(null)
                    }}
                  >
                    <X size={24} />
                  </motion.button>
                </motion.div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default QueriesManagement
