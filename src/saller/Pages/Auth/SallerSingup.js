"use client"

import { useState } from "react"
import { Building2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import { motion, AnimatePresence } from "framer-motion"
import "react-toastify/dist/ReactToastify.css"

const SellerSignUpPage = () => {
  const navigate = useNavigate()
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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0])
  }

  const handleGetOTP = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

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

    const formDataToSend = new FormData()
    Object.keys(formData).forEach((key) => {
      if (key !== "confirmPassword") {
        formDataToSend.append(key, formData[key])
      }
    })
    formDataToSend.append("profilePicture", profilePicture)

    try {
      const response = await axios.post("https://landacers-backend.onrender.com/api/sellers/register", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 10000, // 10 second timeout
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
        "https://landacers-backend.onrender.com/api/sellers/verify-registration",
        {
          phone: registrationData.phone,
          otp: otp,
        },
        {
          timeout: 10000,
        },
      )

      if (response.data.success) {
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
      className="space-y-6"
    >
      <div>
        <label className="block mb-2 text-sm font-medium">Seller Type</label>
        <select
          name="sellerType"
          value={formData.sellerType}
          onChange={handleChange}
          className="w-full p-4 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="Individual">Individual</option>
          <option value="Agent">Agent</option>
          <option value="Builder">Builder</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-4 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your name"
          required
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-4 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-4 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter phone number"
          pattern="[0-9]{10}"
          required
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Company Name</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="w-full p-4 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter company name"
          required
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Address (Optional)</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-4 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your address"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-4 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Create password"
          required
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-4 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Confirm password"
          required
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-4 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
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
        <label className="block mb-2 text-sm font-medium">Enter OTP</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-4 text-2xl tracking-wider text-center border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••••"
          maxLength={6}
          pattern="[0-9]{6}"
          required
        />
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
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="hidden md:flex w-1/2 bg-[#4285F4] p-16 flex-col">
        <div className="flex items-center gap-3 mb-16">
          <Building2 className="w-8 h-8 text-white" />
          <span className="text-2xl font-bold text-white">LandsAcers</span>
        </div>

        <div className="flex-grow">
          <h1 className="mb-6 text-5xl font-bold text-white">
            Welcome back to
            <br />
            LandsAcers
          </h1>
          <p className="mb-12 text-xl text-white/90">
            Manage your properties, tenants, and
            <br />
            transactions all in one place.
          </p>

          <div className="p-8 bg-white/10 backdrop-blur-sm rounded-xl">
            <p className="mb-6 italic text-white/90">
              "This platform has revolutionized how we manage our properties. Everything is streamlined and efficient."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20"></div>
              <div>
                <p className="font-medium text-white">Sarah Johnson</p>
                <p className="text-white/70">Property Manager, NYC</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full p-8 overflow-y-auto bg-white md:w-1/2 md:px-16 md:py-12">
        <div className="max-w-xl mx-auto">
          <h2 className="mb-8 text-3xl font-bold">{showOtpForm ? "Enter OTP" : "Create your account"}</h2>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <AnimatePresence mode="wait">{showOtpForm ? renderOtpForm() : renderBasicDetailsForm()}</AnimatePresence>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/saller/login" className="text-[#4285F4] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SellerSignUpPage

