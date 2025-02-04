import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import format from "date-fns/format"
import isAfter from "date-fns/isAfter"
import queriesData from "../../data/QueriesData"
import Layout from "../../Layout"

const QueriesManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState(null)
  const [selectedQuery, setSelectedQuery] = useState(null)
  const [loadedQueries, setLoadedQueries] = useState([])

  useEffect(() => {
    if (Array.isArray(queriesData)) {
      setLoadedQueries(queriesData)
    } else {
      console.error("queriesData is not an array:", queriesData)
      setLoadedQueries([])
    }
  }, [])

  const filteredQueries = useMemo(() => {
    return loadedQueries.filter((query) => {
      const matchesSearch =
        query.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        query.brokerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        query.subject.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || query.status === statusFilter

      const matchesDate = !dateFilter || isAfter(new Date(query.createdAt), dateFilter)

      return matchesSearch && matchesStatus && matchesDate
    })
  }, [searchTerm, statusFilter, dateFilter, loadedQueries])

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-yellow-500"
      case "in-progress":
        return "bg-blue-500"
      case "resolved":
        return "bg-green-500"
      case "closed":
        return "bg-gray-500"
      default:
        return "bg-gray-300"
    }
  }

  if (loadedQueries.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold">Queries Management</h1>

        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by user, broker, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <input
            type="date"
            value={dateFilter ? format(dateFilter, "yyyy-MM-dd") : ""}
            onChange={(e) => setDateFilter(e.target.value ? new Date(e.target.value) : null)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {filteredQueries.map((query) => (
            <motion.div
              key={query._id.toString()}
              layoutId={query._id.toString()}
              onClick={() => setSelectedQuery(query)}
              className="p-6 transition-shadow duration-300 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-semibold">{query.subject}</h2>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(query.status)}`}
                >
                  {query.status}
                </span>
              </div>
              <p className="mb-4 text-gray-600">{query.description.substring(0, 150)}...</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>User: {query.userName}</span>
                <span>Broker: {query.brokerName}</span>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>Priority: {query.priority}</span>
                <span>Created: {format(new Date(query.createdAt), "dd MMM yyyy")}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedQuery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
              onClick={() => setSelectedQuery(null)}
            >
              <motion.div
                layoutId={selectedQuery._id.toString()}
                className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-bold">{selectedQuery.subject}</h2>
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold text-white ${getStatusColor(selectedQuery.status)}`}
                  >
                    {selectedQuery.status}
                  </span>
                </div>
                <p className="mb-4 text-gray-600">{selectedQuery.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="font-semibold">User</p>
                    <p>{selectedQuery.userName}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Broker</p>
                    <p>{selectedQuery.brokerName}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Priority</p>
                    <p className="capitalize">{selectedQuery.priority}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Created At</p>
                    <p>{format(new Date(selectedQuery.createdAt), "dd MMM yyyy HH:mm")}</p>
                  </div>
                </div>
                {selectedQuery.resolution && (
                  <div className="mb-4">
                    <p className="font-semibold">Resolution</p>
                    <p>{selectedQuery.resolution}</p>
                  </div>
                )}
                {selectedQuery.resolvedAt && (
                  <div>
                    <p className="font-semibold">Resolved At</p>
                    <p>{format(new Date(selectedQuery.resolvedAt), "dd MMM yyyy HH:mm")}</p>
                  </div>
                )}
                <button
                  className="px-4 py-2 mt-6 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={() => setSelectedQuery(null)}
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  )
}

export default QueriesManagement

