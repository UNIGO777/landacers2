"use client"

import { useState } from "react"
import { Eye, EyeOff, Lock, Monitor, Laptop, Smartphone, ArrowRight } from "lucide-react"
import Layout from "./Layout"

export default function ChangePassword() {
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [otp, setOtp] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const devices = [
    {
      name: 'Dell 24"',
      icon: Monitor,
      location: "London, UK",
      lastActive: "May 12, 2023 at 2:30 AM",
    },
    {
      name: "Macbook Air",
      icon: Laptop,
      location: "London, UK",
      lastActive: "May 12, 2023 at 2:30 AM",
    },
    {
      name: "iPhone 14 Pro Max",
      icon: Smartphone,
      location: "London, UK",
      lastActive: "May 12, 2023 at 2:30 AM",
    },
    {
      name: "Samsung Galaxy S 22 Ultra",
      icon: Smartphone,
      location: "London, UK",
      lastActive: "Aug 12, 2021 at 2:30 AM",
    },
    {
      name: "Macbook Pro",
      icon: Laptop,
      location: "London, UK",
      lastActive: "Aug 12, 2021 at 2:30 AM",
    },
  ]

  const handleSendOTP = async () => {
    // Add your OTP sending logic here
    setOtpSent(true)
    console.log("Sending OTP...")
  }

  const handleVerifyOTP = async () => {
    // Add your OTP verification logic here
    if (otp) {
      setOtpVerified(true)
      console.log("Verifying OTP:", otp)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (otpVerified && newPassword === confirmPassword) {
      // Add your password change logic here
      console.log("Changing password...")
    }
  }

  const handleLogoutAllDevices = () => {
    // Add your logout logic here
    console.log("Logging out from all devices...")
  }

  return (
    <Layout>
    <div className="min-h-screen py-12 bg-white">
      <div className="container px-4 mx-auto">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Password Change Form */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Lock className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-semibold text-gray-900">Change Password</h1>
            </div>

            <p className="mb-6 text-sm text-gray-600">
              To change your password, please fill in the fields below. Your password must contain at least 8
              characters, it must also include at least one upper case letter, one lower case letter, one number and one
              special character.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  OTP Verification
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      disabled={!otpSent || otpVerified}
                    />
                    <Lock className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                  </div>
                  {!otpSent ? (
                    <button
                      type="button"
                      onClick={handleSendOTP}
                      className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Send OTP
                    </button>
                  ) : (
                    !otpVerified && (
                      <button
                        type="button"
                        onClick={handleVerifyOTP}
                        className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Verify OTP
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    disabled={!otpVerified}
                  />
                  <Lock className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute -translate-y-1/2 right-3 top-1/2 disabled:opacity-50"
                    disabled={!otpVerified}
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    disabled={!otpVerified}
                  />
                  <Lock className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute -translate-y-1/2 right-3 top-1/2 disabled:opacity-50"
                    disabled={!otpVerified}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!otpVerified || !newPassword || !confirmPassword}
              >
                Change Password
              </button>
            </form>
          </div>

          {/* Devices List */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Monitor className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Your Devices</h2>
            </div>

            <p className="mb-4 text-sm text-gray-600">Your devices linked to this account in ED analytics</p>

            <button
              onClick={handleLogoutAllDevices}
              className="mb-6 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Log Out From All Devices
            </button>

            <div className="space-y-4">
              {devices.map((device, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 transition-colors border border-gray-100 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <device.icon className="w-6 h-6 text-gray-400" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{device.name}</h3>
                      <p className="text-xs text-gray-500">
                        {device.location} - {device.lastActive}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  )
}

