import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../../Layout"
import BasicDetails from "./PropertyFroms/BasicDetails"
import LandDetails from "./PropertyFroms/LandDetils"
import FarmhouseDetails from "./PropertyFroms/FarmHouseDetails"
import PlotDetails from "./PropertyFroms/PlotDetails"
import ImageUpload from "./PropertyFroms/ImageUpload"

export default function AddProperty() {
  const [activeStep, setActiveStep] = useState(0)
  const [propertyData, setPropertyData] = useState({
    title: "",
    description: "",
    location: {
      state: "",
      district: "",
      city: "",
      locality: "",
      pincode: "",
    },
    type: "",
    status: "available",
    ownerType: "",
    owner: "",
    views: 0,
    queries: [],
    thumbnailImage: "",
    images: [],
    totalInquiries: 0,
    isUpcoming: false,
    upcomingDetails: {
      expectedLaunchDate: "",
      developerName: "",
      priceRange: {
        min: 0,
        max: 0,
      },
      highlights: [],
    },
    isFeatured: false,
    featuredDetails: {
      startDate: "",
      endDate: "",
      bannerImage: "",
      promotionalText: "",
      priority: 0,
    },
    createdBy: "",
    lastUpdatedBy: "",
  })

  const navigate = useNavigate()

  const steps = ["Basic Details", "Type-Specific Details", "Images Upload"]

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleFormSubmit = (data) => {
    setPropertyData((prevData) => ({ ...prevData, ...data }))
    if (activeStep === steps.length - 1) {
      console.log("Final Property Data:", propertyData)
      navigate("/properties")
    } else {
      handleNext()
    }
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <BasicDetails onSubmit={handleFormSubmit} initialData={propertyData} />
      case 1:
        switch (propertyData.type) {
          case "land":
            return <LandDetails onSubmit={handleFormSubmit} initialData={propertyData} />
          case "farmhouse":
            return <FarmhouseDetails onSubmit={handleFormSubmit} initialData={propertyData} />
          case "plot":
            return <PlotDetails onSubmit={handleFormSubmit} initialData={propertyData} />
          default:
            return <div>Please select a property type in the Basic Details step.</div>
        }
      case 2:
        return <ImageUpload onSubmit={handleFormSubmit} initialData={propertyData} />
      default:
        return <div>Unknown step</div>
    }
  }

  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <div className="mb-8">
          <ol className="flex items-center justify-center">
            {steps.map((label, index) => (
              <li key={label} className={`flex items-center ${index < steps.length - 1 ? "w-full" : "flex-1"}`}>
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= activeStep ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {index + 1}
                </span>
                <span className={`ml-2 text-sm ${index <= activeStep ? "text-blue-500 font-medium" : "text-gray-500"}`}>
                  {label}
                </span>
                {index < steps.length - 1 && <div className="flex-1 h-px mx-4 bg-gray-300"></div>}
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-8">{getStepContent(activeStep)}</div>
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={activeStep === 0}
            className="px-6 py-2 text-gray-700 transition-colors border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-100"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
            className="px-6 py-2 text-white transition-colors bg-blue-500 rounded-md disabled:opacity-50 hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  )
}

