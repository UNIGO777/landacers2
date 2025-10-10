import { useState, useEffect, useRef } from "react"
import { Building2, Lock, Mail, Phone, Eye, EyeOff, Shield, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import { motion, AnimatePresence } from "framer-motion"
import "react-toastify/dist/ReactToastify.css"

// Enhanced input component with mobile optimizations - moved outside to prevent re-creation
const MobileOptimizedInput = ({ 
  icon: Icon, 
  type, 
  name, 
  value, 
  placeholder, 
  required = true, 
  maxLength,
  pattern,
  inputMode,
  autoComplete,
  inputRef,
  showToggle = false,
  onToggle,
  handleChange,
  loading
}) => (
  <div className="relative group">
    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
      <Icon className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
    </div>
    <input
      ref={inputRef}
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={handleChange}
      onTouchStart={(e) => {
        // Only set font size to prevent zoom, don't stop propagation
        e.target.style.fontSize = '16px'
      }}
      onFocus={(e) => {
        // Ensure font size prevents zoom
        e.target.style.fontSize = '16px'
        // Gentle scroll to input with delay to allow keyboard to open
        setTimeout(() => {
          e.target.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest',
            inline: 'nearest'
          })
        }, 300)
      }}
      onBlur={(e) => {
        e.target.style.fontSize = ''
      }}
      className="w-full h-14 pl-12 pr-12 text-base bg-white border-2 border-gray-200 rounded-xl 
                 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none
                 transition-all duration-200 placeholder-gray-400
                 hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
      placeholder={placeholder}
      required={required}
      maxLength={maxLength}
      pattern={pattern}
      inputMode={inputMode}
      autoComplete={autoComplete}
      enterKeyHint={name === 'otp' ? 'done' : 'next'}
      spellCheck="false"
      autoCorrect="off"
      autoCapitalize="none"
      disabled={loading}
    />
    {showToggle && (
      <button
        type="button"
        onClick={onToggle}
        className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 
                   hover:text-gray-600 focus:outline-none focus:text-blue-500 
                   transition-colors duration-200"
      >
        {type === "password" ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
      </button>
    )}
  </div>
)

const AdminLogin = () => {
  const navigate = useNavigate()
  const [showOtpForm, setShowOtpForm] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  // Refs for input fields to handle mobile focus
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const otpRef = useRef(null)

  // Mobile optimization effects
  useEffect(() => {
    // Only prevent multi-touch zoom, don't interfere with single touch events
    const handleTouchStart = (e) => {
      // Only prevent if more than one finger (pinch zoom)
      if (e.touches.length > 1) {
        e.preventDefault()
      }
    }

    // Add event listener only for multi-touch prevention
    document.addEventListener('touchstart', handleTouchStart, { passive: false })

    // Cleanup
    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
    }
  }, [])

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



  const LoadingSpinner = () => (
    <div className="flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
      <span>{showOtpForm ? "Verifying..." : "Sending OTP..."}</span>
    </div>
  )

  const renderLoginForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      <form onSubmit={handleGetOTP} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <MobileOptimizedInput
              icon={Mail}
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter your admin email"
              inputMode="email"
              autoComplete="email"
              inputRef={emailRef}
              handleChange={handleChange}
              loading={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <MobileOptimizedInput
              icon={Lock}
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              autoComplete="current-password"
              inputRef={passwordRef}
              showToggle={true}
              onToggle={() => setShowPassword(!showPassword)}
              handleChange={handleChange}
              loading={loading}
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                     text-white font-semibold rounded-xl shadow-lg hover:shadow-xl 
                     focus:outline-none focus:ring-4 focus:ring-blue-100 
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                     transition-all duration-200 text-base"
        >
          {loading ? <LoadingSpinner /> : "Send OTP"}
        </motion.button>
      </form>
    </motion.div>
  )

  const renderOtpForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      <form onSubmit={handleVerifyOTP} className="space-y-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Verify Your Identity</h3>
          <p className="text-sm text-gray-600">
            We've sent a 6-digit code to <span className="font-medium">{formData.email}</span>
          </p>
        </div>

        <div>
          <label htmlFor="otp" className="block text-sm font-semibold text-gray-700 mb-2">
            Enter OTP Code
          </label>
          <MobileOptimizedInput
            icon={Shield}
            type="text"
            name="otp"
            value={formData.otp}
            placeholder="Enter 6-digit code"
            maxLength={6}
            pattern="[0-9]{6}"
            inputMode="numeric"
            autoComplete="one-time-code"
            inputRef={otpRef}
            handleChange={handleChange}
            loading={loading}
          />
        </div>

        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 
                       text-white font-semibold rounded-xl shadow-lg hover:shadow-xl 
                       focus:outline-none focus:ring-4 focus:ring-green-100 
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                       transition-all duration-200 text-base"
          >
            {loading ? <LoadingSpinner /> : "Verify & Login"}
          </motion.button>

          <button
            type="button"
            onClick={() => setShowOtpForm(false)}
            className="w-full h-12 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium 
                       rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>
        </div>
      </form>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col">
      {/* Header */}
      <div className="w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Land Acre Admin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl 
                         flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {showOtpForm ? "Enter Verification Code" : "Welcome Back"}
            </h1>
            
            <p className="text-gray-600 text-base">
              {showOtpForm 
                ? "Please enter the OTP sent to your email" 
                : "Sign in to your admin dashboard"
              }
            </p>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
              >
                <p className="text-sm text-red-700 text-center font-medium">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Container */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {showOtpForm ? renderOtpForm() : renderLoginForm()}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Secure admin access powered by Land Acre
            </p>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="rounded-xl"
      />
    </div>
  )
}

export default AdminLogin

