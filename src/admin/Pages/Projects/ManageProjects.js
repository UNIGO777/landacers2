import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaFilter, FaEllipsisV, FaBuilding, FaTimes, FaLock, FaUnlock, FaEye, FaCheck, FaMapMarkerAlt, FaStar, FaCalendarAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../Layout";
import ADMIN_API_ROUTES from "../../AdminRequestPath";
import { useNavigate } from "react-router-dom";
import StateNames from '../../../Assets/StaticData/StateName';
import Cities from '../../../Assets/DynamicData/CityFatch';

const ManageProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  const [filterStatus, setFilterStatus] = useState("active");
  const [filterType, setFilterType] = useState("");
  const [isUpcoming, setIsUpcoming] = useState(false);
  const [stateInput, setStateInput] = useState('');
  const [filteredStates, setFilteredStates] = useState([]);
  const [cityInput, setCityInput] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [filteredCitiesForFilter, setFilteredCitiesForFilter] = useState([]);
  const [isCityDisabled, setIsCityDisabled] = useState(true);

  // State for selected project and confirmation modals
  const [selectedProject, setSelectedProject] = useState(null);
  const [showStatusConfirmation, setShowStatusConfirmation] = useState(false);
  const [projectToAction, setProjectToAction] = useState(null);
  const [actionType, setActionType] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  
  // State for featured project modal
  const [showFeaturedModal, setShowFeaturedModal] = useState(false);
  const [featuredEndDate, setFeaturedEndDate] = useState("");
  const [dateError, setDateError] = useState("");

  const projectTypes = [
    { value: 'Residential', name: 'Residential' },
    { value: 'Commercial', name: 'Commercial' },
    { value: 'Mixed-use', name: 'Mixed Use' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active Projects' },
    { value: 'requested', label: 'Requested Projects' },
    { value: 'closed', label: 'Closed Projects' },
    { value: 'blocked', label: 'Blocked Projects' }
  ];

  // Fetch projects
  const fetchProjects = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("adminToken");

      const params = {
        status: filterStatus,
        page: currentPage,
        limit: projectsPerPage,
        sort: sortConfig.key,
        order: sortConfig.direction,
        type: filterType,
        Upcoming: isUpcoming,
        state: stateInput,
        city: cityInput
      };

      if (searchQuery) {
        params.query = searchQuery;
      }


      const response = await axios.get(
        `${process.env.REACT_APP_backendUrl}${ADMIN_API_ROUTES.SEARCH_PROJECTS(params)}`,
        {
          headers: { Authorization: `Bearer ${token}` },

        }
      );

      if (response.data) {

        setProjects(response.data.data || []);
        setFilteredProjects(response.data.data || []);
        setTotalPages(response.data.pagination?.totalPages || 1);
        setTotalProjects(response.data.pagination?.totalProjects || 0);
      }
    } catch (error) {

      toast.error(error.response?.data?.message || "Failed to fetch projects");
      setProjects([]);
      setFilteredProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // Search projects
  const searchProjects = async () => {
    if (!searchQuery.trim()) {
      setFilteredProjects(projects);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(
        `${process.env.REACT_APP_backendUrl}${ADMIN_API_ROUTES.SEARCH_PROJECTS}?query=${searchQuery}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setFilteredProjects(response.data.data || []);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to search projects");
      setFilteredProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    searchProjects();
  };

  // Handle filter change
  const handleFilterChange = (key, value) => {
    if (key === "status") {
      setFilterStatus(value);
    } else if (key === "type") {
      setFilterType(value);
    } else if (key === "isUpcoming") {
      setIsUpcoming(value);
    }
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleStateInputChange = (event) => {
    const inputValue = event.target.value;
    setStateInput(inputValue);
    setFilteredStates(inputValue ?
      StateNames.filter(state => state.toLowerCase().includes(inputValue.toLowerCase())) :
      []
    );
  };

  const handleStateSelect = (state) => {
    setStateInput(state);
    setFilteredStates([]);
    setIsCityDisabled(false);
    const cities = Cities.filter(city => city.state === state);
    setFilteredCities(cities);
    setFilteredCitiesForFilter(cities);
    setCityInput('');
  };

  const handleCityInputChange = (event) => {
    const inputValue = event.target.value;
    setCityInput(inputValue);
    setFilteredCities(inputValue ?
      filteredCitiesForFilter.filter(city =>
        city.name.toLowerCase().includes(inputValue.toLowerCase())
      ) :
      []
    );
  };

  const handleCitySelect = (city) => {
    setCityInput(city);
    setFilteredCities([]);
  };

  // Sort projects
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Get sorted projects
  const getSortedProjects = () => {
    const sortableProjects = [...filteredProjects];
    if (sortConfig.key) {
      sortableProjects.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProjects;
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-blue-100 text-blue-800";
      case "blocked":
        return "bg-red-100 text-red-800";
      case "requested":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Open status change confirmation modal
  const openStatusConfirmation = (project, status) => {
    setProjectToAction(project);
    setActionType(status);
    setShowStatusConfirmation(true);
  };

  // Update project status
  const updateProjectStatus = async (projectId, newStatus) => {
    try {
      setActionLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.put(
        `${process.env.REACT_APP_backendUrl}/api/admin/project/${projectId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data) {
        toast.success(`Project status updated to ${newStatus} successfully`);
        // Update project in state
        
        setSelectedProject(null);
        fetchProjects(); // Refresh the list
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update project status");
    } finally {
      setActionLoading(false);
      setProjectToAction(null);
      setShowStatusConfirmation(false);
    }
  };

  // Block project
  const blockProject = async (projectId) => {
    try {
      setActionLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.delete(
        `${process.env.REACT_APP_backendUrl}${ADMIN_API_ROUTES.BLOCK_PROJECT(projectId)}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        toast.success("Project blocked successfully");
        // Update project in state
        setProjects(projects.map(project =>
          project._id === projectId ? { ...project, status: "blocked" } : project
        ));
        setFilteredProjects(filteredProjects.map(project =>
          project._id === projectId ? { ...project, status: "blocked" } : project
        ));
        setSelectedProject(null);
        fetchProjects(); // Refresh the list
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to block project");
    } finally {
      setActionLoading(false);
      setProjectToAction(null);
      setShowStatusConfirmation(false);
    }
  };

  // Handle confirmed action
  const handleConfirmedAction = () => {
    if (!projectToAction) return;

    if (actionType === "blocked") {
      blockProject(projectToAction._id);
    } else if (["active", "requested", "closed"].includes(actionType)) {
      updateProjectStatus(projectToAction._id, actionType);
    }
  };
  
  // Handle featuring a project
  const handleFeatureProject = async () => {
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
        `${process.env.REACT_APP_backendUrl}${ADMIN_API_ROUTES.CREATE_FEATURED_ITEM}`,
        {
          itemType: 'Project',
          itemId: projectToAction._id,
          endDate: featuredEndDate
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data) {
        toast.success("Project marked as featured successfully");
        fetchProjects(); // Refresh the list
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to mark project as featured");
      if (error.response?.data?.message) {
        setDateError(error.response.data.message);
      }
    } finally {
      setActionLoading(false);
      setShowFeaturedModal(false);
    }
  };

  // Pagination
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [filterStatus, filterType, isUpcoming, currentPage, sortConfig]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Manage Projects</h2>
            <p className="mt-2 text-sm text-gray-600">
              View and manage all projects on the platform
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={fetchProjects}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Refresh Projects
            </button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="p-6 bg-white rounded-xl shadow-sm">
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
                  placeholder="Search projects by name, location..."
                />
                <button
                  type="submit"
                  className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-600 rounded-r-lg border border-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  <FaSearch className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <FaFilter className="w-4 h-4 text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <FaBuilding className="w-4 h-4 text-gray-500" />
                <select
                  value={filterType}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                >
                  <option value="">All Project Types</option>
                  {projectTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isUpcoming"
                  checked={isUpcoming}
                  onChange={(e) => handleFilterChange("isUpcoming", e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isUpcoming" className="text-sm text-gray-700">Upcoming Projects</label>
              </div>

            </div>

          </div>
          <div className="flex flex-col md:flex-row gap-3 mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search state..."
                value={stateInput}
                onChange={handleStateInputChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {filteredStates.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {filteredStates.map((state) => (
                    <div
                      key={state}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleStateSelect(state)}
                    >
                      {state}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search city..."
                value={cityInput}
                onChange={handleCityInputChange}
                disabled={isCityDisabled}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
              {filteredCities.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {filteredCities.map((city) => (
                    <div
                      key={city.name}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleCitySelect(city.name)}
                    >
                      {city.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                setFilterType("");
                setFilterStatus("active");
                setIsUpcoming(false);
                setSearchQuery("");
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
              onClick={fetchProjects}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>

          {/* Projects Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Project
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:table-cell">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase hidden sm:table-cell">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase hidden md:table-cell">
                    Units
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:table-cell">
                    Launch Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase  sm:table-cell">
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                      </td>
                    </tr>
                  ))
                ) : filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <tr key={project._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={`${process.env.REACT_APP_backendUrl}/storage/${project.images?.[0] }`}
                            alt={project.projectName}
                            className="h-10 w-10 rounded-full object-cover mr-3"
                           
                          />
                          <div className="font-medium text-gray-900">{project.projectName}</div>
                        </div>
                      </td>
                      <td className="px-6 ml-3 py-4 text-sm text-gray-500  md:table-cell">
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="mr-2 text-blue-500" />
                          {project.location?.city}, {project.location?.state}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                        {project.projectType}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                        <div>Total: {project.totalUnits}</div>
                        <div>Available: {project.availableUnits}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(project.launchDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(project.status)}`}>
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          {project.isUpcoming && ' (Upcoming)'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-right whitespace-nowrap">
                        <div className="relative inline-block text-left dropdown">
                          <button
                            className="inline-flex items-center justify-center w-8 h-8 text-gray-500 bg-white rounded-full hover:text-gray-700 focus:outline-none"
                            id={`dropdown-button-${project._id}`}
                            onClick={() => setSelectedProject(project)}
                          >
                            <FaEllipsisV className="w-4 h-4" />
                          </button>
                          
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center whitespace-nowrap">
                      <div className="text-sm text-gray-500">No projects found</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredProjects.length > 0 && totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
              <div className="flex items-center">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(currentPage - 1) * projectsPerPage + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * projectsPerPage, totalProjects)}
                  </span>{" "}
                  of <span className="font-medium">{totalProjects}</span> projects
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
                  {[...Array(Math.min(5, totalPages))].map((_, index) => {
                    const pageNumber = currentPage <= 3 ?
                      index + 1 :
                      currentPage >= totalPages - 2 ?
                        totalPages - 4 + index :
                        currentPage - 2 + index;

                    return pageNumber <= totalPages && (
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
                  })}
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
        </motion.div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex -top-10 items-center justify-center overflow-y-auto bg-black bg-opacity-50"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto backdrop-blur-sm"
                onClick={e => e.stopPropagation()}
              >
                <div className="relative mb-8">
                  <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-500 rounded-full opacity-10"></div>
                  <div className="flex justify-between items-center">
                    <h2 className="text-3xl uppercase font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                      {selectedProject.projectName}
                    </h2>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="rounded-full p-2 hover:bg-gray-100 transition-all"
                    >
                      <FaTimes size={20} className="text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="col-span-2">
                      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-blue-100 rounded-lg">
                                <FaBuilding className="text-blue-600 w-5 h-5" />
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Project Type</h3>
                                <p className="text-lg font-semibold">{selectedProject.projectType}</p>
                              </div>
                            </div>
                            
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-purple-100 rounded-lg">
                                <FaMapMarkerAlt className="text-purple-600 w-5 h-5" />
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                                <p className="text-lg font-semibold">{selectedProject.location.city}</p>
                                <p className="text-sm text-gray-500">{selectedProject.location.state}</p>
                              </div>
                            </div>
                          </div>
                          <div>
                              <h4 className="text-sm font-medium text-gray-500 mb-1">Units</h4>
                              <div className="flex space-x-4">
                                <div className="bg-green-50 rounded-lg px-3 py-2">
                                  <span className="text-sm text-green-700">Total: {selectedProject.totalUnits}</span>
                                </div>
                                <div className="bg-blue-50 rounded-lg px-3 py-2">
                                  <span className="text-sm text-blue-700">Available: {selectedProject.availableUnits}</span>
                                </div>
                              </div>
                            </div>
                        </div>
                      </div>

                      <div className="mt-6 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-semibold mb-4">Project Gallery</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {selectedProject.images.map((image, index) => (
                            <motion.div
                              key={index}
                              className="relative group rounded-xl overflow-hidden"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <img
                                src={`${process.env.REACT_APP_backendUrl}/storage/${image}`}
                                alt={`Project ${index + 1}`}
                                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-semibold mb-4">Seller Information</h3>
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm  text-gray-500">Name</label>
                            <p className="font-medium ">{selectedProject.sellerId.sellerDetails.name}</p>
                          </div>
                          <div>
                            <label className="text-sm text-gray-500">Type</label>
                            <p className="font-medium">{selectedProject.sellerId.sellerType}</p>
                          </div>
                          <div>
                            <label className="text-sm text-gray-500">Email</label>
                            <p className="font-medium">{selectedProject.sellerId.sellerDetails.email}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-semibold mb-4">Project Status</h3>
                        <div className="space-y-4">
                          <div className={`px-4 py-2 rounded-lg ${selectedProject.status === 'active' ? 'bg-green-100 text-green-800' :
                              selectedProject.status === 'blocked' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                            }`}>
                            {selectedProject.status.charAt(0).toUpperCase() + selectedProject.status.slice(1)}
                            {selectedProject.isUpcomming ? " (Upcoming)" : ""}
                          </div>

                          <div className="flex flex-col space-y-3">
                            {selectedProject.status === "requested" && (
                              <button
                                onClick={() => {
                                  setSelectedProject(null);
                                  openStatusConfirmation(selectedProject, "active");
                                }}
                                className="group relative w-full px-6 py-3 bg-white border-2 border-green-500 rounded-xl overflow-hidden"
                              >
                                <span className="absolute inset-0 w-0 bg-green-500 transition-all duration-[250ms] ease-out group-hover:w-full"></span>
                                <span className="relative text-green-500 text-sm font-semibold group-hover:text-white transition-colors">
                                  Approve Project
                                </span>
                              </button>
                            )}
                            {selectedProject.status !== "blocked" && selectedProject.status !== "closed" && (
                              <button
                                onClick={() => {
                                  setSelectedProject(null);
                                  openStatusConfirmation(selectedProject, "blocked");
                                }}
                                className="group relative w-full px-6 py-3 bg-white border-2 border-red-500 rounded-xl overflow-hidden shadow-[0_2px_15px_-3px_rgba(251,146,60,0.2)] hover:shadow-[0_2px_15px_-3px_rgba(251,146,60,0.4)] transition-shadow"
                              >
                                <span className="absolute inset-0 w-0 bg-red-500 transition-all duration-[250ms] ease-out group-hover:w-full"></span>
                                <span className="relative text-red-500 text-sm font-semibold group-hover:text-white transition-colors">
                                  Block Project
                                </span>
                              </button>
                            )}
                            
                            {selectedProject.status === "active" && (
                              <button
                                onClick={() => {
                                  setSelectedProject(null);
                                  setProjectToAction(selectedProject);
                                  setShowFeaturedModal(true);
                                  setFeaturedEndDate("");
                                  setDateError("");
                                }}
                                className="group relative w-full px-6 py-3 bg-white border-2 border-purple-500 rounded-xl overflow-hidden shadow-[0_2px_15px_-3px_rgba(250,204,21,0.2)] hover:shadow-[0_2px_15px_-3px_rgba(250,204,21,0.4)] transition-shadow"
                              >
                                <span className="absolute inset-0 w-0 bg-purple-500 transition-all duration-[250ms] ease-out group-hover:w-full"></span>
                                <span className="relative text-purple-500 text-sm font-semibold group-hover:text-white transition-colors">
                                  <FaStar className="inline-block mr-2" /> Mark as Featured
                                </span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold mb-4">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedProject.description}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>



        {/* Status Change Confirmation Modal */}
        <AnimatePresence>
          {showStatusConfirmation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 -top-10 flex items-center justify-center bg-black bg-opacity-50"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white  rounded-lg p-6 max-w-md w-full mx-4"
              >
                <h3 className="text-xl font-semibold mb-4">Confirm Status Change</h3>
                <p className="text-gray-600 mb-6">
                  {actionType === "active" && projectToAction?.status === "requested" &&
                    "Are you sure you want to approve this project?"}
                  {actionType === "active" && projectToAction?.status === "blocked" &&
                    "Are you sure you want to unblock this project?"}
                  {actionType === "blocked" &&
                    "Are you sure you want to block this project?"}
                  {actionType === "closed" &&
                    "Are you sure you want to mark this project as closed?"}
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowStatusConfirmation(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    disabled={actionLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmedAction}
                    className={`px-4 py-2 text-white rounded transition-colors disabled:opacity-50 ${actionType === "active" ? "bg-green-500 hover:bg-green-600" :
                      actionType === "blocked" ? "bg-red-500 hover:bg-red-600" :
                        "bg-blue-500 hover:bg-blue-600"
                      }`}
                    disabled={actionLoading}
                  >
                    {actionLoading ? "Processing..." : "Confirm"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Featured Project Modal */}
        <AnimatePresence>
          {showFeaturedModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 -top-10 z-50 flex items-center justify-center bg-black bg-opacity-50"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaStar className="text-yellow-500 mr-2" /> Mark Project as Featured
                </h3>
                <p className="text-gray-600 mb-6">
                  This project will be displayed in the featured section until the specified end date.
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
                    onClick={() => setShowFeaturedModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    disabled={actionLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleFeatureProject}
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

export default ManageProjects;

