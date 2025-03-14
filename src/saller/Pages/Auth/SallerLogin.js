import { useState } from "react"
import { Building2, KeyRound, Lock, Mail, Phone, X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { motion, AnimatePresence } from "framer-motion"
import ROUTES_NAME from "../../../constants/routes"




const SallerLogin = () => {
  const navigate = useNavigate()
  const [showOtpForm, setShowOtpForm] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
  })
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetPasswordStep, setResetPasswordStep] = useState(1);
  const [resetPasswordData, setResetPasswordData] = useState({
    phone: "",
    otp: "",
    newPassword: "",
  });

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const handleResetPasswordChange = (e) => {
    setResetPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSendResetOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_backendUrl}/api/sellers/send-change-password-otp`,
        { phone: resetPasswordData.phone }
      );
      if (response.data) {
        toast.success("OTP sent successfully!");
        setResetPasswordStep(2);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyResetOTP = async (e) => {
    e.preventDefault();
    if (resetPasswordData.otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    setResetPasswordStep(3);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validatePassword(resetPasswordData.newPassword)) {
      toast.error(
        "Password must be at least 8 characters long and contain uppercase, lowercase, number and special character"
      );
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_backendUrl}/api/sellers/change-password`,
        {
          phone: resetPasswordData.phone,
          otp: resetPasswordData.otp,
          newPassword: resetPasswordData.newPassword,
        }
      );
      if (response.data) {
        toast.success("Password changed successfully!");
        setShowForgotPassword(false);
        setResetPasswordStep(1);
        setResetPasswordData({ phone: "", otp: "", newPassword: "" });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  }


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
      const response = await axios.post(`${process.env.REACT_APP_backendUrl}/api/sellers/login`, {
        email: formData.email,
        password: formData.password,
      })
      console.log(response.data)
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
      const response = await axios.post(`${process.env.REACT_APP_backendUrl}/api/sellers/verify-login`, {
        email: formData.email,
        otp: formData.otp,
      })

      if (response.data) {
        toast.success("Login successful!")
        if (response.data.token) {
          localStorage.setItem("sellerToken", response.data.token)
        }
        window.location.href = ROUTES_NAME.SALLER_HOME
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
      {/* Login form remains the same */}
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
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to={ROUTES_NAME.SALLER_SIGNUP}
            className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            Sign Up
          </Link>
          
        </p>
        
      </div>
      <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Forgot Password?
            </button>
          </div>
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
      {/* OTP form remains the same */}
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
            <span className="text-3xl font-bold">LandsAcers</span>
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-tight lg:text-5xl">Seller Portal</h1>
          <p className=" mb-8 text-xl text-blue-100">
            List and manage your properties, track sales, and connect with potential buyers.
          </p>

          <div className="hidden md:block p-6 bg-white/10 rounded-xl backdrop-blur-sm">
            <p className="mb-4 italic text-blue-50">
              "Empowering sellers with intuitive tools for property management and sales growth."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-200 rounded-full" />
              <div>
                <p className="font-medium">Seller Support</p>
                <p className="text-sm text-blue-200">LandsAcers Seller Network</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex items-center  justify-center h-[60vh] md:h-screen p-8 bg-white lg:w-1/2 lg:p-12">
        <div className="w-full max-w-md">
          <h2 className="mb-6 text-3xl font-bold text-center text-gray-900">
            {showOtpForm ? "Enter OTP" : "Seller Login"}
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
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl"
          >
            <div className="flex justify-between mb-6">
              <h3 className="text-xl font-semibold">Reset Password</h3>
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetPasswordStep(1);
                  setResetPasswordData({ phone: "", otp: "", newPassword: "" });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {resetPasswordStep === 1 && (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSendResetOTP}
                className="space-y-4"
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type="tel"
                      name="phone"
                      value={resetPasswordData.phone}
                      onChange={handleResetPasswordChange}
                      className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </motion.form>
            )}

            {resetPasswordStep === 2 && (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleVerifyResetOTP}
                className="space-y-4"
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Enter OTP
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type="text"
                      name="otp"
                      value={resetPasswordData.otp}
                      onChange={handleResetPasswordChange}
                      className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                      pattern="[0-9]{6}"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setResetPasswordStep(1)}
                    className="w-1/2 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Verify OTP
                  </button>
                </div>
              </motion.form>
            )}

            {resetPasswordStep === 3 && (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleResetPassword}
                className="space-y-4"
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type="password"
                      name="newPassword"
                      value={resetPasswordData.newPassword}
                      onChange={handleResetPasswordChange}
                      className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Password must contain at least 8 characters, including uppercase, lowercase, number and special character
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setResetPasswordStep(2)}
                    className="w-1/2 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-1/2 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? "Changing..." : "Change Password"}
                  </button>
                </div>
              </motion.form>
            )}
          </motion.div>
        </div>)}

    </div>
  )
}

export default SallerLogin
