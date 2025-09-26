import { useState } from "react"
import { X } from "lucide-react"
import axios from "axios"

const LoginModal = ({ isOpen, onClose, onToggleForm }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

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

    try {
      const response = await axios.post(`${process.env.REACT_APP_backendUrl}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      })

      if (response.data.success) {
        onClose()
        // Handle successful login (e.g., update auth state, redirect)
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="flex flex-col w-full max-w-4xl overflow-hidden bg-white rounded-lg md:flex-row">
        {/* Left Panel */}
        <div className="bg-[#4285F4] p-8 text-white text-center flex flex-col items-center justify-center md:w-1/2">
          <h1 className="mb-4 text-3xl font-bold">Welcome Back To LandAcre!</h1>
          <p className="max-w-sm mb-8">
            We are so excited to have you here. Login to access exclusive offers, rewards, and discounts.
          </p>
          <button
            onClick={onToggleForm}
            className="text-white bg-[#4285F4] hover:bg-blue-600 border border-white px-6 py-2 rounded-lg transition-colors"
          >
            Don't have an account? Sign up.
          </button>
        </div>

        {/* Right Panel */}
        <div className="relative p-8 md:w-1/2">
          <button onClick={onClose} className="absolute text-gray-500 right-4 top-4 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-sm mx-auto">
            <h2 className="mb-6 text-2xl font-semibold">Login</h2>

            {error && <div className="p-3 mb-4 text-red-700 bg-red-100 rounded-lg">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#4285F4] text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LoginModal;
