import { useState } from "react"
import { Building2, Lock, Mail, Phone } from "lucide-react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import { motion, AnimatePresence } from "framer-motion"
import "react-toastify/dist/ReactToastify.css"

const AdminLogin = () => {
  const navigate = useNavigate()
  const [showOtpForm, setShowOtpForm] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleGetOTP = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await axios.post(`https://api.landacre.in/api/admin/login`, {
        email: formData.email,
        password: formData.password,
      })

      if (response.data) {
        toast.success("OTP sent successfully!")
        setShowOtpForm(true)
      } else {
        throw new Error(response.data.message || "Failed to send OTP")
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Failed to send OTP")
      toast.error(error.response?.data?.message || "Failed to send OTP")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await axios.post(`https://api.landacre.in/api/admin/verify`, {
        email: formData.email,
        otp: formData.otp,
      })

      if (response.data) {
        toast.success("Login successful!")
        if (response.data.token) {
          localStorage.setItem("adminToken", response.data.token)
        }
        navigate("/admin/dashboard")
      } else {
        throw new Error(response.data.message || "Invalid OTP")
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Invalid OTP")
      toast.error(error.response?.data?.message || "Invalid OTP")
    } finally {
      setLoading(false)
    }
  }

  const renderLoginForm = () => (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onSubmit={handleGetOTP}
      className="space-y-6"
    >
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full py-3 pl-10 pr-4 transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full py-3 pl-10 pr-4 transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your password"
            required
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="w-full px-4 py-3 text-lg font-semibold text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-3 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Sending OTP...
          </span>
        ) : (
          "Get OTP"
        )}
      </motion.button>
    </motion.form>
  )

  const renderOtpForm = () => (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onSubmit={handleVerifyOTP}
      className="space-y-6"
    >
      <div>
        <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-700">
          Enter OTP
        </label>
        <div className="relative">
          <Phone className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
          <input
            id="otp"
            name="otp"
            type="text"
            value={formData.otp}
            onChange={handleChange}
            className="w-full py-3 pl-10 pr-4 transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter 6-digit OTP"
            maxLength={6}
            pattern="[0-9]{6}"
            required
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="w-full px-4 py-3 text-lg font-semibold text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-3 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Verifying...
          </span>
        ) : (
          "Verify OTP"
        )}
      </motion.button>
      <button
        type="button"
        onClick={() => setShowOtpForm(false)}
        className="w-full px-4 py-3 text-lg font-semibold text-gray-700 transition duration-200 bg-gray-100 rounded-lg hover:bg-gray-200"
      >
        Back to Login
      </button>
    </motion.form>
  )

  return (
    <div className="flex flex-col min-h-screen lg:flex-row bg-gradient-to-br from-blue-500 to-indigo-600">
      {/* Left Panel */}
      <div className="flex flex-col justify-center p-8 text-white lg:w-1/2 lg:p-12">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-12">
            <Building2 className="w-10 h-10" />
            <span className="text-3xl font-bold">Land Acre</span>
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-tight lg:text-5xl">Admin Portal</h1>
          <p className="mb-8 text-xl text-blue-100">
            Manage your properties, users, and transactions all in one place.
          </p>

          <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
            <p className="mb-4 italic text-blue-50">
              "Our admin portal provides powerful tools for efficient property management and user oversight."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-200 rounded-full" />
              <div>
                <p className="font-medium">Admin Team</p>
                <p className="text-sm text-blue-200">Land Acre Management</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex items-center justify-center p-8 bg-white lg:w-1/2 lg:p-12">
        <div className="w-full max-w-md">
          <h2 className="mb-6 text-3xl font-bold text-center text-gray-900">
            {showOtpForm ? "Enter OTP" : "Admin Login"}
          </h2>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <AnimatePresence mode="wait">{showOtpForm ? renderOtpForm() : renderLoginForm()}</AnimatePresence>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AdminLogin

