import { useEffect, useState, useRef } from "react"
import { FiSearch, FiBell, FiEdit, FiLock, FiUser, FiHome, FiPlusSquare, FiGrid, FiFolderPlus, FiLayers, FiFolder, FiMenu, FiLogOut } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import sellerNotificationsPromise from "../Requests/FatchSellerNotifications"
import markAllNotificationsRead from "../Requests/MarkNotificationReaded"
import logo from '../media/LandsAcers Icon LOGO.png'
import { AnimatePresence, motion } from "framer-motion" 

const navItems = [
  { name: "Dashboard", icon: FiHome, path: "/saller/dashboard" },
  { name: "Add Property", icon: FiPlusSquare, path: "/saller/property/add" },
  { name: "All Properties", icon: FiGrid, path: "/saller/properties" },
  { name: "Add Project", icon: FiFolderPlus, path: "/saller/project/add" },
  { name: "All Projects", icon: FiLayers, path: "/saller/projects" },
  { name: "Queries", icon: FiFolder, path: "/saller/queries/manage" },
  { name: "Subscription", icon: FiUser, path: "/saller/subscription" },
];

const Header = ({ isMenuOpen, setIsMenuOpen, sellerDetails }) => {
  const navigate = useNavigate()
  const [showProfileOptions, setShowProfileOptions] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [sellerNotifications, setSellerNotifications] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isMarkingAsRead, setIsMarkingAsRead] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const searchRef = useRef(null)
  const notificationsRef = useRef(null)
  const searchInputRef = useRef(null)

  useEffect(() => {
    sellerNotificationsPromise
      .then(data => setSellerNotifications(data.notifications))
      .catch(error => toast.error('Something went wrong'));
  }, [localStorage.getItem('sellerToken')]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([])
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
      
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, []);

  const handleMarkAllAsRead = async () => {
    try {
      setIsMarkingAsRead(true)
      await markAllNotificationsRead();
      setSellerNotifications(prev => prev.map(notification => ({
        ...notification,
        isRead: true
      })));
      toast.success("All notifications marked as read");
    } catch (error) {
      toast.error(error.message || "Failed to mark notifications as read");
    } finally {
      setIsMarkingAsRead(false)
    }
    setShowNotifications(false);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)

    if (query.length > 0) {
      const filtered = navItems.filter(item =>
        item.name.toLowerCase().includes(query)
      )
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }

  const navigateTo = (path) => {
    setShowMobileSearch(false)
    setSearchResults([])
    setSearchQuery("")
    navigate(path)
  }

  const SearchInput = ({ className = "" }) => (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <FiSearch className="w-5 h-5 text-gray-400" />
      </div>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search navigation items..."
        value={searchQuery}
        onChange={handleSearch}
        className="block w-full py-2 pl-10 pr-3 text-sm placeholder-gray-500 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </div>
  )

  const handleLogout = () => {
    localStorage.removeItem('sellerToken')
    navigate('/saller/login')
  }

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 lg:hidden"
            >
              <FiMenu className="h-6 w-6" />
            </button>
            <div className="flex justify-center items-center gap-2 font-bold md:hidden"><img src={logo} alt="Land Acre Logo" className=" h-8 ml-3" />Land Acers</div>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex items-center flex-1" ref={searchRef}>
            <div className="w-full max-w-2xl relative">
              <SearchInput />
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                  {searchResults.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => navigateTo(item.path)}
                      className="flex items-center p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <item.icon className="w-5 h-5 text-gray-600 mr-3" />
                      <span className="text-sm text-gray-700">{item.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          
          

          <div className="flex items-center gap-4">
            <div className="relative" ref={notificationsRef}>
              <button
                className="relative p-2 text-gray-400 hover:text-gray-500"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <FiBell className="w-6 h-6" />
                {sellerNotifications.some(notification => !notification.isRead) && (
                  <span className="absolute w-2 h-2 bg-red-500 rounded-full top-2 right-2"></span>
                )}
              </button>

              {showNotifications && (
                <> 
                <AnimatePresence>
                
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setShowNotifications(false)}
                  />
                
                </AnimatePresence>
                <div className="absolute z-50 -right-[10vw] md:right-0 overflow-hidden top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    <div className="flex gap-3 items-center">
                      <button
                        onClick={handleMarkAllAsRead}
                        disabled={isMarkingAsRead}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isMarkingAsRead 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:bg-gray-100'
                        }`}
                        title="Mark all as read"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.999 14.413-3.713-3.705L7.7 11.3l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706z"/>
                        </svg>
                      </button>
                      <Link
                        to="/saller/notifications"
                        onClick={() => setShowNotifications(false)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View all notifications"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {sellerNotifications.length > 0 ? (
                      sellerNotifications.map((notification, index) => (
                        <div
                          key={index}
                          className={`group relative flex items-start p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors ${
                            !notification.isRead ? 'pl-3 border-l-4 border-blue-500' : 'pl-4'
                          }`}
                        >
                          <div className="flex-shrink-0 mt-1">
                            <div className={`w-2.5 h-2.5 rounded-full ${
                              !notification.isRead ? 'bg-blue-500' : 'bg-transparent'
                            }`} />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className={`text-sm ${
                              !notification.isRead 
                                ? 'text-gray-900 font-medium' 
                                : 'text-gray-600'
                            }`}>
                              {notification.message}
                            </p>
                            {notification.createdAt && (
                              <p className="mt-1 text-xs text-gray-400">
                                {new Date(notification.createdAt).toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                        </svg>
                        <p className="text-sm text-gray-400">No new notifications</p>
                      </div>
                    )}

                    <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent pt-6 pb-2 px-4">
                      <Link
                        to="/saller/notifications"
                        onClick={() => setShowNotifications(false)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        View Notification History
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
                </>
              )}
            </div>

            <div className="relative flex p-2 items-center gap-3"
              onMouseEnter={() => setShowProfileOptions(true)}
              onMouseLeave={() => setShowProfileOptions(false)}>
              <div className="flex items-center justify-center w-8 h-8 bg-gray-200 overflow-hidden rounded-full">
                {sellerDetails?.profilePicture ? (
                  <img
                    src={`https://api.landacre.in/storage/${sellerDetails.profilePicture}`}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-600">
                    {sellerDetails?.name[0].toUpperCase()}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-sm font-medium text-gray-700">{sellerDetails?.name}</span>

              {showProfileOptions && (
                <div className="absolute right-0 sm:-left-1/2 top-[90%] w-48 py-1 mt-2 bg-white rounded-md shadow-lg"
                  onMouseEnter={() => setShowProfileOptions(true)}
                  onMouseLeave={() => setShowProfileOptions(false)}>
                  <Link to="/saller/update-profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <FiEdit className="mr-2" /> Edit Profile
                  </Link>
                  <Link to="/saller/change-password" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <FiLock className="mr-2" /> Change Password
                  </Link>
                  <button onClick={handleLogout} className="flex w-full items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-100">
                    <FiLogOut className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
