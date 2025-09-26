import { useState } from "react"
import { X } from "lucide-react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import OTPInput from "../OTPComponents/OTPInput"
import useOTP from "../../hooks/useOTP"
import { handleOTPError } from "../../utils/otpErrorHandler"

const SignUpModal = ({ isOpen, onClose, onToggleForm }) => {
  const navigate = useNavigate()
  const [step, setStep] = useState("registration") // registration, otp, success
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const {
    isLoading,
    isVerifying,
    sendUserRegistrationOTP,
    verifyUserRegistrationOTP,
    resetOTPState
  } = useOTP()

  if (!isOpen) return null

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // Frontend validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      const [firstName, ...lastNameParts] = formData.fullName.split(" ")
      const lastName = lastNameParts.join(" ") || firstName

      const userData = {
        firstName,
        lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      }

      // Send OTP for registration
      await sendUserRegistrationOTP(userData, setIsButtonDisabled, setCountdown)
      setStep("otp")
    } catch (err) {
      // Error is handled by the hook, but we can also set local error
      setError(err.response?.data?.message || "Registration failed. Please try again.")
    }
  }

  const handleOTPVerification = async (otp) => {
    try {
      await verifyUserRegistrationOTP(formData.phoneNumber, otp)
      // Registration successful
      setStep("success")
      setTimeout(() => {
        onClose()
        // Navigate or show success message
      }, 2000)
    } catch (err) {
      // Error is handled by the hook automatically
      console.error("OTP verification failed:", err)
    }
  }

  const handleResendOTP = async () => {
    try {
      const [firstName, ...lastNameParts] = formData.fullName.split(" ")
      const lastName = lastNameParts.join(" ") || firstName

      const userData = {
        firstName,
        lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      }

      await sendUserRegistrationOTP(userData, setIsButtonDisabled, setCountdown)
    } catch (err) {
      console.error("Resend OTP failed:", err)
    }
  }

  const handleBackToRegistration = () => {
    setStep("registration")
    resetOTPState()
    setError("")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="flex flex-col w-full max-w-4xl overflow-hidden bg-white rounded-lg md:flex-row">
        {/* Left Panel */}
        <div className="bg-[#4285F4] p-8 text-white text-center flex flex-col items-center justify-center md:w-1/2">
          <h1 className="mb-4 text-3xl font-bold">Join LandAcre Today!</h1>
          <p className="max-w-sm mb-8">
            Create an account to unlock exclusive property listings, save your favorites, and get personalized
            recommendations.
          </p>
          <button
            onClick={onToggleForm}
            className="text-white bg-[#4285F4] hover:bg-blue-600 border border-white px-6 py-2 rounded-lg transition-colors"
          >
            Already have an account? Login.
          </button>
        </div>

        {/* Right Panel */}
        <div className="relative p-8 md:w-1/2">
          <button onClick={onClose} className="absolute text-gray-500 right-4 top-4 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-sm mx-auto">
            <h2 className="mb-6 text-2xl font-semibold">Sign Up</h2>

            {error && <div className="p-3 mb-4 text-red-700 bg-red-100 rounded-lg">{error}</div>}

            {step === "registration" ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    id="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    id="password"
                    placeholder="Create Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {/* Rate Limit Warning */}
                {countdown > 0 && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-amber-700 text-sm text-center">
                      Please wait {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')} before requesting another OTP
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || isButtonDisabled}
                  className={`w-full py-3 rounded-lg transition-colors ${
                    isLoading || isButtonDisabled
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#4285F4] text-white hover:bg-blue-600"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending OTP...
                    </div>
                  ) : (
                    `Sign Up${countdown > 0 ? ` (${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, '0')})` : ''}`
                  )}
                </button>
              </form>
            ) : step === "otp" ? (
              <div className="space-y-4">
                <OTPInput
                  length={6}
                  onComplete={handleOTPVerification}
                  onResend={handleResendOTP}
                  phoneNumber={formData.phoneNumber}
                  isLoading={isVerifying}
                  title="Verify Your Phone"
                  subtitle="We've sent a verification code to your WhatsApp"
                  className="!p-0 !shadow-none !border-none !bg-transparent"
                />
                <button
                  onClick={handleBackToRegistration}
                  className="w-full py-3 text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Back to Registration
                </button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <div className="w-8 h-8 text-green-600">✓</div>
                </div>
                <h3 className="text-xl font-medium text-green-600">Registration Successful!</h3>
                <p className="text-gray-600">Your account has been created successfully. Redirecting...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}



export default SignUpModal;