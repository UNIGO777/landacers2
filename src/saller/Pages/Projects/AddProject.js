import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import Select from 'react-select'
import StateNames from '../../../Assets/StaticData/StateName'
import cities from '../../../Assets/DynamicData/CityFatch'
import { FiUpload, FiX, FiCheck } from 'react-icons/fi'
import axios from 'axios'
import Massage from '../../components/Messages/Massage'
import Loader from '../../../components/loaders/ProcessLoader'
import sellerDetailsPromise from '../../Requests/FatchSellerData'
import NotABuilder from '../../components/NotABuilder'

const AddProject = () => {
  const [loading, setLoading] = useState(false)

  const amenitiesOptions = [
    { value: 'Swimming Pool', label: 'Swimming Pool' },
    { value: 'Gym', label: 'Gym' },
    { value: 'Garden', label: 'Garden' },
    { value: 'Children\'s Play Area', label: 'Children\'s Play Area' },
    { value: 'Security', label: '24/7 Security' },
    { value: 'Parking', label: 'Parking' },
    { value: 'Clubhouse', label: 'Clubhouse' },
    { value: 'Sports Court', label: 'Sports Court' },
    { value: 'Jogging Track', label: 'Jogging Track' },
    { value: 'Power Backup', label: 'Power Backup' }
  ]

  const [formData, setFormData] = useState({
    projectName: '',
    state: '',
    city: '',
    locality: '',
    totalUnits: '',
    availableUnits: '',
    amenities: [],
    launchDate: '',
    completionDate: '',
    projectType: '',
    description: '',
    images: [],
    isUpcoming: false,
    video: null,
    status: 'requested',
    sellerId: '' 
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [State, setState] = useState([])
  const [selectedState, setSelectedState] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  const [selectedAmenities, setSelectedAmenities] = useState([])
  const [filteredCities, setFilteredCities] = useState([])
  const [imagePreview, setImagePreview] = useState([])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [videoPreview, setVideoPreview] = useState('')
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')
  const [redirectUrl, setRedirectUrl] = useState('')
  const [showMassage, setShowMassage] = useState(false)

  useEffect(() => {
    const stateOptions = StateNames.map(item => ({ value: item, label: item }))
    setState(stateOptions)
  }, [])

  useEffect(() => {
    if (selectedState) {
      const filtered = cities.filter(city => city.state === selectedState.value)
      setFilteredCities(filtered.map(item => ({ value: item.name, label: item.name })))
    } else {
      setFilteredCities(cities.map(item => ({ value: item.name, label: item.name })))
    }
  }, [selectedState])

  useEffect(() => {
    if (selectedCity) {
      const city = cities.find(city => city.name === selectedCity.value)
      if (city) {
        setSelectedState({ value: city.state, label: city.state })
        setFormData(prev => ({
          ...prev,
          state: city.state,
          city: city.name
        }))
      }
    }
  }, [selectedCity])

  const handleStepChange = (direction) => {
    let isValid = false;
    let nextStep = direction === 'next' ? currentStep + 1 : currentStep - 1;

    if (direction === 'next') {
      // Validate current step before proceeding
      if (currentStep === 1) {
        isValid = validateStep1();
      } else if (currentStep === 2) {
        isValid = validateStep2();
      } else if (currentStep === 3) {
        isValid = validateStep3();
      }

      if (!isValid) {
        return; // Don't proceed if validation fails
      }
    } else {
      isValid = true; // Always allow going back
    }

    if (isValid) {
      if (nextStep === 4 && direction === 'next') {
        setShowConfirmation(true);
      } else if (nextStep >= 1 && nextStep <= 3) {
        setCurrentStep(nextStep);
      }
    }
  };

  const validateStep1 = () => {
    const newErrors = {}
    
    if (!formData.projectName.trim()) {
      toast.error('Project name is required')
      newErrors.projectName = 'Project name is required'
    }
    
    if (!formData.projectType) {
      toast.error('Project type is required')
      newErrors.projectType = 'Project type is required'
    }

    if (!formData.launchDate) {
      toast.error('Launch date is required')
      newErrors.launchDate = 'Launch date is required'
    }

    if (!formData.completionDate) {
      toast.error('Completion date is required')
      newErrors.completionDate = 'Completion date is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}

    if (!formData.state) {
      toast.error('State is required')
      newErrors.state = 'State is required'
    }

    if (!formData.city) {
      toast.error('City is required')
      newErrors.city = 'City is required'
    }

    if (!formData.locality.trim()) {
      toast.error('Locality is required')
      newErrors.locality = 'Locality is required'
    }

    if (!formData.totalUnits) {
      toast.error('Total units is required')
      newErrors.totalUnits = 'Total units is required'
    }

    if (!formData.availableUnits) {
      toast.error('Available units is required')
      newErrors.availableUnits = 'Available units is required'
    }

    if (parseInt(formData.availableUnits) > parseInt(formData.totalUnits)) {
      toast.error('Available units cannot exceed total units')
      newErrors.availableUnits = 'Available units cannot exceed total units'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const newErrors = {}

    if (formData.images.length === 0) {
      toast.error('At least one image is required')
      newErrors.images = 'At least one image is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleAmenitiesChange = (selectedOptions) => {
    setSelectedAmenities(selectedOptions)
    setFormData(prev => ({
      ...prev,
      amenities: selectedOptions.map(option => option.value)
    }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    setFormData(prev => ({
      ...prev,
      images: files
    }))

    // Generate previews
    const previews = files.map(file => URL.createObjectURL(file))
    setImagePreview(previews)
    
    // Clear image error if exists
    if (errors.images) {
      setErrors(prev => ({
        ...prev,
        images: undefined
      }))
    }
  }

  const removeImage = (index) => {
    const newImages = [...formData.images]
    const newPreviews = [...imagePreview]
    newImages.splice(index, 1)
    newPreviews.splice(index, 1)
    setFormData(prev => ({
      ...prev,
      images: newImages
    }))
    setImagePreview(newPreviews)
  }

  const handleVideoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        video: file
      }))
      setVideoPreview(URL.createObjectURL(file))
    }
  }

  const handleFinalSubmit = async () => {
    setLoading(true)
    try {
      // Validate all steps before submitting
      const isStep1Valid = validateStep1();
      const isStep2Valid = validateStep2();
      const isStep3Valid = validateStep3();

      if (!isStep1Valid || !isStep2Valid || !isStep3Valid) {
        throw new Error('Please fix all validation errors before submitting');
      }

      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'images') {
          formData.images.forEach(image => {
            formDataToSend.append('images', image);
          });
        } else if (key === 'video' && formData.video) {
          formDataToSend.append('video', formData.video);
        } else if (key === 'amenities') {
          formDataToSend.append('amenities', JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const sellerToken = localStorage.getItem('sellerToken');
      const response = await axios.post(
        `https://api.landacre.in/api/projects`, 
        formDataToSend,
        {
          headers: {
            'Authorization': `Bearer ${sellerToken}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (!response.data) {
        setShowMassage(true)
        setMessage('Error in adding project')
        setType('error')
      } else {
        setShowMassage(true)
        setMessage('Project added successfully!')
        setType('success')
        setRedirectUrl('/saller/projects')
      }
    } catch (error) {
      setShowMassage(true)
      setMessage(error.response?.data?.message || 'Error in adding project')
      setType('error')
    }
    setLoading(false)
    setShowConfirmation(false)
  }

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  const ConfirmationDialog = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-2xl max-w-4xl w-full mx-4 overflow-y-auto max-h-[90vh]"
      >
        <motion.h2 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-2xl font-bold mb-6"
        >
          Confirm Project Details
        </motion.h2>
        <div className="space-y-6">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-50 p-4 rounded-lg"
          >
            <h3 className="font-semibold text-lg mb-3">Basic Information</h3>
            <p className="text-gray-700"><span className="font-medium">Project Name:</span> {formData.projectName}</p>
            <p className="text-gray-700"><span className="font-medium">Project Type:</span> {formData.projectType}</p>
            <p className="text-gray-700"><span className="font-medium">Description:</span> {formData.description}</p>
          </motion.div>

          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 p-4 rounded-lg"
          >
            <h3 className="font-semibold text-lg mb-3">Location</h3>
            <p className="text-gray-700">{formData.locality}, {formData.city}, {formData.state}</p>
          </motion.div>

          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-50 p-4 rounded-lg"
          >
            <h3 className="font-semibold text-lg mb-3">Units</h3>
            <p className="text-gray-700"><span className="font-medium">Total Units:</span> {formData.totalUnits}</p>
            <p className="text-gray-700"><span className="font-medium">Available Units:</span> {formData.availableUnits}</p>
          </motion.div>

          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-50 p-4 rounded-lg"
          >
            <h3 className="font-semibold text-lg mb-3">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {formData.amenities.map((amenity, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {amenity}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-50 p-4 rounded-lg"
          >
            <h3 className="font-semibold text-lg mb-3">Media</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {imagePreview.map((img, index) => (
                <img key={index} src={img} alt={`Preview ${index + 1}`} className="rounded-lg w-full h-32 object-cover" />
              ))}
            </div>
            {videoPreview && (
              <video controls className="w-full rounded-lg">
                <source src={videoPreview} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-end mt-6"
          >
            <button
              onClick={() => setShowConfirmation(false)}
              className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={handleFinalSubmit}
              disabled={loading}
              className={`px-6 py-2 ml-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors
                ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Submitting...' : 'Confirm & Submit'}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8"
      >
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold mb-8 text-gray-800"
        >
          Add New Project
        </motion.h1>
        
        <motion.div 
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto bg-white rounded-2xl p-8"
        >
          <div className="mb-8 flex flex-wrap justify-between gap-4">
            {[1, 2, 3].map((step) => (
              <motion.div
                key={step}
                whileHover={{ scale: 1.05 }}
                className={`flex items-center ${currentStep >= step ? 'text-blue-600' : 'text-gray-400'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                  ${currentStep >= step ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
                  {step}
                </div>
                <span className="ml-2 text-sm font-medium">
                  {step === 1 ? 'Basic Info' : step === 2 ? 'Location & Units' : 'Media & Amenities'}
                </span>
              </motion.div>
            ))}
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {currentStep === 1 && (
              <motion.div variants={formVariants} className="space-y-6">
                <motion.div variants={inputVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Name *</label>
                    <input
                      type="text"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                        ${errors.projectName ? 'border-red-500' : 'border-gray-300'}`}
                      required
                    />
                    {errors.projectName && (
                      <p className="mt-1 text-sm text-red-500">{errors.projectName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Type *</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                        ${errors.projectType ? 'border-red-500' : 'border-gray-300'}`}
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Mixed-use">Mixed-use</option>
                    </select>
                    {errors.projectType && (
                      <p className="mt-1 text-sm text-red-500">{errors.projectType}</p>
                    )}
                  </div>
                </motion.div>

                <motion.div variants={inputVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  ></textarea>
                </motion.div>

                <motion.div variants={inputVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Launch Date *</label>
                    <input
                      type="date"
                      name="launchDate"
                      value={formData.launchDate}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                        ${errors.launchDate ? 'border-red-500' : 'border-gray-300'}`}
                      required
                    />
                    {errors.launchDate && (
                      <p className="mt-1 text-sm text-red-500">{errors.launchDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Completion Date *</label>
                    <input
                      type="date"
                      name="completionDate"
                      value={formData.completionDate}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                        ${errors.completionDate ? 'border-red-500' : 'border-gray-300'}`}
                      required
                    />
                    {errors.completionDate && (
                      <p className="mt-1 text-sm text-red-500">{errors.completionDate}</p>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div variants={formVariants} className="space-y-6">
                <motion.div variants={inputVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                    <Select 
                      options={State}
                      value={selectedState}
                      onChange={setSelectedState}
                      className={`w-full text-black rounded-xl ${errors.state ? 'border-red-500' : ''}`}
                      classNamePrefix="select"
                      isSearchable={true}
                      required
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderRadius: '0.75rem',
                          boxShadow: 'none',
                          '&:hover': {
                            borderColor: 'black',
                          },
                          paddingInline: '10px',
                          ...(errors.state && { borderColor: '#ef4444' })
                        }),
                      }}
                      placeholder="Select state"
                    />
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <Select 
                      options={filteredCities}
                      value={selectedCity}
                      onChange={setSelectedCity}
                      className={`w-full text-black rounded-xl ${errors.city ? 'border-red-500' : ''}`}
                      classNamePrefix="select"
                      isSearchable={true}
                      required
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderRadius: '0.75rem',
                          boxShadow: 'none',
                          '&:hover': {
                            borderColor: 'black',
                          },
                          paddingInline: '10px',
                          ...(errors.city && { borderColor: '#ef4444' })
                        }),
                      }}
                      placeholder="Select city"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Locality *</label>
                    <input
                      type="text"
                      name="locality"
                      value={formData.locality}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                        ${errors.locality ? 'border-red-500' : 'border-gray-300'}`}
                      required
                    />
                    {errors.locality && (
                      <p className="mt-1 text-sm text-red-500">{errors.locality}</p>
                    )}
                  </div>
                </motion.div>

                <motion.div variants={inputVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Units *</label>
                    <input
                      type="number"
                      name="totalUnits"
                      value={formData.totalUnits}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                        ${errors.totalUnits ? 'border-red-500' : 'border-gray-300'}`}
                      required
                    />
                    {errors.totalUnits && (
                      <p className="mt-1 text-sm text-red-500">{errors.totalUnits}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Available Units *</label>
                    <input
                      type="number"
                      name="availableUnits"
                      value={formData.availableUnits}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                        ${errors.availableUnits ? 'border-red-500' : 'border-gray-300'}`}
                      required
                    />
                    {errors.availableUnits && (
                      <p className="mt-1 text-sm text-red-500">{errors.availableUnits}</p>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div variants={formVariants} className="space-y-6">
                <motion.div variants={inputVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amenities *</label>
                  <Select
                    isMulti
                    options={amenitiesOptions}
                    value={selectedAmenities}
                    onChange={handleAmenitiesChange}
                    className={`w-full text-black rounded-xl ${errors.amenities ? 'border-red-500' : ''}`}
                    classNamePrefix="select"
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderRadius: '0.75rem',
                        boxShadow: 'none',
                        '&:hover': {
                          borderColor: 'black',
                        },
                        paddingInline: '10px',
                        ...(errors.amenities && { borderColor: '#ef4444' })
                      }),
                    }}
                    placeholder="Select amenities"
                  />
                  {errors.amenities && (
                    <p className="mt-1 text-sm text-red-500">{errors.amenities}</p>
                  )}
                </motion.div>

                <motion.div variants={inputVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Images *</label>
                  <div className={`border-2 border-dashed rounded-xl p-6 text-center
                    ${errors.images ? 'border-red-500' : 'border-gray-300'}`}>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      required
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">Click to upload images</p>
                      <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                    </label>
                  </div>
                  {errors.images && (
                    <p className="mt-1 text-sm text-red-500">{errors.images}</p>
                  )}
                  {imagePreview.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      {imagePreview.map((preview, index) => (
                        <div key={index} className="relative">
                          <img 
                            src={preview} 
                            alt={`Preview ${index + 1}`} 
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                          >
                            <FiX />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>

                <motion.div variants={inputVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Video</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                      id="video-upload"
                    />
                    <label htmlFor="video-upload" className="cursor-pointer">
                      <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">Click to upload video</p>
                      <p className="text-xs text-gray-400">MP4, MOV up to 100MB</p>
                    </label>
                  </div>
                  {videoPreview && (
                    <div className="mt-4">
                      <video 
                        src={videoPreview}
                        controls
                        className="w-full rounded-xl"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </motion.div>

                <motion.div variants={inputVariants} className="flex items-center">
                  <input
                    type="checkbox"
                    name="isUpcoming"
                    checked={formData.isUpcoming}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Mark as Upcoming Project
                  </label>
                </motion.div>
              </motion.div>
            )}

            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                    onClick={() => handleStepChange('prev')}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Previous
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={() => handleStepChange('next')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors ml-auto"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  onClick={() => setShowConfirmation(true)}
                  className={`px-6 py-3 bg-blue-600 text-white  rounded-xl hover:bg-blue-700 transition-colors ml-3
                    ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Adding Project...' : 'Review & Submit'}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </motion.div>
      {showConfirmation && <ConfirmationDialog />}
      {showMassage && <Massage message={message} type={type}  redirect={redirectUrl}/>}
      {loading && <Loader message="Adding Project..." subMessage="Please wait while we process your request" />}
      
    </>
  )
}

export default AddProject