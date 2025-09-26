import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaUserAlt, FaFilter, FaEllipsisV, FaTrash, FaUserSlash, FaUserCheck, FaTimes, FaExclamationTriangle } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../Layout";
import ADMIN_API_ROUTES from "../../AdminRequestPath";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  const [filterStatus, setFilterStatus] = useState("active");
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    userId: null,
    currentStatus: null,
    action: null
  });

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(
        `${process.env.REACT_APP_backendUrl}${ADMIN_API_ROUTES.GET_USERS}?status=${filterStatus}&page=${currentPage}&limit=${usersPerPage}&sort=${sortConfig.key}&order=${sortConfig.direction}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setUsers(response.data.data);
        setFilteredUsers(response.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Search users
  const searchUsers = async () => {
    if (!searchQuery.trim()) {
      setFilteredUsers(users);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(
        `${process.env.REACT_APP_backendUrl}${ADMIN_API_ROUTES.SEARCH_USERS(searchQuery)}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setFilteredUsers(response.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to search users");
      setFilteredUsers([]);
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
    searchUsers();
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    filterUsers(e.target.value);
  };

  // Filter users based on status
  const filterUsers = (status) => {
    if (status === "all") {
      setFilteredUsers(users);
    } else if (status === "active") {
      setFilteredUsers(users.filter(user => user.isActive));
    } else if (status === "inactive") {
      setFilteredUsers(users.filter(user => !user.isActive));
    }
  };

  // Sort users
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Get sorted users
  const getSortedUsers = () => {
    const sortableUsers = [...filteredUsers];
    if (sortConfig.key) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  };

  // Open confirmation modal
  const openConfirmModal = (userId, currentStatus) => {
    setConfirmModal({
      isOpen: true,
      userId,
      currentStatus,
      action: currentStatus === "active" ? "block" : "unblock"
    });
  };

  // Close confirmation modal
  const closeConfirmModal = () => {
    setConfirmModal({
      isOpen: false,
      userId: null,
      currentStatus: null,
      action: null
    });
  };

  // Toggle user status
  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const token = localStorage.getItem("adminToken");
      const endpoint = currentStatus === "active" ? 
        ADMIN_API_ROUTES.BLOCK_USER(userId) : 
        ADMIN_API_ROUTES.UNBLOCK_USER(userId);
      
      const response = await axios.put(
        `${process.env.REACT_APP_backendUrl}${endpoint}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data) {
        toast.success(`User ${currentStatus === "active" ? "blocked" : "unblocked"} successfully`);
        // Update user in state
        fetchUsers();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update user status");
    } finally {
      closeConfirmModal();
    }
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = getSortedUsers().slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchUsers();
  }, [filterStatus, currentPage]);

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
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Manage Users</h2>
            <p className="mt-2 text-sm text-gray-600">
              View and manage all users registered on the platform
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={fetchUsers}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Refresh Users
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
                  placeholder="Search users by name, email or phone..."
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
                  <option value="active">Active Users</option>
                  <option value="blocked">Inactive Users</option>
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
                    onClick={() => requestSort("name")}
                  >
                    <div className="flex items-center justify-center">
                      Name
                      {sortConfig.key === "name" && (
                        <span className="ml-1">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium tracking-wider  text-gray-500 uppercase cursor-pointer"
                    onClick={() => requestSort("email")}
                  >
                    <div className="flex items-center justify-center">
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
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer"
                    onClick={() => requestSort("phone")}
                  >
                    <div className="flex items-center justify-center">
                      Phone
                      {sortConfig.key === "phone" && (
                        <span className="ml-1">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer"
                    onClick={() => requestSort("createdAt")}
                  >
                    <div className="flex items-center justify-center">
                      Joined Date
                      {sortConfig.key === "createdAt" && (
                        <span className="ml-1">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer"
                    onClick={() => requestSort("isActive")}
                  >
                    <div className="flex items-center justify-center">
                      Status
                      {sortConfig.key === "isActive" && (
                        <span className="ml-1">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
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
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                      </td>
                    </tr>
                  ))
                ) : currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            {user.profilePicture ? (
                              <img
                                className="object-cover w-10 h-10 rounded-full"
                                src={`${process.env.REACT_APP_backendUrl}/storage/${user.profilePicture}`}
                                alt={user.name}
                              />
                            ) : (
                              <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-200 rounded-full">
                              <FaUserAlt className="w-5 h-5 text-blue-500" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.firstName + " " + user.lastName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-900 ">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-900 ">{user.phoneNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-right whitespace-nowrap">
                      <div className="relative inline-block text-left dropdown">
                        <button
                          className="inline-flex items-center justify-center w-8 h-8 text-gray-500 bg-white rounded-full hover:text-gray-700 focus:outline-none"
                          id={`dropdown-button-${user._id}`}
                          onClick={() => {
                            const dropdown = document.getElementById(`dropdown-menu-${user._id}`);
                            dropdown.classList.toggle("hidden");
                          }}
                        >
                          <FaEllipsisV className="w-4 h-4" />
                        </button>
                        <div
                          id={`dropdown-menu-${user._id}`}
                          className="absolute right-0 z-10 hidden w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                        >
                          <div className="py-1" role="menu" aria-orientation="vertical">
                            
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                              onClick={() => openConfirmModal(user._id, user.status)}
                            >
                              {user.status === "active" ? (
                                <>
                                  <FaUserSlash className="w-4 h-4 mr-2 text-red-500" />
                                  Block User
                                </>
                              ) : (
                                <>
                                  <FaUserCheck className="w-4 h-4 mr-2 text-green-500" />
                                  Unblock User
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center whitespace-nowrap">
                    <div className="text-sm text-gray-500">No users found</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
            <div className="flex items-center">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastUser, filteredUsers.length)}
                </span>{" "}
                of <span className="font-medium">{filteredUsers.length}</span> users
              </p>
            </div>
            <div>
              <nav className="inline-flex -space-x-px rounded-md shadow-sm isolate" aria-label="Pagination">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
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
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
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

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmModal.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"
            onClick={closeConfirmModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-yellow-100 rounded-full">
                <FaExclamationTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              
              <h3 className="mb-2 text-lg font-medium text-center text-gray-900">
                {confirmModal.action === "block" ? "Block User" : "Unblock User"}
              </h3>
              
              <p className="mb-6 text-sm text-center text-gray-500">
                {confirmModal.action === "block" 
                  ? "Are you sure you want to block this user? They will no longer be able to access their account."
                  : "Are you sure you want to unblock this user? They will regain access to their account."}
              </p>
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={closeConfirmModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => toggleUserStatus(confirmModal.userId, confirmModal.currentStatus)}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    confirmModal.action === "block"
                      ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                      : "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                  }`}
                >
                  {confirmModal.action === "block" ? "Block" : "Unblock"}
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

export default ManageUsers;