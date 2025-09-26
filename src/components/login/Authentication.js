import { useEffect, useState } from "react"
import { X } from "lucide-react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"

const LoginForm = ({ toggleForm, setIsOpen }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    
    const chakeLogin = ()=>{
      const User = localStorage.getItem('token')
      
      if(User) {
        setIsOpen(false)
      }
      
    }
    chakeLogin()
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await axios.post(`https://api.landacre.in/api/users/login`, {
        email: formData.email,
        password: formData.password,
      })

      if (response.data) {
        toast.success("Login successful!")
        // Store token or user data
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", JSON.stringify(response.data.user))
        setIsOpen(false)
        window.location.reload()
      }
    } catch (error) {
      
      setError(error.response?.data?.message || "An error occurred during login")
      toast.error("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-[600px]">
      <div className="flex-col items-center justify-center hidden w-1/2 p-8 text-white md:flex bg-gradient-to-br from-blue-500 to-blue-600">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="mb-4 text-4xl font-bold">
            Welcome Back
            <br />
            To LandAcre!
          </h1>
          <p className="mb-8 text-lg text-blue-100">
            We are so excited to have you here. Login to access exclusive offers, rewards, and discounts.
          </p>
          <button
            className="px-8 py-3 text-white transition-all bg-transparent border-2 border-white rounded-lg hover:bg-white hover:text-blue-600 hover:scale-105"
            onClick={toggleForm}
          >
            Don't have an account? Sign up.
          </button>
        </motion.div>
      </div>

      <div className="flex flex-col justify-center w-full  p-8 md:w-1/2">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <h2 className="mb-6 text-3xl font-bold text-gray-900">Login</h2>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg"
            >
              {error}
            </motion.div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="support@bytewebster.com"
                className="w-full px-4 text-gray-700 transition-all border border-gray-200 h-14 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 text-gray-700 transition-all border border-gray-200 h-14 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full text-white transition-all h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl hover:shadow-lg disabled:opacity-50"
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
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </motion.button>
          </form>
          <button
            type="button"
            className="w-full mt-4 text-sm text-gray-700 transition-all bg-gray-100 h-14 rounded-xl md:hidden hover:bg-gray-200"
            onClick={toggleForm}
          >
            Don't have an account? Sign up.
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}

const SignUpForm = ({ toggleForm,setIsOpen }) => {
  const [showOtpForm, setShowOtpForm] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  })
  useEffect(()=>{
    const chakeLogin = ()=>{
      const User = localStorage.getItem('token')
      
      if(User) {
        setIsOpen(false)
      }
      
    }
    chakeLogin()
  },[])
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      const response = await axios.post(
        `https://api.landacre.in/api/users/register`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
        },
        {
          timeout: 10000, // 10 second timeout
        },
      )

      if (response.data) {
        // Store registration data in localStorage for OTP verification
        localStorage.setItem(
          "registrationData",
          JSON.stringify({
            phoneNumber: formData.phoneNumber,
            timestamp: new Date().getTime(),
          }),
        )
        toast.success(`OTP sent to your mobile number: ${formData.phoneNumber}`)
        setShowOtpForm(true)

      }
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Please try again.")
      toast.error("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const registrationData = JSON.parse(localStorage.getItem("registrationData"))
    if (!registrationData || !registrationData.phoneNumber) {
      setError("Registration session expired. Please register again.")
      setShowOtpForm(false)
      return
    }

    try {
      const response = await axios.post(
        `https://api.landacre.in/api/users/register/verify-otp`,
        {
          phoneNumber: registrationData.phoneNumber,
          otp: otp,
        },
        {
          timeout: 10000,
        },
      )

      if (response.status === 201) {
        toast.success("Registration successful!")
        localStorage.removeItem("registrationData") // Clean up
        // Store token if provided
        toggleForm()
      } else {
        setError("OTP verification failed")
        toast.error("OTP verification failed. Please try again.")

      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid OTP")
      toast.error("OTP verification failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-[700px] overflow-y-scroll">
      <div className="flex-col items-center justify-center hidden w-1/2 p-8 text-white md:flex bg-gradient-to-br from-blue-500 to-blue-600">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="mb-4 text-4xl font-bold">
            Join LandAcre
            <br />
            Today!
          </h1>
          <p className="mb-8 text-lg text-blue-100">
            Create an account to unlock exclusive property listings, save your favorites, and get personalized
            recommendations.
          </p>
          <button
            className="px-8 py-3 text-white transition-all bg-transparent border-2 border-white rounded-lg hover:bg-white hover:text-blue-600 hover:scale-105"
            onClick={toggleForm}
          >
            Already have an account? Login.
          </button>
        </motion.div>
      </div>

      <div className="flex flex-col justify-center w-full p-8 md:w-1/2">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <h2 className="mb-4 text-3xl font-bold text-gray-900">{showOtpForm ? "Verify OTP" : "Create Account"}</h2>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {!showOtpForm ? (
              <motion.form
                key="registration"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleRegistrationSubmit}
                className="space-y-3"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full h-12 px-3 text-gray-700 transition-all border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full h-12 px-3 text-gray-700 transition-all border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-12 px-3 text-gray-700 transition-all border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full h-12 px-3 text-gray-700 transition-all border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    pattern="[0-9]{10}"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                    Create Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full h-12 px-3 text-gray-700 transition-all border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full h-12 px-3 text-gray-700 transition-all border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 text-white transition-all bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl hover:shadow-lg disabled:opacity-50"
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
            ) : (
              <motion.form
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleOtpSubmit}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-700">
                    Enter 6-digit OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 text-2xl tracking-wider text-center text-gray-700 transition-all border border-gray-200 h-14 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    maxLength={6}
                    pattern="[0-9]{6}"
                    placeholder="••••••"
                  />
                  <p className="mt-2 text-sm text-center text-gray-500">OTP sent to your mobile number</p>
                </div>

                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full text-white transition-all h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl hover:shadow-lg disabled:opacity-50"
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
                    className="w-full text-gray-700 transition-all bg-gray-100 h-14 rounded-xl hover:bg-gray-200"
                  >
                    Back to Registration
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}

const Authentication = ({ isOpen, setIsOpen }) => {
  const [signUpForm, setSignUpForm] = useState(false)

  const toggleForm = () => {
    setSignUpForm(!signUpForm)
  }

  const handleClose = ()=>{
document.body.style.overflow = 'auto'
setIsOpen(false)
  }
  

  

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-5xl mx-4 overflow-hidden bg-white shadow-2xl rounded-2xl"
      >
        <button
          onClick={() => handleClose()}
          className="absolute z-10 p-2 text-gray-500 transition-colors rounded-full right-4 top-4 hover:text-gray-700 hover:bg-gray-100"
        >
          <X className="w-6 h-6" />
        </button>
        <AnimatePresence mode="wait">
          {signUpForm ? (
            <SignUpForm key="signup" toggleForm={toggleForm}  setIsOpen={setIsOpen}/>
          ) : (
            <LoginForm key="login" toggleForm={toggleForm} setIsOpen={setIsOpen}/>
          )}
        </AnimatePresence>
      </motion.div>
      
    </motion.div>
  )
}

export default Authentication

