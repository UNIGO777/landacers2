"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import { toast } from "react-toastify"
import { Building2, User, MapPin, Upload, Camera } from 'lucide-react'
import Layout from "../Layout"

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    fullName: "",
    address: "",
  })
  const [profilePicture, setProfilePicture] = useState(null)
  const [loading, setLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)

  useEffect(() => {
    // Fetch user data when component mounts
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get("https://landacers-backend.onrender.com/api/sellers/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.data.success) {
        setFormData({
          companyName: response.data.seller.companyName || "",
          fullName: response.data.seller.fullName || "",
          address: response.data.seller.address || "",
        })
        setPreviewUrl(response.data.seller.profilePicture || null)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfilePicture(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formDataToSend = new FormData()
    formDataToSend.append("companyName", formData.companyName)
    formDataToSend.append("fullName", formData.fullName)
    formDataToSend.append("address", formData.address)
    if (profilePicture) {
      formDataToSend.append("profilePicture", profilePicture)
    }

    try {
      const token = localStorage.getItem("token")
      const response = await axios.put("https://landacers-backend.onrender.com/api/sellers/update", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.data.success) {
        toast.success("Profile updated successfully!")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile")
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
          className="max-w-4xl mx-auto"
        >
          <div className="overflow-hidden bg-white shadow-2xl rounded-3xl">
            <div className="px-6 py-8 sm:p-10">
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-gray-900">Edit Profile</h2>
                <p className="mt-2 text-gray-600">Update your profile information</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex flex-col items-center justify-center mb-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative w-40 h-40 overflow-hidden bg-gray-100 border-4 border-blue-500 rounded-full group"
                  >
                    {previewUrl ? (
                      <img src={previewUrl || "/placeholder.svg"} alt="Profile preview" className="object-cover w-full h-full" />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <User className="w-20 h-20 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                      <Camera className="w-10 h-10 text-white" />
                    </div>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept="image/*"
                    />
                  </motion.div>
                  <p className="mt-2 text-sm text-gray-500">Click to change profile picture</p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <motion.div whileHover={{ scale: 1.02 }} className="relative group">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Company Name</label>
                    <div className="relative">
                      <Building2 className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="block w-full pl-12 pr-3 transition-all duration-200 border-gray-300 shadow-sm h-14 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter company name"
                      />
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} className="relative group">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
                    <div className="relative">
                      <User className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="block w-full pl-12 pr-3 transition-all duration-200 border-gray-300 shadow-sm h-14 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </motion.div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} className="relative group">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Address</label>
                  <div className="relative">
                    <MapPin className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="block w-full pl-12 pr-3 transition-all duration-200 border-gray-300 shadow-sm h-14 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your address"
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
                      Updating Profile...
                    </span>
                  ) : (
                    "Update Profile"
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}

export default UpdateProfile
