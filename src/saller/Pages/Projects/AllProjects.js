import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import axios from 'axios'
import { FaFilter, FaLock, FaTimes } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import notFound from '../../../Assets/Images/NotFound.png'
import ProcessLoader from '../../../components/loaders/ProcessLoader'

import ProjectListLoader from '../../components/loaders/ProjectListLoder'



const AllProjects = () => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [projectToComplete, setProjectToComplete] = useState(null)
  const [processLoader, setProcessLoader] = useState(false)

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProjects: 0
  })
  const [filters, setFilters] = useState({
    status: 'active',
    type: '',
    page: 1,
    isUpcoming: false
  })

  const projectTypes = [
    { value: 'Residential', name: 'Residential' },
    { value: 'Commercial', name: 'Commercial' },
    { value: 'Mixed-use', name: 'Mixed Use' }
  ]

  useEffect(() => {
    fetchProjects();
  }, [filters]);

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${process.env.REACT_APP_backendUrl}/api/projects/projectsbyseller`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('sellerToken')}`
        },
        params: {
          page: filters.page,
          status: filters.status,
          type: filters.type,
          isUpcoming: filters.isUpcoming
        }
      })
      setProjects(response.data.data)
      setPagination(response.data.pagination)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1
    }))
  }

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }))
  }

  const handleDeleteProject = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      try {
        setProcessLoader(true)
        await axios.delete(`${process.env.REACT_APP_backendUrl}/api/projects/delete/${projectId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('sellerToken')}`
          }
        })
        fetchProjects()
        setSelectedProject(null)
      } catch (error) {
        console.error("Error deleting project:", error)
      } finally {
        setProcessLoader(false)
      }
    }
  }

  const initiateMarkComplete = (project) => {
    setProjectToComplete(project)
    setShowConfirmation(true)
  }

  const handleMarkComplete = async () => {
    if (!projectToComplete) return

    try {
      setProcessLoader(true)
      await axios.put(`${process.env.REACT_APP_backendUrl}/api/projects/complete/${projectToComplete}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('sellerToken')}`
        }
      })
      setShowConfirmation(false)
      setProjectToComplete(null)
      setSelectedProject(null)
      fetchProjects()
    } catch (error) {
      console.error("Error marking project as complete:", error)
    } finally {
      setProcessLoader(false)
    }
  }

  return (
    <>
   
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container px-4 py-8 mx-auto"
      >
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">Projects</h1>
          <Link 
            to="/saller/project/add"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add New Project
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center gap-4 mb-6"
        >
          <div className="flex items-center gap-2">
            <FaFilter className="text-blue-500" />
            <span className="font-semibold text-gray-700">Filters:</span>
          </div>
          
          <select
            className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
          >
            <option value="">All Types</option>
            {projectTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.name}
              </option>
            ))}
          </select>

          <select
            className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="active">Active</option>
            <option value="requested">Requested</option>
            <option value="closed">Closed</option>
          </select>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isUpcoming"
              checked={filters.isUpcoming}
              onChange={(e) => handleFilterChange("isUpcoming", e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isUpcoming" className="text-gray-700">Upcoming Projects</label>
          </div>
        </motion.div>

        {loading ? (
          <ProjectListLoader />
        ) : projects.length === 0 ? (
          <motion.div 
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
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Projects Found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or add new projects</p>
          </motion.div>
        ) : (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="overflow-x-auto"
            >
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Launch Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {projects.map((project, index) => (
                    <motion.tr 
                      key={project._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img 
                            src={`${process.env.REACT_APP_backendUrl}/storage/${project.images[0]}`}
                            alt={project.projectName}
                            className="h-10 w-10 rounded-full object-cover mr-3"
                          />
                          <div className="font-medium text-gray-900">{project.projectName}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {project.location.locality}, {project.location.city}, {project.location.state}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {project.projectType}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div>Total: {project.totalUnits}</div>
                        <div>Available: {project.availableUnits}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(project.launchDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          project.status === 'active' ? 'bg-green-100 text-green-800' :
                          project.status === 'requested' ? 'bg-yellow-100 text-yellow-800' :
                          project.status === 'closed' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          {project.isUpcoming && ' (Upcoming)'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => setSelectedProject(project)}
                            className="text-blue-500 hover:text-blue-700 transition-colors"
                          >
                            View
                          </button>
                         
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {pagination.totalPages > 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center mt-8 gap-2"
              >
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className={`px-4 py-2 rounded ${
                    pagination.currentPage === 1 
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-700">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className={`px-4 py-2 rounded ${
                    pagination.currentPage === pagination.totalPages
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Next
                </button>
              </motion.div>
            )}
          </>
        )}
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedProject.projectName}</h2>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Location Details</h3>
                    <p className="text-gray-600">
                      {selectedProject.location.locality}, {selectedProject.location.city}, {selectedProject.location.state}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Project Type</h3>
                    <p className="text-gray-600">{selectedProject.projectType}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Units</h3>
                    <p className="text-gray-600">
                      Total: {selectedProject.totalUnits}<br />
                      Available: {selectedProject.availableUnits}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Launch Date</h3>
                    <p className="text-gray-600">
                      {new Date(selectedProject.launchDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Project Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedProject.images.map((image, index) => (
                      <motion.img
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        src={`${process.env.REACT_APP_backendUrl}/storage/${image}`}
                        alt={`Project image ${index + 1}`}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-600">{selectedProject.description}</p>
                </div>

            {selectedProject.status === 'active' && <div className="flex justify-end space-x-4">
              <button
                onClick={() => initiateMarkComplete(selectedProject._id)}
                className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 transition-colors"
              >
                Mark Complete
              </button>
              <button
                onClick={() => handleDeleteProject(selectedProject._id)}
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => navigate(`/saller/queries/manage?itemId=${selectedProject._id}&itemtype=project`)}
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
              >
                See Queries
              </button>

            </div>}

          </div>
            </motion.div>
          </motion.div>
        )}

        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-xl font-semibold mb-4">Confirm Action</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to mark this project as complete? This action cannot be undone.
              </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowConfirmation(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleMarkComplete}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Confirm
            </button>
          </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    
      {processLoader && <ProcessLoader />}
    
    </>

  )
}

export default AllProjects