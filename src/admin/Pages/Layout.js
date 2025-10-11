import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import { toast } from "react-toastify"
import {
  
  FaBars,
  FaTimes,
  FaBell,
  FaSignOutAlt,
  FaLock,
  FaChevronUp,
  FaSearch,
  FaChevronDown,
  FaPhone,
  FaKey,
  FaEye,
  FaEyeSlash,
  FaSpinner,
} from "react-icons/fa"
import Notifications from "../components/Notifications"
import logo from '../../media/LandsAcers Icon LOGO.png'
import { Building, Building2, Home, HomeIcon, Image, MessageSquare, SubscriptIcon, UserCog, Users, Users2, Wallet } from "lucide-react"
import ADMIN_API_ROUTES from "../AdminRequestPath"

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState({})
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
  const [passwordChangeStep, setPasswordChangeStep] = useState(1)
  const [passwordData, setPasswordData] = useState({
    phoneNumber: "",
    otp: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const location = useLocation()
  const navigate = useNavigate();


  const navigationItems = [
    { icon: HomeIcon, label: "Home", path: "/admin/dashboard" },
    {
      icon: Users2, 
      label: "Users",
      path: "/admin/users",
      subItems: [{ label: "Manage Users", path: "/admin/users/manage" }],
    },
    {
      icon: UserCog,
      label: "Sallers",
      path: "/admin/sallers", 
      subItems: [
        { label: "Manage sallers", path: "/admin/sallers/manage" },
      ],
    },
    {
      icon: Building2,
      label: "Properties",
      path: "/admin/properties",
      subItems: [
        { label: "Manage Properties", path: "/admin/properties" },
      ],
    },
    {
      icon: Building,
      label: "Projects", 
      path: "/admin/projects",
      subItems: [
        { label: "Manage Projects", path: "/admin/projects" },
      ],
    },
    {
      icon: Image,
      label: "Featured Items",
      path: "/admin/featured",
      subItems: [
        { label: "Manage Featured", path: "/admin/featured/manage" },
      ],
    },
    {
      icon: MessageSquare,
      label: "Website Feedbacks",
      path: "/admin/feedbacks",
    },
    {
      icon: SubscriptIcon,
      label: "Subscription",
      path: "/admin/subscription", 
      subItems: [
        { label: "Manage Subscription", path: "/admin/subscription/manage" },
        { label: "Edit Subscription", path: "/admin/subscription/edit" }
      ],
    },
    { icon: Wallet, label: "Payments", path: "/admin/all/payments" },
  ]

  const toggleExpanded = (label) => {
    setExpandedItems((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [])

  const renderNavigationItems = (items, mobile = false) => (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ delay: index * 0.1 }}
          className="mb-2"
        >
          <Link
            to={item.path}
            className={`flex items-center justify-between rounded-lg px-4 py-2 text-gray-700 hover:bg-[#3B82F6] hover:text-white cursor-pointer transition-all duration-200 ${location.pathname === item.path ? "bg-[#3B82F6] text-white" : ""
              } ${mobile ? "text-sm" : ""}`}
            onClick={(e) => {
              if (item.subItems) {
                e.preventDefault()
                toggleExpanded(item.label)
              } else if (mobile) {
                setIsMobileMenuOpen(false)
              }
            }}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 10 }}
                className={`h-5 w-5 ${location.pathname === item.path ? "animate-pulse" : ""}`}
              >
                <item.icon />
              </motion.div>
              <span>{item.label}</span>
            </div>
            {item.subItems && (
              <motion.div animate={{ rotate: expandedItems[item.label] ? 180 : 0 }} transition={{ duration: 0.3 }}>
                {expandedItems[item.label] ? (
                  <FaChevronUp className="w-4 h-4" />
                ) : (
                  <FaChevronDown className="w-4 h-4" />
                )}
              </motion.div>
            )}
          </Link>
          <AnimatePresence>
            {item.subItems && expandedItems[item.label] && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0, height: 0 },
                  visible: { opacity: 1, height: "auto" },
                }}
                transition={{ duration: 0.3 }}
                className={`ml-8 mt-1 space-y-1 ${mobile ? "text-sm" : ""}`}
              >
                {item.subItems.map((subItem) => (
                  <motion.div
                    key={subItem.label}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <Link
                      to={subItem.path}
                      className={`block rounded-lg px-4 py-1.5 text-gray-600 hover:text-[#3B82F6] transition-all duration-200 ${location.pathname === subItem.path ? "bg-blue-100 text-[#3B82F6]" : ""
                        }`}
                      onClick={() => mobile && setIsMobileMenuOpen(false)}
                    >
                      {subItem.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -256 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 z-20 hidden w-64 h-full transition-all duration-300 ease-in-out bg-white border-r shadow-lg lg:block"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center px-5 gap-3 text-blue-500 font-semibold justify-start h-16"
        >
          <img src={logo} alt="Land Acre Logo" className="h-8 w-42" />Land Acre
        </motion.div>
        <nav className="h-[calc(100vh-4rem)] overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100">
          {renderNavigationItems(navigationItems)}
        </nav>
        <div className="text-center bg-white fixed bottom-0 w-full  p-4 text-gray-500 text-sm mt-4">
            Developed by <a href="https://naman-web.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Naman Jain</a> form <a href="https://nxt-gen-digitals.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">NxtGenDigitals</a>
      </div>
      </motion.aside>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg"
            >
              <div className="flex h-16 items-center justify-between border-b bg-[#3B82F6] px-6">
                <h1 className="text-lg font-bold text-white">Property Admin</h1>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white transition-colors duration-200 rounded-md hover:bg-blue-600"
                >
                  <FaTimes className="w-6 h-6" />
                </motion.button>
              </div>
              <nav className="h-[calc(100vh-4rem)] overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100">
                {renderNavigationItems(navigationItems, true)}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex flex-col min-h-screen lg:pl-64">
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="sticky top-0 z-10 flex items-center h-16 gap-4 px-4 bg-white border-b shadow-md lg:px-8"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-gray-400 transition-colors duration-200 rounded-md hover:bg-gray-100 lg:hidden"
          >
            <FaBars className="w-6 h-6" />
          </motion.button>
          <div className="flex items-center flex-1 gap-4">
            <div className="relative flex-1 max-w-xl">
              <FaSearch className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
              <motion.input
                initial={{ width: "90%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.3 }}
                type="search"
                placeholder="Search properties, users, brokers..."
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-[#3B82F6] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] transition-all duration-200"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsNotificationsOpen(true)}
              className="relative p-2 text-gray-400 transition-colors duration-200 rounded-full hover:bg-gray-100"
            >
              <FaBell className="w-5 h-5" />
              <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1 animate-ping"></span>
            </motion.button>
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="h-8 w-8 rounded-full bg-[#3B82F6] text-white flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <span className="text-sm font-medium">J</span>
              </motion.button>
              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg"
                  >
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false)
                        setIsChangePasswordOpen(true)
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                    >
                      <FaLock className="w-4 h-4 mr-2" />
                      Change Password
                    </button>
                    <Link
                      to="/logout"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <FaSignOutAlt className="w-4 h-4 mr-2" />
                      Logout
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.header>

        {/* Page Content */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex-grow p-4 bg-gray-100 lg:p-8"
        >
          {children}
        </motion.main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="px-8 py-4 text-sm text-center text-gray-500 bg-white border-t"
        >
          © 2023 Land Acre. All rights reserved.
        </motion.footer>
      </div>

      {/* Notifications Modal */}
      <Notifications isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />

      {/* Change Password Modal */}
      <AnimatePresence>
        {isChangePasswordOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"
            onClick={() => !loading && setIsChangePasswordOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => !loading && setIsChangePasswordOpen(false)}
                disabled={loading}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 disabled:opacity-50"
              >
                <FaTimes size={20} />
              </button>

              <h2 className="mb-6 text-2xl font-bold text-gray-800 text-center">
                {passwordChangeStep === 1 && "Change Password"}
                {passwordChangeStep === 2 && "Verify OTP"}
                {passwordChangeStep === 3 && "Set New Password"}
              </h2>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}

              {passwordChangeStep === 1 && (
                <form onSubmit={(e) => {
                  e.preventDefault()
                  if (!passwordData.phoneNumber) {
                    setError("Please enter your phone number")
                    return
                  }
                  
                  setLoading(true)
                  setError("")
                  
                  axios.post(`${ADMIN_API_ROUTES.CHANGE_PASSWORD}`, {
                    phoneNumber: passwordData.phoneNumber
                  })
                  .then(response => {
                    toast.success("OTP sent successfully!")
                    setPasswordChangeStep(2)
                  })
                  .catch(error => {
                    setError(error.response?.data?.message || "Failed to send OTP. Please try again.")
                  })
                  .finally(() => {
                    setLoading(false)
                  })
                }}>
                  <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                      <input
                        id="phoneNumber"
                        type="text"
                        value={passwordData.phoneNumber}
                        onChange={(e) => setPasswordData({...passwordData, phoneNumber: e.target.value})}
                        className="w-full py-3 pl-10 pr-4 transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-3 text-lg font-semibold text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 flex justify-center items-center"
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="w-5 h-5 mr-2 animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                </form>
              )}

              {passwordChangeStep === 2 && (
                <form onSubmit={(e) => {
                  e.preventDefault()
                  if (!passwordData.otp) {
                    setError("Please enter the OTP")
                    return
                  }
                  
                  setPasswordChangeStep(3)
                }}>
                  <div className="mb-4">
                    <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-700">
                      Enter OTP
                    </label>
                    <div className="relative">
                      <FaKey className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                      <input
                        id="otp"
                        type="text"
                        value={passwordData.otp}
                        onChange={(e) => setPasswordData({...passwordData, otp: e.target.value})}
                        className="w-full py-3 pl-10 pr-4 transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setPasswordChangeStep(1)
                        setError("")
                      }}
                      disabled={loading}
                      className="w-1/2 px-4 py-3 text-lg font-semibold text-gray-700 transition duration-200 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-1/2 px-4 py-3 text-lg font-semibold text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50"
                    >
                      Verify OTP
                    </button>
                  </div>
                </form>
              )}

              {passwordChangeStep === 3 && (
                <form onSubmit={(e) => {
                  e.preventDefault()
                  if (!passwordData.newPassword) {
                    setError("Please enter a new password")
                    return
                  }
                  
                  if (passwordData.newPassword !== passwordData.confirmPassword) {
                    setError("Passwords do not match")
                    return
                  }
                  
                  setLoading(true)
                  setError("")
                  
                  axios.post(`${ADMIN_API_ROUTES.VERIFY_PASSWORD_OTP}`, {
                    phoneNumber: passwordData.phoneNumber,
                    otp: passwordData.otp,
                    newPassword: passwordData.newPassword
                  })
                  .then(response => {
                    toast.success("Password changed successfully!")
                    setIsChangePasswordOpen(false)
                    setPasswordChangeStep(1)
                    setPasswordData({
                      phoneNumber: "",
                      otp: "",
                      newPassword: "",
                      confirmPassword: ""
                    })
                  })
                  .catch(error => {
                    setError(error.response?.data?.message || "Failed to change password. Please try again.")
                  })
                  .finally(() => {
                    setLoading(false)
                  })
                }}>
                  <div className="mb-4">
                    <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                      <input
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className="w-full py-3 pl-10 pr-12 transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter new password"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                      <input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        className="w-full py-3 pl-10 pr-12 transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Confirm new password"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setPasswordChangeStep(2)
                        setError("")
                      }}
                      disabled={loading}
                      className="w-1/2 px-4 py-3 text-lg font-semibold text-gray-700 transition duration-200 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-1/2 px-4 py-3 text-lg font-semibold text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 flex justify-center items-center"
                    >
                      {loading ? (
                        <>
                          <FaSpinner className="w-5 h-5 mr-2 animate-spin" />
                          Changing Password...
                        </>
                      ) : (
                        "Change Password"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center md:hidden bg-white fixed bottom-0 w-full  p-4 text-gray-500 text-sm mt-4">
            Developed by <a href="https://naman-web.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Naman Jain</a> form <a href="https://nxt-gen-digitals.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">NxtGenDigitals</a>
      </div>
    </div>
  )
}

export default Layout

