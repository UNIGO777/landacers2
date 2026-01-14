import { useState } from "react"
import { Building2, User, Mail, Phone, Lock, Image, Shield, Badge, MapPin, Building, Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import { motion, AnimatePresence } from "framer-motion"
import "react-toastify/dist/ReactToastify.css"

const SellerSignUpPage = () => {
  const navigate = useNavigate()
  const MAX_PROFILE_PICTURE_BYTES = 2 * 1024 * 1024
  const [showOtpForm, setShowOtpForm] = useState(false)
  const [formData, setFormData] = useState({
    sellerType: "Individual",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    address: "",
  })
  const [profilePicture, setProfilePicture] = useState(null)
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Updated password validation: at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const validatePassword = (password) => {
    // At least 8 characters, one uppercase, one lowercase, one number, one special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
    return regex.test(password)
  }

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const validatePhone = (phone) => {
    const regex = /^\d{10}$/
    return regex.test(phone)
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) {
      setProfilePicture(null)
      return
    }

    if (file.size > MAX_PROFILE_PICTURE_BYTES) {
      setError("Profile picture must be 2MB or smaller")
      toast.error("Profile picture must be 2MB or smaller")
      setProfilePicture(null)
      e.target.value = ""
      return
    }

    setProfilePicture(file)
  }

  const handleGetOTP = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address")
      setLoading(false)
      return
    }

    if (!validatePhone(formData.phone)) {
      setError("Please enter a valid 10-digit phone number")
      setLoading(false)
      return
    }

    if (!validatePassword(formData.password)) {
      setError("Password must be at least 8 characters, include uppercase, lowercase, number, and special character")
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (!profilePicture) {
      setError("Profile picture is required")
      setLoading(false)
      return
    }

    if (profilePicture.size > MAX_PROFILE_PICTURE_BYTES) {
      setError("Profile picture must be 2MB or smaller")
      setLoading(false)
      return
    }

    const formDataToSend = new FormData()
    Object.keys(formData).forEach((key) => {
      if (key !== "confirmPassword") {
        formDataToSend.append(key, formData[key])
      }
    })
    formDataToSend.append("profilePicture", profilePicture)

    try {
      const response = await axios.post(`https://api.landacre.in/api/sellers/register`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 10000,
      })

      if (response.data) {
        localStorage.setItem(
          "registrationData",
          JSON.stringify({
            phone: formData.phone,
            timestamp: new Date().getTime(),
          }),
        )
        toast.success(`OTP sent to your mobile number: ${formData.phone}`)
        setShowOtpForm(true)
      }
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Please try again.")
      toast.error("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const registrationData = JSON.parse(localStorage.getItem("registrationData"))
    if (!registrationData || !registrationData.phone) {
      setError("Registration session expired. Please register again.")
      setShowOtpForm(false)
      setLoading(false)
      return
    }

    try {
      const response = await axios.post(
        `https://api.landacre.in/api/sellers/verify-registration`,
        {
          phone: registrationData.phone,
          otp: otp,
        },
        {
          timeout: 10000,
        },
      )

      if (response.data) {
        toast.success("Registration successful!")
        localStorage.removeItem("registrationData")
        if (response.data.token) {
          localStorage.setItem("token", response.data.token)
        }
        navigate("/saller/dashboard")
      } else {
        throw new Error(response.data.message || "OTP verification failed")
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Invalid OTP")
      toast.error("OTP verification failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const renderBasicDetailsForm = () => (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onSubmit={handleGetOTP}
      className="space-y-4 mt-20 sm:mt-32 md:mt-0"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="w-4 h-4 text-gray-600" />
            <label className="text-sm font-medium">Seller Type</label>
          </div>
          <div className="relative">
            <Badge className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              name="sellerType"
              value={formData.sellerType}
              onChange={handleChange}
              className="w-full p-4 pl-10 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Individual">Individual</option>
              <option value="Agent">Agent</option>
              <option value="Builder">Builder</option>
            </select>
          </div>
        </div>

        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-gray-600" />
            <label className="text-sm font-medium">Full Name</label>
          </div>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 pl-10 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>
        </div>

        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4 text-gray-600" />
            <label className="text-sm font-medium">Email</label>
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 pl-10 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <Phone className="w-4 h-4 text-gray-600" />
            <label className="text-sm font-medium">Phone Number</label>
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-4 pl-10 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
              pattern="[0-9]{10}"
              onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
              maxLength="10"
              required
            />
          </div>
        </div>

        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <Building className="w-4 h-4 text-gray-600" />
            <label className="text-sm font-medium">Company Name</label>
          </div>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full p-4 pl-10 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company name"
              required
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-gray-600" />
            <label className="text-sm font-medium">Address (Optional)</label>
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-4 pl-10 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your address"
            />
          </div>
        </div>

        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-gray-600" />
            <label className="text-sm font-medium">Password</label>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 pl-10 pr-10 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-1 pl-1">
            Password must be at least 8 characters, include uppercase, lowercase, number, and special character.
          </div>
        </div>

        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-gray-600" />
            <label className="text-sm font-medium">Confirm Password</label>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-4 pl-10 pr-10 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <Image className="w-4 h-4 text-gray-600" />
            <label className="text-sm font-medium">Profile Picture</label>
          </div>
          <div className="relative">
            <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-4 pl-10 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="w-full bg-[#4285F4] text-white p-4 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
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
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-4 h-4 text-gray-600" />
          <label className="text-sm font-medium">Enter OTP</label>
        </div>
        <div className="relative">
          <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-4 pl-10 text-2xl tracking-wider text-center border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••"
            maxLength={6}
            pattern="[0-9]{6}"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full bg-[#4285F4] text-white p-4 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
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
          className="w-full p-4 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Back
        </button>
      </div>
    </motion.form>
  )

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex flex-col md:flex-row flex-1 w-full">
        {/* Left Side (Brand/Info) */}
        <div className="flex flex-col w-full md:w-1/2 bg-[#4285F4] p-6 sm:p-8 lg:p-12 min-h-[220px] justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6 sm:mb-8 md:mb-16">
              <Building2 className="w-8 h-8 text-white" />
              <span className="text-2xl font-bold text-white">Land Acre</span>
            </div>
            <div>
              <h1 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold text-white md:text-5xl">
                Welcome back to
                <br className="hidden sm:block" />
                Land Acre
              </h1>
              <p className="mb-6 sm:mb-8 text-base text-white/90 md:text-xl md:mb-12">
                Manage your properties, tenants, and
                <br className="hidden sm:block" />
                transactions all in one place.
              </p>
            </div>
          </div>
          <div className="p-4 hidden md:block bg-white/10 backdrop-blur-sm rounded-xl mt-4">
            <p className="mb-4 text-sm italic text-white/90 md:text-base md:mb-6">
              "This platform has revolutionized how we manage our properties. Everything is streamlined and efficient."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-white/20 md:w-12 md:h-12"></div>
              <div>
                <p className="text-sm font-medium text-white md:text-base">Sarah Johnson</p>
                <p className="text-xs text-white/70 md:text-sm">Property Manager, NYC</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4 sm:px-6 sm:py-8 md:px-8 md:py-12">
          <div className="w-full max-w-xl flex flex-col justify-center mx-auto py-8 sm:py-12 md:py-0">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl text-center md:text-left">
              {showOtpForm ? "Enter OTP" : "Create your account"}
            </h2>

            <AnimatePresence mode="wait">
              {showOtpForm ? renderOtpForm() : renderBasicDetailsForm()}
            </AnimatePresence>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 mb-4 mt-4 text-sm text-red-700 bg-red-100 rounded-lg md:mb-6"
              >
                {error}
              </motion.div>
            )}

            <p className="mt-4 text-center text-gray-600 md:mt-6">
              Already have an account?{" "}
              <Link to="/saller/login" className="text-[#4285F4] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SellerSignUpPage
