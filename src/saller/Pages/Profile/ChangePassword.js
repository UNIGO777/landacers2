"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import { toast } from "react-toastify"
import { Phone, Lock, KeyRound } from "lucide-react"

const ChangePassword = () => {
  const [step, setStep] = useState(1)
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSendOTP = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(`https://api.landacre.in/api/sellers/send-change-password-otp`, {
        phone,
      })
      if (response.data) {
        toast.success("OTP sent successfully!")
        setStep(2)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP")
      return
    }
    setStep(3)
  }
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

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setLoading(true)

 
    
      if (!validatePassword(newPassword)) {
        toast.error(
          "Password must be at least 8 characters long and contain uppercase, lowercase, number and special character"
        );
        setLoading(false);
        return;
      }
  
    

    try {
      
      const response = await axios.post(`https://api.landacre.in/api/sellers/change-password`, {
        phone,
        otp,
        newPassword,
      })
      if (response.data) {
        toast.success("Password changed successfully!")
        setStep(1)
        setPhone("")
        setOtp("")
        setNewPassword("")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password")
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    { number: 1, title: "Phone Verification" },
    { number: 2, title: "OTP Verification" },
    { number: 3, title: "New Password" },
  ]

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" mx-auto"
      >
        <div className="overflow-hidden bg-white  rounded-3xl">
          <div className="px-6 py-8 sm:p-10">
            <div className="mb-8">
              <div className="flex justify-between mb-8">
                {steps.map((s) => (
                  <div key={s.number} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full ${
                        step >= s.number ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {s.number}
                    </div>
                    <span className="mt-2 text-sm text-center text-gray-600">{s.title}</span>
                  </div>
                ))}
              </div>
              <div className="relative">
                <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-200  -translate-y-1/2" />
                <div
                  className="absolute left-0 top-1/2 h-0.5 bg-blue-600 -translate-y-1/2 transition-all duration-300"
                  style={{ width: `${((step - 1) / 2) * 100}%` }}
                />
              </div>
            </div>
            <br/>
            {step === 1 && (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSendOTP}
                className="space-y-6"
              >
                <motion.div whileHover={{ scale: 1.02 }} className="relative  group">
                  
                  <label className="block mb-2 mt-4 text-sm font-medium text-gray-700">Phone Number</label>
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
                  {loading ? "Sending OTP..." : "Send OTP"}
                </motion.button>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleVerifyOTP}
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

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/2 text-lg font-semibold text-gray-700 transition-all duration-200 bg-gray-100 border border-gray-300 h-14 rounded-xl hover:bg-gray-200"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-1/2 text-lg font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent shadow-lg h-14 rounded-xl hover:bg-blue-700"
                  >
                    Verify OTP
                  </motion.button>
                </div>
              </motion.form>
            )}

            {step === 3 && (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleChangePassword}
                className="space-y-6"
              >
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

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-1/2 text-lg font-semibold text-gray-700 transition-all duration-200 bg-gray-100 border border-gray-300 h-14 rounded-xl hover:bg-gray-200"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-1/2 md:text-lg font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent shadow-lg h-14 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Changing..." : "Change Password"}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ChangePassword