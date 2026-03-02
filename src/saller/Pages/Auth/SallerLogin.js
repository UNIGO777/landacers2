import { useState } from "react"
import { Building2, KeyRound, Lock, Mail, Phone, X, Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { motion, AnimatePresence } from "framer-motion"
import ROUTES_NAME from "../../../constants/routes"
import OTPInput from "../../../components/OTPComponents/OTPInput"
import useOTP from "../../../Hooks/useOTP"

console.log(process.env.REACT_APP_backendUrl)
const SallerLogin = () => {
  const navigate = useNavigate()
  const [showOtpForm, setShowOtpForm] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const {
    isLoading,
    isVerifying,
    sendSellerLoginOTP,
    verifySellerLoginOTP,
    sendSellerPasswordChangeOTP,
    verifySellerPasswordChangeOTP,
    resetOTPState
  } = useOTP();

  // Improved password validation: must be at least 8 chars, contain uppercase, lowercase, number, special char
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
        "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character"
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

    try {
      await sendSellerLoginOTP(formData.email, formData.password, setIsButtonDisabled, setCountdown)
      setShowOtpForm(true)
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Failed to send OTP")
    }
  }

  const handleVerifyOTP = async (otp) => {
    setError("")

    try {
      const response = await verifySellerLoginOTP(formData.email, otp)
      
      if (response.token) {
        localStorage.setItem("sellerToken", response.token)
      }
      toast.success("Login successful!")
      window.location.href = ROUTES_NAME.SALLER_HOME
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Invalid OTP")
    }
  }

  const handleResendOTP = async () => {
    try {
      await sendSellerLoginOTP(formData.email, formData.password, setIsButtonDisabled, setCountdown)
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Failed to resend OTP")
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
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            className="w-full py-3 pl-10 pr-10 transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your password"
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
      </div>

      {/* Rate Limit Warning */}
      {countdown > 0 && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-700 text-sm text-center">
            Please wait {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')} before requesting another OTP
          </p>
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isLoading || isButtonDisabled}
        className={`w-full px-4 py-3 text-lg font-semibold transition duration-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
          isLoading || isButtonDisabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-500"
        }`}
      >
        {isLoading ? (
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
          `Get OTP${countdown > 0 ? ` (${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, '0')})` : ''}`
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
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <OTPInput
        length={6}
        onComplete={handleVerifyOTP}
        onResend={handleResendOTP}
        phoneNumber="your registered phone"
        isLoading={isVerifying}
        title="Verify Login"
        subtitle="We've sent a verification code to your WhatsApp"
        className="!p-0 !shadow-none !border-none !bg-transparent"
      />
      <button
        type="button"
        onClick={() => {
          setShowOtpForm(false)
          resetOTPState()
        }}
        className="w-full px-4 py-3 text-lg font-semibold text-gray-700 transition duration-200 bg-gray-100 rounded-lg hover:bg-gray-200"
      >
        Back to Login
      </button>
    </motion.div>
  )

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 lg:flex-row">
      {/* Left Panel */}
      <div className="flex flex-col justify-center p-4 sm:p-8 text-white w-full lg:w-1/2 lg:p-12">
        <div className="max-w-md mx-auto w-full">
          <div className="flex items-center gap-2 mb-8 sm:mb-12">
            <Building2 className="w-8 h-8 sm:w-10 sm:h-10" />
            <span className="text-2xl sm:text-3xl font-bold">Land Acre</span>
          </div>
          <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl font-bold leading-tight lg:text-5xl">Seller Portal</h1>
          <p className="mb-6 sm:mb-8 text-lg sm:text-xl text-blue-100">
            List and manage your properties, track sales, and connect with potential buyers.
          </p>

          <div className="hidden sm:block p-4 sm:p-6 bg-white/10 rounded-xl backdrop-blur-sm">
            <p className="mb-2 sm:mb-4 italic text-blue-50 text-sm sm:text-base">
              "Empowering sellers with intuitive tools for property management and sales growth."
            </p>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-200 rounded-full" />
              <div>
                <p className="font-medium text-sm sm:text-base">Seller Support</p>
                <p className="text-xs sm:text-sm text-blue-200">Land Acre Seller Network</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex items-center justify-center w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-screen p-4 sm:p-8 bg-white lg:w-1/2 lg:p-12">
        <div className="w-full max-w-md">
          <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold text-center text-gray-900">
            {showOtpForm ? "Enter OTP" : "Seller Login"}
          </h2>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 sm:p-4 mb-4 sm:mb-6 text-xs sm:text-sm text-red-700 bg-red-100 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <AnimatePresence mode="wait">{showOtpForm ? renderOtpForm() : renderLoginForm()}</AnimatePresence>
        </div>
      </div>
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2 sm:px-0">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md p-4 sm:p-6 bg-white rounded-lg shadow-xl"
          >
            <div className="flex justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold">Reset Password</h3>
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetPasswordStep(1);
                  setResetPasswordData({ phone: "", otp: "", newPassword: "" });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {resetPasswordStep === 1 && (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSendResetOTP}
                className="space-y-3 sm:space-y-4"
              >
                <div>
                  <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type="tel"
                      name="phone"
                      value={resetPasswordData.phone}
                      onChange={handleResetPasswordChange}
                      className="w-full px-8 sm:px-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
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
                className="space-y-3 sm:space-y-4"
              >
                <div>
                  <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                    Enter OTP
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type="text"
                      name="otp"
                      value={resetPasswordData.otp}
                      onChange={handleResetPasswordChange}
                      className="w-full px-8 sm:px-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
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
                    className="w-1/2 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 text-sm"
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
                className="space-y-3 sm:space-y-4"
              >
                <div>
                  <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={resetPasswordData.newPassword}
                      onChange={handleResetPasswordChange}
                      className="w-full px-8 sm:px-10 py-2 pr-8 sm:pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Enter new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </button>
                  </div>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">
                    Password must be at least 8 characters and include uppercase, lowercase, number, and special character.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setResetPasswordStep(2)}
                    className="w-1/2 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-1/2 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
                  >
                    {loading ? "Changing..." : "Change Password"}
                  </button>
                </div>
              </motion.form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default SallerLogin
