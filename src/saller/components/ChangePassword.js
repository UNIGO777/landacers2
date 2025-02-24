"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import { toast } from "react-toastify"
import { Phone, Lock, KeyRound } from "lucide-react"
import Layout from "../Layout"

const ChangePassword = () => {
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSendOTP = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(`${process.env.REACT_APP_backendUrl}/api/sellers/send-change-password-otp`, {
        phone,
      })
      if (response.data.success) {
        toast.success("OTP sent successfully!")
        setOtpSent(true)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP")
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(`${process.env.REACT_APP_backendUrl}/api/sellers/change-password`, {
        phone,
        otp,
        newPassword,
      })
      if (response.data.success) {
        toast.success("Password changed successfully!")
        // Redirect or handle success
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="overflow-hidden bg-white shadow-2xl rounded-3xl">
            <div className="px-6 py-8 sm:p-10">
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-gray-900">Change Password</h2>
                <p className="mt-2 text-gray-600">
                  {otpSent ? "Enter the OTP sent to your phone" : "We'll send an OTP to your registered phone number"}
                </p>
              </div>

              {!otpSent ? (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSendOTP}
                  className="space-y-6"
                >
                  <motion.div whileHover={{ scale: 1.02 }} className="relative group">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="block w-full pl-12 pr-3 transition-all duration-200 border-gray-300 shadow-sm h-14 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full text-lg font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent shadow-lg h-14 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                      "Send OTP"
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleChangePassword}
                  className="space-y-6"
                >
                  <motion.div whileHover={{ scale: 1.02 }} className="relative group">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Enter OTP</label>
                    <div className="relative">
                      <KeyRound className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="block w-full pl-12 pr-3 transition-all duration-200 border-gray-300 shadow-sm h-14 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        pattern="[0-9]{6}"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} className="relative group">
                    <label className="block mb-2 text-sm font-medium text-gray-700">New Password</label>
                    <div className="relative">
                      <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="block w-full pl-12 pr-3 transition-all duration-200 border-gray-300 shadow-sm h-14 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter new password"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full text-lg font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent shadow-lg h-14 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                        Changing Password...
                      </span>
                    ) : (
                      "Change Password"
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="w-full text-lg font-semibold text-gray-700 transition-all duration-200 bg-gray-100 border border-gray-300 h-14 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Back
                  </motion.button>
                </motion.form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}

export default ChangePassword

