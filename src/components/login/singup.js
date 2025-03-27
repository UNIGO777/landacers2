import { useState } from "react"
import { X } from "lucide-react"
import axios from "axios"
import { useNavigate } from "react-router-dom" // Assuming you're using React Router

const SignUpModal = ({ isOpen, onClose, onToggleForm }) => {
  const navigate = useNavigate() // For navigation after successful registration
  const [step, setStep] = useState("registration")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [phoneNumberForOTP, setPhoneNumberForOTP] = useState("")

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
      const lastName = lastNameParts.join(" ") || firstName // Fallback if no last name

      const response = await axios.post("/api/user/register", {
        firstName,
        lastName,
        username: formData.email.split("@")[0], // Generate username from email
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        role: "user",
      })

      if (response.data.phoneNumber) {
        setPhoneNumberForOTP(response.data.phoneNumber)
        setStep("otp")
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.")
    }
  }

  const handleOTPVerification = async (otp) => {
    try {
      const response = await axios.post("/api/verify-otp", {
        phoneNumber: phoneNumberForOTP,
        otp,
      })

      if (response.status === 201) {
        // Registration successful
        alert("Registration successful! Please login.")
        onClose() // Close modal
        navigate("/login") // Redirect to login page
      }
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed. Please try again.")
    }
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
                <button
                  type="submit"
                  className="w-full bg-[#4285F4] text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Sign Up
                </button>
              </form>
            ) : (
              <OTPVerification 
                phoneNumber={phoneNumberForOTP} 
                onBack={() => setStep("registration")}
                onVerify={handleOTPVerification}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const OTPVerification = ({ phoneNumber, onBack, onVerify }) => {
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await onVerify(otp)
    } catch (err) {
      setError(err.message || "Verification failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium">Verify Your Phone Number</h3>
      <p className="text-gray-600">We've sent a verification code to {phoneNumber}. Please enter it below.</p>

      {error && <div className="p-3 text-red-700 bg-red-100 rounded-lg">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={6}
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#4285F4] text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>
        <button
          type="button"
          onClick={onBack}
          className="w-full py-3 text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Back to Registration
        </button>
      </form>
    </div>
  )
}

export default SignUpModal;