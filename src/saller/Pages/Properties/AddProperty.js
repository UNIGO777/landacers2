"use client"

import { useState } from "react"
import { Building2, Upload } from "lucide-react"
import axios from "axios"
import { toast } from "react-toastify"
import Layout from "../../Layout"

const propertyTypes = [
  "Flat/Apartment",
  "Independent House/Villa",
  "Builder Floor",
  "Plot/Land",
  "1 RK/Studio Apartment",
  "Serviced Apartment",
  "Farmhouse",
  "Office",
  "Retail",
  "Commercial Plot/Land",
  "Storage",
  "Industry",
  "Hospitality",
]

const transactionTypes = ["Sell", "Rent", "PG"]
const facingDirections = ["North", "East", "West", "South"]
const areaUnits = [
  "sq.ft",
  "sq.yards",
  "sq.m.",
  "acres",
  "marla",
  "cents",
  "bigha",
  "kottah",
  "kanal",
  "grounds",
  "ares",
  "biswa",
  "guntha",
  "aankadam",
  "hectares",
  "rood",
  "chataks",
  "perch",
]

const AddPropertyPage = () => {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Common Property Fields
    propertyType: "",
    transactionType: "",
    propertyTitle: "",
    description: "",
    availableFrom: "",
    facingDirection: "",
    isCommercial: false,

    // Location Fields
    location: {
      city: "",
      locality: "",
      subLocality: "",
      apartmentSociety: "",
      houseNo: "",
    },

    // Property Type Specific Details
    propertyDetails: {},

    // Amenities
    amenities: {
      commonAmenities: [],
      residentialAmenities: [],
      commercialAmenities: [],
      industrialAmenities: [],
      hospitalityAmenities: [],
    },

    // Pricing Details
    pricing: {
      expectedPrice: 0,
      type: "",
      rent: 0,
      salePrice: 0,
      pgPrice: 0,
      pricePerAcre: 0,
      pricePerSqFt: 0,
      totalArea: 0,
      additionalMeasurements: [],
    },

    // Media
    propertyMedia: {
      photos: [],
      video: "",
    },

    // Conditional Fields
    willingToRentOut: "",
    availableFor: "",
    suitableFor: "",
    availableDate: null,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleImageUpload = (e) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        propertyMedia: {
          ...prev.propertyMedia,
          photos: [...prev.propertyMedia.photos, ...Array.from(e.target.files)],
        },
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(`${process.env.REACT_APP_backendUrl}/api/properties/create`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.data.success) {
        toast.success("Property added successfully!")
      } else {
        throw new Error(response.data.message || "Failed to add property")
      }
    } catch (error) {
      toast.error(error.message || "Failed to add property")
      console.error("Error adding property:", error)
    } finally {
      setLoading(false)
    }
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {["Basic Details", "Property Details", "Amenities", "Pricing", "Images"].map((label, index) => (
        <div key={label} className="flex items-center">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            {index + 1}
          </div>
          <span className={`ml-2 ${step === index + 1 ? "text-blue-500 font-medium" : "text-gray-600"}`}>{label}</span>
          {index < 4 && <div className="flex-1 h-px mx-4 bg-gray-300" />}
        </div>
      ))}
    </div>
  )

  const renderBasicDetails = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Property Type</label>
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select Property Type</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Transaction Type</label>
          <select
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select Transaction Type</option>
            {transactionTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Property Title</label>
        <input
          type="text"
          name="propertyTitle"
          value={formData.propertyTitle}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Available From</label>
          <input
            type="date"
            name="availableFrom"
            value={formData.availableFrom}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Facing Direction</label>
          <select
            name="facingDirection"
            value={formData.facingDirection}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select Direction</option>
            {facingDirections.map((direction) => (
              <option key={direction} value={direction}>
                {direction}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            name="location.city"
            value={formData.location.city}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Locality</label>
          <input
            type="text"
            name="location.locality"
            value={formData.location.locality}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Sub Locality</label>
          <input
            type="text"
            name="location.subLocality"
            value={formData.location.subLocality}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Apartment/Society</label>
          <input
            type="text"
            name="location.apartmentSociety"
            value={formData.location.apartmentSociety}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">House/Flat Number</label>
        <input
          type="text"
          name="location.houseNo"
          value={formData.location.houseNo}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isCommercial"
            checked={formData.isCommercial}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">Is this a commercial property?</span>
        </label>
      </div>

      {formData.transactionType === "Rent" && (
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Willing to Rent Out to</label>
          <select
            name="willingToRentOut"
            value={formData.willingToRentOut}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select Tenant Type</option>
            <option value="Family">Family</option>
            <option value="Single Man">Single Man</option>
            <option value="Single Woman">Single Woman</option>
          </select>
        </div>
      )}

      {formData.transactionType === "PG" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Available For</label>
            <select
              name="availableFor"
              value={formData.availableFor}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select Availability</option>
              <option value="Girls">Girls</option>
              <option value="Boys">Boys</option>
              <option value="Any">Any</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Suitable For</label>
            <select
              name="suitableFor"
              value={formData.suitableFor}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select Suitability</option>
              <option value="Student">Student</option>
              <option value="WorkingProfessionals">Working Professionals</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )

  const renderPropertyDetails = () => {
    switch (formData.propertyType) {
      case "Flat/Apartment":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Floor Number</label>
                <input
                  type="number"
                  name="propertyDetails.floorNumber"
                  value={formData.propertyDetails.floorNumber || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Total Floors</label>
                <input
                  type="number"
                  name="propertyDetails.totalFloors"
                  value={formData.propertyDetails.totalFloors || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Bedrooms</label>
                <input
                  type="number"
                  name="propertyDetails.bedrooms"
                  value={formData.propertyDetails.bedrooms || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Bathrooms</label>
                <input
                  type="number"
                  name="propertyDetails.bathrooms"
                  value={formData.propertyDetails.bathrooms || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Balconies</label>
                <input
                  type="number"
                  name="propertyDetails.balconies"
                  value={formData.propertyDetails.balconies || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Carpet Area</label>
                <div className="flex">
                  <input
                    type="number"
                    name="propertyDetails.areaDetails.carpetArea"
                    value={formData.propertyDetails.areaDetails?.carpetArea || ""}
                    onChange={handleChange}
                    className="w-2/3 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <select
                    name="propertyDetails.areaDetails.areaUnitForCarpet"
                    value={formData.propertyDetails.areaDetails?.areaUnitForCarpet || ""}
                    onChange={handleChange}
                    className="w-1/3 p-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Unit</option>
                    {areaUnits.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Furnishing Status</label>
              <select
                name="propertyDetails.furnishing"
                value={formData.propertyDetails.furnishing || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Furnishing Status</option>
                <option value="Furnished">Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Reserved Parking</label>
              <select
                name="propertyDetails.reservedParking"
                value={formData.propertyDetails.reservedParking || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Parking Type</option>
                <option value="Covered Parking">Covered Parking</option>
                <option value="Open Parking">Open Parking</option>
                <option value="None">None</option>
              </select>
            </div>
          </div>
        )
      // Add cases for other property types here
      default:
        return <div>Please select a property type to see specific details.</div>
    }
  }

  const renderAmenities = () => {
    // Implement amenities selection based on property type
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Amenities</h3>
        {/* Add checkboxes or multi-select for amenities */}
      </div>
    )
  }

  const renderPricing = () => (
    <div className="space-y-6">
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Expected Price</label>
        <input
          type="number"
          name="pricing.expectedPrice"
          value={formData.pricing.expectedPrice}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      {formData.transactionType === "Rent" && (
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Monthly Rent</label>
          <input
            type="number"
            name="pricing.rent"
            value={formData.pricing.rent}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      )}
      {formData.transactionType === "Sell" && (
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Sale Price</label>
          <input
            type="number"
            name="pricing.salePrice"
            value={formData.pricing.salePrice}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      )}
      {/* Add more pricing fields based on transaction type and property type */}
    </div>
  )

  const renderImageUpload = () => (
    <div className="space-y-6">
      <div className="p-8 border-2 border-gray-300 border-dashed rounded-lg">
        <div className="flex flex-col items-center">
          <Upload className="w-12 h-12 mb-4 text-gray-400" />
          <p className="mb-2 text-gray-600">Drag and drop your images here</p>
          <p className="mb-4 text-sm text-gray-400">or</p>
          <label className="px-6 py-2 text-white transition-colors bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600">
            Browse Files
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </div>
      </div>
      {formData.propertyMedia.photos.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {formData.propertyMedia.photos.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image) || "/placeholder.svg"}
                alt={`Upload preview ${index + 1}`}
                className="object-cover w-full h-24 rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <Layout>
      <div className="min-h-screen py-8 bg-gray-50">
        <div className="container px-8 mx-auto max-w-7xl">
          <div className="p-8 bg-white shadow-sm rounded-xl">
            <div className="flex items-center gap-4 mb-8">
              <Building2 className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold">Add New Property</h1>
            </div>

            {renderStepIndicator()}

            <form onSubmit={handleSubmit} className="space-y-8">
              {step === 1 && renderBasicDetails()}
              {step === 2 && renderPropertyDetails()}
              {step === 3 && renderAmenities()}
              {step === 4 && renderPricing()}
              {step === 5 && renderImageUpload()}

              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  className="px-6 py-2 text-gray-600 transition-colors hover:text-gray-900"
                  disabled={step === 1}
                >
                  Back
                </button>
                {step < 5 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.min(5, s + 1))}
                    className="px-6 py-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                  >
                    {loading ? "Adding Property..." : "Add Property"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AddPropertyPage

